import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  if (request?.cookies?.get("token")?.value) {
    console.log(request?.cookies?.get("token")?.value);
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/user", "/user/(.*)", "/user/:path*"],
};
