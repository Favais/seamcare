import connectDB from "@/lib/db"
import appointmentSchema from "@/models/appointmentSchema"
import DoctorProfile from "@/models/doctorProfile"
import { Slot } from "@radix-ui/react-slot"
import { NextResponse } from "next/server"


export const POST = async (req, { params }) => {
    try {
        await connectDB()
        const { doctorId } = await params
        const { date } = await req.json()
        const doctor = await DoctorProfile.findOne({ userId: doctorId })
        if (!doctor) return Response.json([]);

        const dateObj = new Date(date);
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dateObj.getDay()];

        const schedule = doctor.weeklySchedule.find(s => s.day === weekday);
        if (!schedule) return Response.json([]);

        function generateSlots(start, end, duration) {
            const result = [];
            let t = new Date(`2000-01-01T${start}`);
            const e = new Date(`2000-01-01T${end}`);

            while (t < e) {
                result.push(t.toTimeString().slice(0, 5));
                t = new Date(t.getTime() + duration * 60000);
            }
            return result;
        }

        const allSlots = generateSlots(schedule.startTime, schedule.endTime, schedule.slotDuration);

        function getUTCDateRange(date) {
            const d = new Date(date);
            const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
            const end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59, 999));

            return { start, end };
        }

        const { start, end } = getUTCDateRange(date)
        const booked = await appointmentSchema.find({
            doctorId,
            date: { $gte: start, $lte: end }
        });
        const bookedTimes = booked.map(b => b.time);

        const available = allSlots.filter(t => !bookedTimes.includes(t));
        return NextResponse.json(available)
    } catch (error) {
        console.error("GET /api/doctors/[doctorId]/slots error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}