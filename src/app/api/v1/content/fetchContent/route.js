import { NextResponse } from "next/server";
import Content from "@/models/contentModel";
import { getAuth } from "@/middleware/auth";

export async function GET(req) {
  try {
    //take user id
    const data = await getAuth(req);
    console.log(data.user.id);

    //use userid to get content
    const getContent = await Content.findOne({ userId: data.user.id });
    console.log("content we got", getContent);
    return NextResponse.json(
      {
        contents: getContent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong while fetching content" },
      { status: 500 }
    );
  }
}
