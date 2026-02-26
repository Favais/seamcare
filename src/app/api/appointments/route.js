import connectDB from '@/lib/db';
import appointmentSchema from '@/models/appointmentSchema';
import { Counter } from '@/models/counterModel';
import DoctorProfile from '@/models/doctorProfile';
import PatientProfile from '@/models/patientProfile';
import userModel from '@/models/userModel';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  try {
    await connectDB();
    const { patientId, doctorId, date, time, reason } = await request.json();
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10).replace(/-/g, ''); // e.g. 20251022
    const dateOnly = new Date(date);
    dateOnly.setUTCHours(0, 0, 0, 0);

    // Step 1 — Validate slot exists in doctor's weekly schedule
    const doctorProfile = await DoctorProfile.findOne({ userId: doctorId });
    if (!doctorProfile) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
      dateOnly.getUTCDay()
    ];
    const schedule = doctorProfile.weeklySchedule.find(
      (s) => s.day === dayName,
    );

    if (!schedule) {
      return NextResponse.json(
        { error: 'Doctor does not work on this day' },
        { status: 400 },
      );
    }

    // Step 2 — Validate time falls on a valid slot boundary
    const toMinutes = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const start = toMinutes(schedule.startTime);
    const end = toMinutes(schedule.endTime);
    const requested = toMinutes(time);

    const isValidTime =
      requested >= start &&
      requested < end &&
      (requested - start) % schedule.slotDuration === 0;

    if (!isValidTime) {
      return NextResponse.json(
        { error: 'Invalid time slot for this doctor' },
        { status: 400 },
      );
    }
    const patientProfile = await PatientProfile.findOne({ userId: patientId });
    if (!patientProfile) {
      return NextResponse.json(
        { error: 'Patient profile not found' },
        { status: 404 },
      );
    }

    const counter = await Counter.findOneAndUpdate(
      { _id: dateString },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    const visitorId = `${dateString}-${String(counter.seq).padStart(3, '0')}`;

    //  Atomic slot reservation — unique index rejects second request
    let appointment;
    try {
      appointment = await appointmentSchema.findOneAndUpdate(
        { doctorId, date: dateOnly, time },
        {
          $setOnInsert: {
            // only writes on INSERT, not update
            visitorId,
            patientId,
            patientNumber: patientProfile.patientNumber,
            doctorId,
            date: dateOnly,
            time,
            reason,
            status: 'pending',
          },
        },
        { new: true, upsert: true },
      );
    } catch (err) {
      if (err.code === 11000) {
        //  Unique index blocked the second insert — slot already taken
        return NextResponse.json(
          { error: 'Slot is already booked.' },
          { status: 409 },
        );
      }
      throw err;
    }

    return NextResponse.json(
      { message: 'Appointment created successfully', appointment },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error connecting to database:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 },
    );
  }
};

export const GET = async (request) => {
  try {
    await connectDB();
    const appointments = await appointmentSchema.find();
    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 },
    );
  }
};
