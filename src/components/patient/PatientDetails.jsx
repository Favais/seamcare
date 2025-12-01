"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import PatientProfile from './PatientProfile'
import { GoArrowLeft } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import AppointmentsTable from './AppointmentsTable';
import MedicalRecord from './MedicalRecord';
import Contact from './Contact';



const PatientDetails = ({ setCurrentView, setSelectedPatient, patient }) => {
    const [activeTab, setActiveTab] = useState('overview')

    const handleBackToList = () => {
        setCurrentView('list')
        setSelectedPatient(null)
    }

    const pastAppointment = patient.appointments.filter(apt => apt.status !== 'pending')
    const upcomingAppointment = patient.appointments.filter(apt => apt.status === 'pending')


    return (
        <div>
            <div className='mb-4'>
                <p className='text-lg sm:text-xl font-black'>Patient Details</p>
                <p className='text-xs sm:text-sm text-neutral-600'>Comprehensive patient information and medical history</p>
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4'>
                <div className='flex gap-2 sm:gap-4 items-center flex-wrap'>
                    <Button variant='outline' onClick={handleBackToList} className='text-xs sm:text-sm'><GoArrowLeft />Back to Patients</Button>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto'>
                    <Button variant={'outline'} className='text-xs sm:text-sm'><FaRegEdit />Edit Patient</Button>
                    <Button className='text-xs sm:text-sm'><BsCalendar />Schedule Appointment</Button>
                </div>
            </div>
            <PatientProfile
                patient={patient}
            />
            <Tabs className='py-2 sm:py-3' value={activeTab} onValueChange={setActiveTab}>
                <TabsList className='grid grid-cols-2 sm:grid-cols-4 w-full bg-white gap-1'>
                    <TabsTrigger className='text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md' value='overview'>Overview</TabsTrigger>
                    <TabsTrigger className='text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white' value='appointments'>Appointments</TabsTrigger>
                    <TabsTrigger className='text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white' value='medical'>Medical</TabsTrigger>
                    <TabsTrigger className='text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white' value='contact'>Contact</TabsTrigger>
                </TabsList>
                <TabsContent className='flex flex-col gap-2' value={'overview'}>
                    <AppointmentsTable appointments={upcomingAppointment} title='Upcoming Appointments' pages={2} />
                    <AppointmentsTable appointments={pastAppointment} title='Past Appointments' pages={2} />
                </TabsContent>
                <TabsContent value={'appointments'}>
                    <AppointmentsTable appointments={patient.appointments} title={'Appoinment Hisory'} pages={12} />
                </TabsContent>
                <TabsContent value={'medical'}>
                    <MedicalRecord
                        patient={patient}
                    />
                </TabsContent>
                <TabsContent value={'contact'}>
                    <Contact emergencyContacts={patient.patientProfileInfo.emergencyContact} insurance={patient.patientProfileInfo.insurance} />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default PatientDetails