// models/slotModel.js
import mongoose, { Schema } from 'mongoose';

const slotSchema = new Schema(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true }, // UTC midnight
    time: { type: String, required: true }, // "09:00"
    totalSeats: { type: Number, required: true, default: 1 },
    availableSeats: { type: Number, required: true, default: 1 },
    bookedBy: [
      {
        patientId: { type: Schema.Types.ObjectId, ref: 'User' },
        visitorId: { type: String },
      },
    ],
  },
  { timestamps: true },
);

// Prevents duplicate slot documents
slotSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

export const Slot = mongoose.models.Slot || mongoose.model('Slot', slotSchema);
