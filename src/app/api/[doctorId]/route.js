import DoctorProfile from "@/models/doctorProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const { doctorId } = await params
        await connectDB();
        const doctorProfiles = await DoctorProfile.findOne({ userId: doctorId });
        return NextResponse.json(doctorProfiles);
    } catch (error) {
        console.log(error);

    }

}