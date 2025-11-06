import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";


const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    const [doctorProfiles, setDoctorProfiles] = useState(null);
    const [appointments, setAppointments] = useState({})
    const [patients, setPatients] = useState({})
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession();

    const user = {
        userId: session?.user?.id,
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        email: session?.user?.email,
        role: session?.user?.role,

    }

    const getAppointments = async () => {
        try {
            if (session && user?.role === "doctor") {
                const res = await axios.post('/api/doctors/appointments', { userId: user.userId })
                setAppointments(res.data.appointments)
            }
        } catch (error) {
            console.log(error);

        }

    }

    const getPatients = async () => {
        try {
            if (session && user?.role === "doctor") {
                const res = await axios.get('/api/doctors/patients')
                setPatients(res.data.patientsinfo)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (session && user?.role === "doctor") {
            const fetchDoctorProfiles = async () => {
                setLoading(true)
                const response = await axios.get(`/api/doctors`);
                setDoctorProfiles(response.data);
                setLoading(false)
            }
            fetchDoctorProfiles();
        }
    }, [session]);

    useEffect(() => {
        getAppointments()
        getPatients()
    }, [session])

    const value = {
        session,
        user,
        doctorProfiles,
        appointments, loading, setLoading, patients
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);