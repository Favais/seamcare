import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const usePatientAppointments = (patientId) => {
    return useQuery({
        queryKey: ["appointments", patientId],   // ← cache per patient
        queryFn: async () => {
            const { data } = await api.get(`/appointments/${patientId}`);
            return data;
        },
        enabled: !!patientId, // ← prevents query from running when patientId is null
    });
};
