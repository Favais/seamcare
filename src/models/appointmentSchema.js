import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    visitorId: {
        type: String,
        unique: true,
        sparse: true,  // <— this allows multiple nulls or missing values
    },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    patientNumber: String,
    date: Date,
    time: String,
    reason: String,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

// mongoose.models = {};
export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
