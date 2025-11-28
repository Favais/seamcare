import mongoose, { Schema, models } from "mongoose";

const PatientProfileSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        patientNumber: { type: String, required: true },

        bloodGroup: { type: String },
        insurance: {
            provider: String,
            policyNumber: String,
            groupNumber: { type: String, default: null },
            copay: { type: Number, default: null },
            deductible: { type: Number, default: null },
            status: { type: String, default: "Active" },
            validTill: { type: String },
        },
        medicalHistory: {
            conditions: [String],
            allergies: [
                {
                    name: String,
                    severity: String, // e.g. "Mild", "Moderate", "Severe"
                },
            ],
            medications: [
                {
                    name: String,
                    dosage: String,
                    frequency: String,
                },
            ],
            surgeries: [String],
            familyHistory: [String],
            treatmentHistory: [
                {
                    date: String,
                    diagnosis: String,
                    treatment: String,
                    doctor: String,
                    notes: String,
                },
            ],
        },
        vitals: {
            date: String,
            bloodPressure: String,
            heartRate: Number,
            temperature: Number,
            respiratoryRate: Number,
            spo2: Number,
            weight: Number,
            height: Number,
        },
        labResults: [
            {
                testName: String,
                date: String,
                result: String,
                documentLink: String,
            },
        ],
        vaccinations: [
            {
                vaccine: String,
                doses: Number,
                lastDoseDate: String,
            },
        ],
    },

    { timestamps: true }
);

const PatientProfile =
    models.PatientProfile ||
    mongoose.model("PatientProfile", PatientProfileSchema);

export default PatientProfile;
