import connectDB from "@/lib/db";
import appointmentSchema from "@/models/appointmentSchema";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const { patientId } = await params;

        const appointments = await appointmentSchema.find({ patientId })
            .populate("doctorId", "firstName lastName email")
        return NextResponse.json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);

        return NextResponse.json(
            { success: false, message: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
};
