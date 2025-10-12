import mongoose, { Schema, models } from "mongoose";

const PatientProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bloodGroup: String,
    allergies: [String],
    medicalHistory: [String],
});

const PatientProfile =
    models.PatientProfile ||
    mongoose.model("PatientProfile", PatientProfileSchema);
export default PatientProfile;
