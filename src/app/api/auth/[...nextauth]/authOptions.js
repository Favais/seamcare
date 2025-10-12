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
                return { email: user.email, name: user.name, role: user.role };
            },
        })

    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        // signIn: '/auth/signin',
    },
};