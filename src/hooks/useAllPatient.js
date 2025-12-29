import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchPatients = async (doctorId) => {
    const res = await axios.get(`/api/${doctorId}/patients`)
    return res.data.patientsInfo

}

export const usePatients = ({ doctorId, session, user }) => {
    return useQuery({
        queryKey: ['patients', doctorId],
        queryFn: () => fetchPatients(doctorId),
        enabled: !!doctorId && !!session && user?.role === 'doctor',
    })
}
