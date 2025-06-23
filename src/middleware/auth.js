import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function getAuth(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return null;
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("auth userdata:", payload);

    return {
      user: {
        id: payload.id,
        phoneNumber: payload.phoneNumber,
        name: payload.name,
      },
    };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
