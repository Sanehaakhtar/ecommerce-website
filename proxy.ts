import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname === "/" || pathname.startsWith("/checkout");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get("shopspace-auth")?.value === "1";
  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/checkout/:path*"],
};
