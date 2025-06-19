import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/dbConnection/db.js";
import { cookies } from "next/headers";

console.log("Connecting to the database...");
connectDB();
console.log("Connected to the database");

export async function POST(request) {
  try {
    const { phoneNumber, password, name } = await request.json();
    if (!phoneNumber || !password || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6 || password.length > 15) {
      return NextResponse.json(
        { error: "Password must be between 6 and 15 characters" },
        { status: 400 }
      );
    }
    if (name.length < 3 || name.length > 15) {
      return NextResponse.json(
        { error: "Name must be between 3 and 15 characters" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ phoneNumber });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      phoneNumber,
      password: hashedPass,
      name,
    });

    const token = await jwt.sign(
      {
        id: newUser._id,
        phoneNumber: newUser.phoneNumber,
        name: newUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          phoneNumber: newUser.phoneNumber,
          name: newUser.name,
        },
        token,
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5,
      path: "/",
    });
    response.cookies.set("Cookie_1", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, // This will remove the cookie
    });
    return response;
  } catch (error) {
    console.error("Error in signup route:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
