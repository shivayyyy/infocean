import mongoose from "mongoose";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/dbConnection/db.js";

console.log("Connecting to the database...login route");
connectDB();
console.log("Connected to the database login route");

export async function POST(req) {
  try {
    const { phoneNumber, password } = await req.json();
    if (!phoneNumber || !password) {
      return NextResponse.json(
        { error: "Phone number and password are required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = jwt.sign(
      { id: user._id, phoneNumber: user.phoneNumber, name: user.name },

      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
    return NextResponse.json(
      {
        message: "Login successful",

        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
