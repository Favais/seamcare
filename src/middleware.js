import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const user = req.nextauth.token;

        if (req.nextUrl.pathname.startsWith("/doctor") && user?.role !== "doctor") {

            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        if (req.nextUrl.pathname.startsWith("/patient") && user?.role !== "patient") {
            console.log(`patient path but role ${user.role}`);

            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    },
    {
        pages: {
            signIn: "/login", // Redirect here if not authenticated
        },
    });

export const config = {
    matcher: [
        "/doctor/:path*",
        "/patient/:path*",
    ],
};
