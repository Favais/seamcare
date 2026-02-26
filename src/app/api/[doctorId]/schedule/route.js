import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import DoctorProfile from '@/models/doctorProfile';

export const PATCH = async (request) => {
  try {
    await connectDB();
    const { id, weeklySchedule } = await request.json();
    const doctorProfile = await DoctorProfile.findByIdAndUpdate(
      id,
      { $set: { weeklySchedule } },
      { new: true, runValidators: true },
    );

    if (!doctorProfile) {
      return NextResponse.json(
        { error: 'Doctor profile not found' },
        { status: 404 },
      );
    }

    // After schedule is saved, generate slot documents for next 30 days
    await generateSlotsForDoctor(
      doctorProfile.userId,
      doctorProfile.weeklySchedule,
      30,
    );

    return NextResponse.json({ doctorProfile });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to update schedule', details: error.message },
      { status: 500 },
    );
  }
};
