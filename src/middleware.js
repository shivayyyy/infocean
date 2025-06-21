import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // Only runs for /dashboard/:path* due to matcher config

  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json(
      { message: "Something wrong with your session token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
