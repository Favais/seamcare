import connectDB from "@/lib/db";
import { sendEmail } from "@/lib/email";
import DoctorProfile from "@/models/doctorProfile";
import PatientProfile from "@/models/patientProfile";
import userModel from "@/models/userModel";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (request) => {
    try {
        const {
            email,
            password,
            role,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phone,

            // Doctor fields
            specialization,
            experience,
            hospital,
            weeklySchedule,
            biography,
            profileImg,
            rating,

            // Patient fields
            bloodGroup,
            insurance,
            medicalHistory,
            vitals,
            appointments,
            labResults,
            vaccinations
        } = await request.json();

        // ============================
        // VALIDATE BASIC FIELDS
        // ============================
        if (!email || !password || !role || !firstName || !lastName) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // ============================
        // CREATE USER
        // ============================
        const hashedPassword = await hashPassword(password);

        const newUser = new userModel({
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phone

        });

        await newUser.save();

        // ============================
        // GENERATE PATIENT NUMBER
        // ============================
        const genPatientNumber = () => {
            const prefix = "SMC";
            const timestamp = new Date()
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, "");
            const randomPart = Math.random()
                .toString(36)
                .substring(2, 7)
                .toUpperCase();
            return `${prefix}-${timestamp}-${randomPart}`;
        };

        // ============================
        // CREATE PATIENT PROFILE
        // ============================
        if (role === "patient") {
            await PatientProfile.create({
                userId: newUser._id,
                patientNumber: genPatientNumber(),
                bloodGroup: bloodGroup || null,

                insurance: insurance || {
                    provider: null,
                    policyNumber: null,
                    groupNumber: null,
                    copay: null,
                    deductible: null,
                    status: "Inactive",
                    validTill: null
                },

                medicalHistory: medicalHistory || {
                    conditions: [],
                    allergies: [],
                    medications: [],
                    surgeries: [],
                    familyHistory: [],
                    treatmentHistory: []
                },

                vitals: vitals || {
                    date: null,
                    bloodPressure: null,
                    heartRate: null,
                    temperature: null,
                    respiratoryRate: null,
                    spo2: null,
                    weight: null,
                    height: null
                },
                labResults: labResults || [],

                vaccinations: vaccinations || []
            });
        }

        // ============================
        // CREATE DOCTOR PROFILE
        // ============================
        else if (role === "doctor") {
            await DoctorProfile.create({
                userId: newUser._id,
                specialization,
                experience,
                hospital,
                weeklySchedule: weeklySchedule || [],
                biography: biography || "",
                profileImg: profileImg || "",
                rating: rating || 0
            });
        }
        try {
            await sendEmail({
                to: email,
                subject: "Welcome to SeamCare!",
                name: firstName,
                role,
                loginUrl: "https://seamcare.com/login",
            })
            console.log("Welcome email sent to:", email);
        } catch (error) {
            console.error("Welcome email failed:", {
                message: error?.error?.message || error.message,
                status: error?.error?.statusCode,
            });
        }
        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error in user registration:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
