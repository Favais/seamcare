export const upcomingSchedule = [
    {
        startTime: "8:30",
        endTime: "9:00",
        title: "Consultation",
        patient: "Vibha",
        type: "Checkup",
        status: "confirmed",
        color: "bg-green-100 text-green-700",
    },
    {
        startTime: "9:00",
        endTime: "10:00",
        title: "Cardiology Follow-up",
        patient: "Daniel Peter",
        type: "Surgery",
        status: "confirmed",
        color: "bg-blue-100 text-blue-700",
    },
    {
        startTime: "10:00",
        endTime: "11:00",
        title: "Blood Test",
        patient: "Sarah",
        type: "Lab",
        status: "pending",
        color: "bg-yellow-100 text-yellow-700",
    },
    {
        startTime: "11:30",
        endTime: "12:00",
        title: "MRI Scan",
        patient: "David Obi",
        type: "Imaging",
        status: "cancelled",
        color: "bg-red-100 text-red-700",
    },
    {
        startTime: "1:00",
        endTime: "1:30",
        title: "Dental Surgery",
        patient: "Mrs. Faith",
        type: "Surgery",
        status: "confirmed",
        color: "bg-blue-100 text-blue-700",
    },
    {
        startTime: "1:30",
        endTime: "2:00",
        title: "X-Ray",
        patient: "Mrs. Josh",
        type: "X-Ray",
        status: "confirmed",
        color: "bg-blue-100 text-blue-700",
    },
];

function generateTimeSlots(start = 8, end = 17) {
    const times = [];
    for (let hour = start; hour <= end; hour++) {
        times.push(`${hour}:00`);
        if (hour !== end) times.push(`${hour}:30`);
    }

    // Optional: convert to 12-hour format
    return times.map(t => {
        const [h, m] = t.split(':');
        const hour = parseInt(h, 10);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${m} ${suffix}`;
    });
}

export const timeSlots = generateTimeSlots(); // ["8:00 AM", "8:30 AM", ..., "5:00 PM"]

export const hours = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM",
];
