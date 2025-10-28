import DoctorProfile from "@/models/doctorProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET(request) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const db = await connectDB();
    const doctorProfiles = await DoctorProfile.findOne({ userId });
    return NextResponse.json(doctorProfiles);
}