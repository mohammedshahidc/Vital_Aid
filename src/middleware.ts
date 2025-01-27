import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = (route: string) => route.startsWith("/admin") && route !== "/login";
const isUserProtectedRoute = (route: string) => route.startsWith("/user") && route !== "/login";
const isDoctorProtectedRoute = (route: string) => route.startsWith("/doctor") && route !== "/login";

export function middleware(req: NextRequest) {
  console.log("Middleware executed for:", req.nextUrl.pathname);

  const userType = req.cookies.get("user")?.value;
  const token = req.cookies.get("refreshmentToken")?.value || req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();
  const pathName = url.pathname;

  if (userType !== "Admin" && isAdminRoute(pathName)) {
    url.pathname = pathName;
    return NextResponse.redirect(url);
  }

  if (userType === "Admin" && pathName === "/login") {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (!token && isUserProtectedRoute(pathName)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && userType === "User" && (pathName === "/login" || pathName === "/register")) {
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  if (!token && isDoctorProtectedRoute(pathName)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && userType === "Doctor" && (pathName === "/login" || pathName === "/register")) {
    url.pathname = "/doctor";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: "/:path*", 
};


