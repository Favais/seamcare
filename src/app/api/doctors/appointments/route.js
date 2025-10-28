import appointmentSchema from "@/models/appointmentSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import connectDB from "@/lib/db";
import userModel from "@/models/userModel";
import PatientProfile from "@/models/patientProfile";

export const POST = async (request) => {
    try {
        await connectDB();
        // const session = await getServerSession(authOptions);
        // const userId = session?.user?.id;

        const { userId } = await request.json();
        const appointmentsData = await appointmentSchema.find({ doctorId: userId });
        const doctorInfo = await userModel.findOne({ _id: userId })

        const appointments = await Promise.all(
            appointmentsData.map(async (appointment) => {
                const patientData = await userModel.findOne({ _id: appointment.patientId });
                const patientProfile = await PatientProfile.findOne({ userId: patientData._id });

                const formattedDate = new Date(appointment.date).toDateString();
                const formattedTime = new Date(Number(appointment.time)).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });

                const allAppointmentData = {
                    id: appointment._id,
                    visitorId: appointment.visitorId,
                    patientName: `${patientData.firstName} ${patientData.lastName}`,
                    doctorName: `${doctorInfo.firstName} ${doctorInfo.lastName}`,
                    patientId: patientProfile.patientId,
                    gender: patientData.gender,
                    date: formattedDate,
                    time: formattedTime,
                    status: appointment.status,
                    reason: appointment.reason,
                };

                return allAppointmentData;
            })
        );

        return NextResponse.json(
            { message: "Fetched your appointments", appointments },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch appointments", details: error.message },
            { status: 500 }
        );
    }
};
