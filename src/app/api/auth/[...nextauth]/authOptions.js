import connectDB from "@/lib/db";
import userModel from "@/models/userModel";
import { comparePassword } from "@/utils/auth";
import Credentials from "next-auth/providers/credentials";


export const authOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                connectDB();
                const user = await userModel.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("No user found with the given email");
                }
                const isValid = await comparePassword(credentials.password, user.password); // Ensure comparePassword is imported
                if (!isValid) {
                    throw new Error("Invalid password");
                }
                return {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                };
            },
        })

    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // When user logs in, merge their info into the token
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },

        async session({ session, token }) {
            // Make all token info available in the session
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
            }
            return session;
        }
    }
};