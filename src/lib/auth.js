import next from "next";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import { use } from "react";

export async function authenticateUser(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized.please Login first!" },
      { status: 401 }
    );
  }

  try {
    const decodedToken = await jwt.verify(token.value, process.env.JWT_SECRET);
    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (decodedToken) {
      const userId = decodedToken.id;
      return userId;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
