"use client"
import Header from '@/components/Header'
import { AddAppointment } from '@/components/patient-route/AddAppointment'
import DoctorProfile from '@/components/patient-route/DoctorProfile'
import { dividerClasses } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const BookAppointment = () => {
    const [doctor, setDoctor] = useState(null)
    return (
        <div className='p-5 flex gap-5'>
            <div className='flex-2/3'>
                <AddAppointment doctor={doctor} setDoctor={setDoctor} />
            </div>
            <div className='flex-1/3'>
                {doctor && (
                    <DoctorProfile doctor={doctor} />
                )}

            </div>
        </div>
    )
}

export default BookAppointment