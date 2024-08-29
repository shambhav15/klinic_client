import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedRoutes = ["/main", "/dashboard", "/appointment"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  const cookies = request.cookies.get("_klinic")?.value;

  
  if (isProtectedRoute && !cookies) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/main", "/dashboard", "/appointment"],
};
