import { NextResponse } from "next/server";
import Content from "@/models/contentModel";

export async function GET(req) {
  try {
    const contentId = req.nextUrl.searchParams.get("contentId");
    if (!contentId) {
      return NextResponse.json(
        { error: "contentId is required" },
        { status: 400 }
      );
    }

    const getContent = await Content.findById(contentId)
      .populate("tags", "name")
      .populate("userId", "name");
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong while fetching content" },
      { status: 500 }
    );
  }
}
