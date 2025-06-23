import { getAuth } from "@/middleware/auth";
import connectDB from "@/dbConnection/db";
import { NextResponse } from "next/server";
import User from "@/models/userModel.js";
import Content from "@/models/contentModel.js";

connectDB();
console.log("Connected to the database content route");
export async function POST(req) {
  try {
    const data = await getAuth(req);
    console.log("user data found in route", data);

    if (!data) {
      return NextResponse.json(
        { error: "unauthorized access!! Please login" },
        { status: 401 }
      );
    }

    const { link, type, title, tags } = await req.json();

    if (!link || !type || !title) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log(link, type, title, tags);

    const getUser = await User.findById(data.user.id);
    console.log(data.user.id);
    if (!getUser) {
      console.log("your user");
    }
    const contentData = {
      link,
      type,
      title,
      userId: getUser._id,
    };

    if (tags && tags.length > 0) {
      contentData.tags = tags;
    }
    const addContent = new Content(contentData);

    await addContent.save();
    return NextResponse.json(
      { message: "content added succefully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "something is wrong while adding contnet" },
      { status: 500 }
    );
  }
}
