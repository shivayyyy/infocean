import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getAuth(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const userData = jwt.verify(token, process.env.JWT_SECRET);

    return {
      user: {
        id: userData.id,
        phoneNumber: userData.phoneNumber,
        name: userData.name,
      },
    };
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
``;
