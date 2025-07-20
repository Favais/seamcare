import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { SlCalender } from 'react-icons/sl'
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { CiMapPin } from 'react-icons/ci'

const PatientProfile = ({ patient }) => {

    const { firstName, lastName } = patient
    const initals = firstName[0] + lastName[0]
    return (
        <div className='mt-3'>
            <Card className='py-3'>
                <CardHeader>
                    <div className='flex py-1 gap-4'>
                        <Avatar className='size-20'>
                            <AvatarFallback className='text-lg'>
                                {initals}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col gap-2 flex-1'>
                            <CardTitle className='text-xl font-medium'>{`${firstName} ${lastName}`}</CardTitle>
                            <p className='text-muted-foreground'>Patient ID: {patient.patientNo}</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex items-center gap-2 text-sm'>
                                    <SlCalender className='text-muted-foreground' />
                                    <span >{`Age: ${patient.age} (${new Date(patient.dateOfBirth).toLocaleDateString()})`}</span>
                                </div>
                                <div className='text-sm'>
                                    <span>Gender: {patient.gender}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <MdOutlineLocalPhone className="h-4 w-4 text-muted-foreground" />
                                    <span>{patient.phone}</span>
                                </div>

                                <div className="flex items-center space-x-2 text-sm">
                                    <CiMail className="h-4 w-4 text-muted-foreground" />
                                    <span>{patient.email}</span>
                                </div>

                                <div className="flex items-center space-x-2 text-sm md:col-span-2">
                                    <CiMapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{`${patient.address.street}, ${patient.address.city}, ${patient.address.state}, ${patient.address.country}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

export default PatientProfile