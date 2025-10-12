import connectDB from "@/lib/db";
import DoctorProfile from "@/models/doctorProfile";
import PatientProfile from "@/models/patientProfile";
import userModel from "@/models/userModel";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server"
connectDB();
export const POST = async (request) => {
    try {

        const { email, password, role, firstName, lastName } = await request.json();


        if (!email || !password || !role || !firstName || !lastName) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new userModel({
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName
        });

        await newUser.save();

        if (role === "patient") {
            await PatientProfile.create({ userId: newUser._id });
        } else if (role === "doctor") {
            await DoctorProfile.create({ userId: newUser._id });
        }

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error in user registration:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}