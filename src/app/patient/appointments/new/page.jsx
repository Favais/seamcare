"use client"
import Header from '@/components/Header'
import { AddAppointment } from '@/components/patient-route/AddAppointment'
import DoctorProfile from '@/components/patient-route/DoctorProfile'
import { dividerClasses } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [doctor, setDoctor] = useState({})
    return (
        <div>
            <Header />
            <div className='p-5 flex gap-5'>
                <div className='flex-2/3'>
                    <p className='text-3xl my-4'>Make Appointment</p>
                    <AddAppointment doctor={doctor} setDoctor={setDoctor} />
                </div>
                <div className='flex-1/3'>
                    {/* <DoctorProfile doctor={doctor} /> */}
                </div>
            </div>
        </div>
    )
}

export default page