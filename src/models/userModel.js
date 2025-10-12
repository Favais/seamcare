import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["doctor", "patient", "admin"], required: true },
    phone: String,
    gender: String,
    // Shared fields
    profilePicture: String,
    dateOfBirth: Date,

}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default userModel;