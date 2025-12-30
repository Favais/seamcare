import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useDoctorAppointments = (doctorId) => {
    return useQuery({
        queryKey: ["appointments", doctorId],   // ← cache per patient
        queryFn: async () => {
            const { data } = await api.post(`/${doctorId}/appointments`);
            return data.appointments;
        },
        enabled: !!doctorId, // ← prevents query from running when doctorId is null
    });
};
