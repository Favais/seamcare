import mongoose, { Schema } from 'mongoose';

const counterSchema = new Schema({
  _id: String, // e.g. "20251022"
  seq: { type: Number, default: 0 },
});

export const Counter =
  mongoose.models.Counter || mongoose.model('Counter', counterSchema);
