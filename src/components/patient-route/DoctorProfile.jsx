import { MessageSquareDiff, PhoneCall, Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DoctorProfile = ({ doctor }) => {
    return (
        doctor ? (
            <div className='py-7 px-4 bg-white rounded-2xl flex flex-col gap-2 items-center '>
                <div className='rounded-2xl mt-4'>
                    {doctor?.profileImg ? (
                        <div className="w-[200px] h-[200px] rounded-2xl overflow-hidden relative">
                            <img
                                className="w-full h-full object-cover"
                                src={doctor?.profileImg}
                                alt="Doctor Picture"
                                width={200}
                                height={200}
                            />
                            <span className='absolute p-2 bg-blue-400 border-4 border-white top-0 right-0 rounded-full'></span>
                        </div>
                    ) : (
                        <div className="p-3 w-[100px] h-[100px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}

                </div>
                <p>{doctor?.name}</p>
                <p className='text-sm'>{doctor?.category}</p>
                <div className='flex gap-2 py-3'>
                    <span className='p-3 bg-[#f9fce8] rounded-full border border-[#bacd51]'><MessageSquareDiff className='' /></span>
                    <span className='p-3 bg-[#f9fce8] rounded-full border border-[#bacd51]'> <PhoneCall /></span>
                    <span className='p-3 bg-[#f9fce8] rounded-full border border-[#bacd51]'><Mail /></span>
                </div>
                <div>
                    <p className='text-left font-medium py-2 mb-2'>Biography</p>
                    <p className='py-5 px-5 border rounded-2xl'>{doctor?.biography}</p>
                </div>
            </div>
        ) : (null)
    )
}

export default DoctorProfile