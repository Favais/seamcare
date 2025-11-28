import mongoose, { Schema } from "mongoose"

const DoctorProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    specialization: String,
    experience: Number,
    hospital: String,
    weeklySchedule: [
        {
            day: {
                type: String,
                enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            startTime: String,   // "09:00"
            endTime: String,     // "17:00"
            slotDuration: Number // minutes (e.g. 30)
        }
    ],
    rating: Number,
    biography: String,
    profileImg: String
})
const DoctorProfile = mongoose.models.DoctorProfile || mongoose.model("DoctorProfile", DoctorProfileSchema);

export default DoctorProfile;