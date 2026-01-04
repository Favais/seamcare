import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileFormat: String,
    size: Number,
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    fileUrl: String,
    publicId: String,
    fileType: {
      type: String,
      enum: [
        "prescription",
        "labResults",
        "xRay",
        "mri",
        "ctScan",
        "referral",
        "notes",
        "imaging",
      ],
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
