import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import document from "@/models/document";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        connectDB();
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder: "uploads" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        return NextResponse.json({ message: "Failed to upload file" }, { status: 500 });
                    }
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        const savedFile = await document.create({
            filename: file?.name,
            fileUrl: result.secure_url,
            fileFormat: file?.type,
            fileType: formData.get("fileType"),
            patientId: formData.get("patientId"),
            uploadedBy: formData.get("uploadedBy"),
            publicId: result?.public_id,
            size: file?.size,
        })
        return NextResponse.json({ url: result.secure_url }, { status: 200 });

    } catch (error) {
        console.error("UploadDocs POST Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}