import React, { useState } from 'react'
import { Button } from '../ui/button'
import PatientProfile from './PatientProfile'
import { GoArrowLeft } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import AppointmentsTable from './AppointmentsTable';



const PatientDetails = ({ setCurrentView, setSelectedPatient, patient }) => {
    const [activeTab, setActiveTab] = useState('overview')
    console.log(activeTab);

    const handleBackToList = () => {
        setCurrentView('list')
        setSelectedPatient(null)
    }

    const pastAppointment = patient.appointments.filter(apt => apt.status !== 'Upcoming')
    const upcomingAppointment = patient.appointments.filter(apt => apt.status === 'Upcoming')


    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <Button variant='outline' onClick={handleBackToList}><GoArrowLeft />Back to Patients</Button>
                    <div>
                        <p className='text-xl font-black'>Patient Details</p>
                        <p className='text-sm'>Comprehensive patient information and medical history</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <Button variant={'outline'}><FaRegEdit />Edit Patient</Button>
                    <Button><BsCalendar />Schedule Appointment</Button>
                </div>
            </div>
            <PatientProfile patient={patient} />
            <Tabs className='py-3' value={activeTab} onValueChange={setActiveTab}>
                <TabsList className='grid grid-cols-4 w-full bg-white'>
                    <TabsTrigger className='data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md' value='overview'>Overview</TabsTrigger>
                    <TabsTrigger className='data-[state=active]:bg-blue-500 data-[state=active]:text-white' value='appointments'>Appointments</TabsTrigger>
                    <TabsTrigger className='data-[state=active]:bg-blue-500 data-[state=active]:text-white' value='medical'>Medical Records</TabsTrigger>
                    <TabsTrigger className='data-[state=active]:bg-blue-500 data-[state=active]:text-white' value='contact'>Contact & Insurance</TabsTrigger>
                </TabsList>
                <TabsContent className='flex flex-col gap-2' value={'overview'}>
                    <AppointmentsTable appointments={upcomingAppointment} title='Upcoming Appointments' pages={2} />
                    <AppointmentsTable appointments={pastAppointment} title='Past Appointments' pages={2} />
                </TabsContent>
                <TabsContent value={'appointments'}>
                    <AppointmentsTable appointments={patient.appointments} title={'Appoinment Hisory'} pages={12} />
                </TabsContent>
            </Tabs>

        </div >
    )
}

export default PatientDetails