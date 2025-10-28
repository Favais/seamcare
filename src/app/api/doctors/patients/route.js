import connectDB from "@/lib/db"
import PatientProfile from "@/models/patientProfile";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";


export const GET = async () => {
    connectDB();
    const userPatient = await userModel.find({ role: "patient" })
    const patientsinfo = userPatient.map(async (patient) => {
        const patientProfileInfo = await PatientProfile.find({ userId: userPatient._id })
        console.log(patientProfileInfo);

    })

    const patientDetails = {

    }
    return NextResponse.json({ message: "All patients details fetched", patientsinfo )
}