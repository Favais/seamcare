import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // Redirect here if not authenticated
    },
});

export const config = {
    matcher: ["/doctor/:path*"],
};
