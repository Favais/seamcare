import connectDB from "@/lib/db"
import appointmentSchema from "@/models/appointmentSchema";
import { NextResponse } from "next/server"


export const POST = async (request) => {
    try {
        await connectDB();
        const { patientId, doctorId, date, time, reason } = await request.json();
        const today = new Date();
        const dateString = today.toISOString().slice(0, 10).replace(/-/g, ""); // e.g. 20251022

        const countToday = await appointmentSchema.countDocuments({
            createdAt: {
                $gte: new Date(today.setHours(0, 0, 0, 0)),
                $lt: new Date(today.setHours(23, 59, 59, 999)),
            },
        });
        const nextNumber = countToday + 1;
        const visitorId = `${dateString}-${String(nextNumber).padStart(3, "0")}`;


        const appoinment = new appointmentSchema({
            visitorId,
            patientId,
            doctorId,
            date,
            time,
            reason,
            status: "pending"
        });



        await appoinment.save();
        return NextResponse.json({ message: "Appointment created successfully", appointment: appoinment }, { status: 201 });
    } catch (error) {
        console.error("Error connecting to database:", error);
        return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
    }
}

export const GET = async (request) => {
    try {
        await connectDB();
        const appointments = await appointmentSchema.find();
        return NextResponse.json({ appointments }, { status: 200 });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
    }
}