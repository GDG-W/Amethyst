import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const authPages = ["/login", "/buy", "/"]; // add unathenticated pages route here.

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;
  const userCookie = request.cookies.get("user")?.value || null;

  let user = null;
  try {
    if (userCookie) {
      user = JSON.parse(userCookie);
    }
  } catch (err) {
    console.error("Failed to parse user cookie:", err);
  }

  const isAuth = Boolean(token && user);
  const { pathname } = request.nextUrl;
  const isAuthPage = authPages.includes(pathname);

  // ✅ Redirect authenticated users trying to access auth pages
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Redirect unauthenticated users trying to access protected pages
  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run middleware on everything EXCEPT static assets
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|css|js)).*)",
  ],
};
