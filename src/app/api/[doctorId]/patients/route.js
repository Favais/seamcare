import connectDB from "@/lib/db"
import appointmentSchema from "@/models/appointmentSchema";
import PatientProfile from "@/models/patientProfile";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    const { patientId } = await params
    connectDB();
    const userPatient = await userModel.find({ role: "patient" })
    const patientsinfo = await Promise.all(userPatient.map(async (patient) => {
        const patientProfileInfo = await PatientProfile.findOne({ userId: patient._id })
        const appointments = await appointmentSchema.find({ patientId: patient._id })
        return {
            userInfo: {
                id: patient._id,
                firstName: patient.firstName,
                lastName: patient.lastName,
                email: patient.email,
                phone: patient.phone,
                gender: patient.gender,
                profilePicture: patient.profilePicture,
                dateOfBirth: patient.dateOfBirth,
            },
            patientProfileInfo,
            appointments
        };
    }));


    return NextResponse.json({ message: "All patients details fetched", patientsinfo })
}