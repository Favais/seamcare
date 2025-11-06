import connectDB from "@/lib/db"
import PatientProfile from "@/models/patientProfile";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


export const GET = async () => {
    connectDB();
    const userPatient = await userModel.find({ role: "patient" })
    const patientsinfo = await Promise.all(userPatient.map(async (patient) => {
        const patientProfileInfo = await PatientProfile.findOne({ userId: patient._id })
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
            patientProfileInfo
        };
    }));


    return NextResponse.json({ message: "All patients details fetched", patientsinfo })
}