import connectDB from "@/lib/db";
import DoctorProfile from "@/models/doctorProfile";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const doctorsProfile = await DoctorProfile.find();

        const doctorProfile = await Promise.all(
            doctorsProfile.map(async (docProfile) => {
                const userDoctor = await userModel.findById(docProfile.userId);

                return {
                    userId: userDoctor._id,
                    firstName: userDoctor.firstName,
                    lastName: userDoctor.lastName,
                    email: userDoctor.email,
                    gender: userDoctor.gender,
                    role: userDoctor.role,

                    specialization: docProfile.specialization,
                    experience: docProfile.experience,
                    hospital: docProfile.hospital,

                    weeklySchedule: docProfile.weeklySchedule,
                    biography: docProfile.biography,
                    profileImg: docProfile.profileImg,
                    rating: docProfile.rating,

                    createdAt: userDoctor.createdAt
                };
            })
        );

        return NextResponse.json(doctorProfile);

    } catch (error) {
        console.error("Error fetching doctors:", error);
        return NextResponse.json(
            { message: "Failed to fetch doctor profiles" },
            { status: 500 }
        );
    }
}
