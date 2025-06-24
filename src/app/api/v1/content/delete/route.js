import connectDB from "@/dbConnection/db";
import Content from "@/models/contentModel";
import User from "@/models/userModel";
import { getAuth } from "@/middleware/auth";
import { NextResponse } from "next/server";

connectDB();
export async function POST(req) {
  try {
    //extract post id
    const { postId } = await req.json();
    const data = await getAuth(req);
    const userId = data.user.id;
    //query in database uses filter (both content id and userid should be same)
    const getPostDetail = await Content.findOne({
      _id: postId,
      userId: userId,
    });

    if (!getPostDetail) {
      console.error(
        `post not found which contain userId:${userId} and postId:${postId}`
      );
    }

    //delete the content

    await Content.deleteOne(getPostDetail);
    console.log("post deleted");
    return NextResponse.json(
      { success: true, message: "content deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "something wrong in delete api route",
      },
      { status: 500 }
    );
  }
}
