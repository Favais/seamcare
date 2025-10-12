import mongoose, { Schema } from "mongoose"

const DoctorProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    specialization: String,
    experience: Number,
    hospital: String,
    availableDays: [String],
    availableTimeSlots: [String],
})
const DoctorProfile = mongoose.models.DoctorProfile || mongoose.model("DoctorProfile", DoctorProfileSchema);

export default DoctorProfile;