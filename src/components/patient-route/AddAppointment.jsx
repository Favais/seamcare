"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { ActivityIcon, Brain, Calendar, Cross, Eye, Heart, MoreVertical, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import { BsStarFill } from 'react-icons/bs';
import { useAppContext } from '@/context/AppContext';
import SelectSchedule from './SelectSchedule';
import axios from 'axios';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export const AddAppointment = ({ doctor, setDoctor }) => {
    const { formatDate, user } = useAppContext()
    const [allDoctors, setAllDoctors] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState()
    const [reason, setReason] = useState('')
    const categories = [
        {
            id: "pediatrics",
            label: "Pediatrics",
            icon: <Heart className="w-5 h-5" />,
        },
        {
            id: "traumatology",
            label: "Traumatology",
            icon: <Cross className="w-5 h-5" />,
        },
        {
            id: "cardiology",
            label: "Cardiology",
            icon: <Heart className="w-5 h-5" />,
        },
        {
            id: "pulmonology",
            label: "Pulmonology",
            icon: <ActivityIcon className="w-5 h-5" />,
        },
        {
            id: "endocrinology",
            label: "Endocrinology",
            icon: <Zap className="w-5 h-5" />,
        },
        {
            id: "oncology",
            label: "Oncology",
            icon: <Shield className="w-5 h-5" />,
        },
        {
            id: "ophthalmology",
            label: "Ophthalmology",
            icon: <Eye className="w-5 h-5" />,
        },
        {
            id: "psychology",
            label: "Psychology",
            icon: <Brain className="w-5 h-5" />,
        },
        {
            id: "Philosophy",
            label: "Philosophy",
            icon: <Brain className="w-5 h-5" />,
        }
    ];

    const filteredDoctors = useMemo(() => {
        if (!selectedCategory) return allDoctors;
        return allDoctors.filter(doc => doc.specialization?.toLowerCase() === selectedCategory.toLowerCase());
    }, [allDoctors, selectedCategory]);

    const getAllDoctors = async () => {
        try {
            const res = await axios.get('/api/alldoctors')
            setAllDoctors(res.data)
        } catch (error) {
            console.log(error);

        }
    }

    const handleSubmit = async (e) => {
        try {
            const formData = {
                doctorId: doctor.userId,
                patientId: user.userId,
                date: currentDate,
                time: selectedTime,
                reason: reason
            }
            const res = await axios.post('/api/appointments', formData)
            console.log(res);
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getAllDoctors()
    }, [])
    // useEffect(() => {
    //     if (allDoctors.length > 0) {
    //         setDoctor(allDoctors[0]);
    //     }
    // }, [allDoctors]);

    const selectedDoctorName = `${doctor?.firstName} ${doctor?.lastName}`;

    // const doctorsData = [
    //     {
    //         name: "Dr. Sarah Johnson",
    //         img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    //         category: "Cardiologist",
    //         rating: 4.8,
    //     },
    //     {
    //         name: "Dr. Ahmed Bello",
    //         img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    //         category: "General Practitioner",
    //         rating: 4.5,
    //     },
    //     {
    //         name: "Dr. Chika Nwosu",
    //         img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    //         category: "Pediatrician",
    //         rating: 4.9,
    //     },
    //     {
    //         name: "Dr. Emmanuel Adedeji",
    //         img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    //         category: "Neurologist",
    //         rating: 4.7,
    //     },
    //     {
    //         name: "Dr. Grace Okoro",
    //         img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    //         category: "Dermatologist",
    //         rating: 4.6,
    //     },
    // ];

    return (
        <div className='flex gap-3'>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className='bg-white p-6 rounded-2xl'>
                    <label className="block text-sm text-gray-500 mb-8">
                        Choose category
                    </label>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedCategory(category.id)
                                }}
                                className={`
              flex items-center gap-2 px-4 py-2 rounded-full
              transition-all duration-200 font-medium text-sm
              ${selectedCategory === category.id
                                        ? "bg-blue-50 text-blue-600 border border-blue-300"
                                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-150"
                                    }
            `}
                            >
                                <span
                                    className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${selectedCategory === category.id
                                        ? "text-blue-400"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {category.icon}
                                </span>
                                <span>{category.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className=''>
                        {/* <p className={'text-sm font-medium text-gray-500 mb-8'}>Choose doctor</p> */}
                    </div>
                </div>
                <div className='p-5 bg-white rounded-2xl'>
                    <p className='text-sm text-gray-500 mb-8'>Choose doctor</p>
                    <div className='flex flex-wrap gap-2.5'>
                        {filteredDoctors?.length === 0 ? (
                            <p className="text-gray-500 text-sm italic px-2 py-6">
                                No doctor available for this specialization.
                            </p>
                        ) : (filteredDoctors?.map((doc) => {
                            const docName = `${doc.firstName} ${doc.lastName}`
                            return <button
                                key={doc.userId}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setDoctor(doc)
                                }}
                                className={`flex items-center gap-3 px-2 py-2 rounded-3xl text-sm  transition-all duration-200 font-medium
                            ${selectedDoctorName === docName
                                        ? 'bg-blue-50 text-blue-600 border border-blue-300'
                                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-150          '}
                            `}
                            >
                                <img className='rounded-2xl' src={doc.profileImg} width={70} height={100} />
                                <div className='flex flex-col gap-1 items-start p-1'>
                                    <span className='font-medium'>{`${doc.firstName} ${doc.lastName}`}</span>
                                    <span className='text-sm'>{doc.specialization}</span>
                                    <span className='flex items-center gap-2'><BsStarFill />{doc.rating}</span>
                                </div>
                                <MoreVertical />
                            </button>
                        }))}
                    </div>
                </div>
                {filteredDoctors &&
                    <SelectSchedule
                        doctor={doctor}
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                }
                <div className='py-2'>
                    <Label className='text-2xl text-gray-400 font-light p-2' htmlFor="reason"> Reason</Label>
                    <Input value={reason} onChange={(e) => setReason(e.target.value)} type="text" className='p-5' id="reason" placeholder='Reason for consultation' />
                </div>
                {/* Selected DateTime Display & Book Button */}
                <div className="relative">
                    <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-3xl border border-blue-400 flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-2 px-3">
                            <span className="text-lg text-gray-800">
                                {formatDate(currentDate)} {selectedTime && `${'|'} ${selectedTime}`}
                            </span>
                        </div>
                        <Button
                            type="submit"
                            className="bg-blue-400 hover:bg-blue-500 text-gray-800  text-lg px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                            onClick={handleSubmit}
                        >
                            Book
                        </Button>
                    </div>
                </div>
            </form >

        </div >
    )
}
