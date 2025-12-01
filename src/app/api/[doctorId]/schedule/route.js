import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import DoctorProfile from "@/models/doctorProfile";


export const PATCH = async (request) => {
    try {
        await connectDB()
        const { id, weeklySchedule } = await request.json()
        const doctorProfile = await DoctorProfile.findByIdAndUpdate(id,
            { $set: { weeklySchedule } },
            { new: true, runValidators: true }
        )
        return NextResponse.json({ doctorProfile })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to update schedule", details: error.message }, { status: 500 })
    }
}