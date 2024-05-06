import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {

  const { pathname } = new URL(request.url);
  
  if (request?.cookies?.get("token")?.value) {
    return NextResponse.next();
  }
  if (request?.cookies?.get("token")?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname == "/auth/login" && request?.cookies?.get("token")?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/user", "/user/(.*)", "/user/:path*", "/affiliate", "/affiliate/(.*)", "/affiliate/:path*"],
};
