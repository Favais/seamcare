import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        fileUrl: String,
        publicId: String,
        fileType: {
            type: String,
            enum: ["prescription", "labResults", "referral", "notes", "imaging"],
            required: true,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Document ||
    mongoose.model("Document", DocumentSchema);