import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const user = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    console.log("Middleware executing:", {
      user: user?.email,
      role: user?.role,
      pathname,
    });

    // 1. Redirect logged-in users away from login page to their dashboard
    if (pathname === "/login" && user?.role) {
      let targetPath = "/";

      switch (user.role) {
        case "admin":
          targetPath = "/admin";
          break;
        case "doctor":
          targetPath = "/doctor";
          break;
        case "patient":
          targetPath = "/patient";
          break;
        default:
          targetPath = "/";
      }
      console.log("Redirecting to:", targetPath);
      return NextResponse.redirect(new URL(targetPath, req.url));
    }

    // 2. Protect doctor routes
    if (pathname.startsWith("/doctor") && user?.role !== "doctor") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 3. Protect patient routes
    if (pathname.startsWith("/patient") && user?.role !== "patient") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        console.log(pathname);

        if (pathname === "/login" || pathname === "/register") {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/doctor/:path*", "/patient/:path*", "/login", "/register"],
};
