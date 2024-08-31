import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedRoutes = ["/main", "/dashboard", "/appointment"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // Check if the authentication cookie exists
  const isAuthenticated = request.cookies.has("token");

  // If it's a protected route and the cookie is missing, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    console.log("Redirecting to /login because the _klinic cookie is missing.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Apply this middleware to protected routes
export const config = {
  matcher: ["/main", "/dashboard", "/appointment"],
};
