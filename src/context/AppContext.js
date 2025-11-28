import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";


const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    const [doctorProfiles, setDoctorProfiles] = useState(null);
    const [appointments, setAppointments] = useState([])
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

    const getAppointments = async (doctorId) => {
        try {
            if (session && user?.role === "doctor") {
                const res = await axios.post(`/api/${doctorId}/appointments`, { userId: user.userId })
                setAppointments(res.data.appointments)
            }
        } catch (error) {
            console.log(error);
        }

    }
    // const fetchDailyTimeSlots = async (doctorId, date) => {
    //     try {
    //         const res = await axios.post(`/api/${doctorId}/slots`, { date })
    //         console.log(res.data)
    //         return res.data
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    const getPatients = async (doctorId) => {
        try {
            if (session && user?.role === "doctor") {
                const res = await axios.get(`/api/${doctorId}/patients`)
                setPatients(res.data.patientsinfo)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };


    useEffect(() => {

        if (session && user?.role === "doctor") {
            try {
                const fetchDoctorProfiles = async (doctorId) => {
                    setLoading(true)
                    const response = await axios.get(`/api/${doctorId}`);
                    setDoctorProfiles(response.data);
                    setLoading(false)
                }
                fetchDoctorProfiles(user.userId);
            } catch (error) {
                console.log(error);

            }
        }
    }, [session]);

    useEffect(() => {
        getAppointments(user?.userId)
        getPatients(user?.userId)

    }, [session])

    useEffect(() => {

    }, [patients])
    const value = {
        session,
        user,
        doctorProfiles,
        appointments, loading,
        setLoading, patients, formatDate
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);