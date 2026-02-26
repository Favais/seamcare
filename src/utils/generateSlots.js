// utils/generateSlots.js

import { Slot } from '@/models/slotModel';

function generateTimeSlots(startTime, endTime, duration) {
  const slots = [];
  let t = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);

  while (t < end) {
    slots.push(t.toTimeString().slice(0, 5));
    t = new Date(t.getTime() + duration * 60000);
  }
  return slots;
}

export async function generateSlotsForDoctor(
  doctorId,
  weeklySchedule,
  daysAhead = 30,
) {
  const ops = [];

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(date.getUTCDate() + i);

    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
      date.getUTCDay()
    ];
    const schedule = weeklySchedule.find((s) => s.day === dayName);
    if (!schedule) continue;

    const times = generateTimeSlots(
      schedule.startTime,
      schedule.endTime,
      schedule.slotDuration,
    );

    for (const time of times) {
      ops.push({
        updateOne: {
          filter: { doctorId, date, time },
          update: {
            $setOnInsert: {
              doctorId,
              date,
              time,
              totalSeats: 1,
              availableSeats: 1,
              bookedBy: [],
            },
          },
          upsert: true, // only creates if it doesn't exist yet
        },
      });
    }
  }

  if (ops.length > 0) {
    await Slot.bulkWrite(ops);
  }
}
