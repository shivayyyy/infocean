import connectDB from "@/dbConnection/db";
import { getAuth } from "@/middleware/auth";
import Content from "@/models/contentModel";
import { NextResponse } from "next/server";

connectDB();
export async function GET(req) {
  try {
    //get user id
    const data = await getAuth(req);
    const userId = data.user.id;
    //filter the content with userid and type===tweet
    const tweetContent = await Content.find({
      userId: userId,
      type: "tweeter",
    });

    //return the response
    return NextResponse.json(
      {
        tweets: tweetContent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
