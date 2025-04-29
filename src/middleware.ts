import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAdminRoute = (route: string) => route.startsWith("/admin") && route !== "/login";
const isUserProtectedRoute = (route: string) => route.startsWith("/user") && route !== "/login";
const isDoctorProtectedRoute = (route: string) => route.startsWith("/doctor") && route !== "/login";

export function middleware(req: NextRequest) {

  const userType = req.cookies.get("user")?.value;
  const token = req.cookies.get("refreshToken")?.value || req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();
  const pathName = url.pathname;
  ;

  if (userType !== "Admin" && isAdminRoute(pathName)) {
    url.pathname = "/login/admin";
    return NextResponse.redirect(url);
  }

  if (userType === "Admin" && (pathName === "/login" || pathName === "/login/admin" || pathName == "/")) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }


  if (userType === "Admin") {
    if (isUserProtectedRoute(pathName) || isDoctorProtectedRoute(pathName)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (!token && isUserProtectedRoute(pathName)) {
    if (req.headers.get("referer")?.includes("/user")) {
      return NextResponse.next();
    }
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (
    userType === "User" &&
    (pathName === "/login" || pathName === "/register" || pathName === "/")
  ) {
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  if (userType === "User") {
    if (isAdminRoute(pathName) || isDoctorProtectedRoute(pathName)) {
    
      
      url.pathname = "/user";
      return NextResponse.redirect(url);
    }
    console.log("pathname",pathName);
  }


  if (!token && isDoctorProtectedRoute(pathName)) {
    url.pathname = "/login/doctor";
    return NextResponse.redirect(url);
  }

  if (
  
    userType === "Doctor" &&
    (pathName === "/login" || pathName === "/register" || pathName === "/")
  ) {
    url.pathname = "/doctor";
    return NextResponse.redirect(url);
  }
  


  if (userType === "Doctor") {
    if (isAdminRoute(pathName) || isUserProtectedRoute(pathName)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};


