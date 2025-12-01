import { MessageSquareDiff, PhoneCall, Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DoctorProfile = ({ doctor }) => {
    return (
        doctor ? (
            <div className='py-4 sm:py-7 px-3 sm:px-4 bg-white rounded-lg sm:rounded-2xl flex flex-col gap-2 items-center'>
                <div className='rounded-lg sm:rounded-2xl mt-2 sm:mt-4'>
                    {doctor?.profileImg ? (
                        <div className="w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-lg sm:rounded-2xl overflow-hidden relative">
                            <img
                                className="w-full h-full object-cover"
                                src={doctor?.profileImg}
                                alt="Doctor Picture"
                                width={200}
                                height={200}
                            />
                            <span className='absolute p-1 sm:p-2 bg-blue-400 border-2 sm:border-4 border-white top-0 right-0 rounded-full'></span>
                        </div>
                    ) : (
                        <div className="p-3 w-24 sm:w-32 h-24 sm:h-32 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                            No Image
                        </div>
                    )}

                </div>
                <p className='text-sm sm:text-base font-semibold mt-2'>{doctor?.name}</p>
                <p className='text-xs sm:text-sm text-neutral-600'>{doctor?.category}</p>
                <div className='flex gap-1 sm:gap-2 py-2 sm:py-3'>
                    <span className='p-2 sm:p-3 bg-[#f9fce8] rounded-full border border-[#bacd51] cursor-pointer hover:bg-opacity-80 transition'><MessageSquareDiff className='text-sm sm:text-base' /></span>
                    <span className='p-2 sm:p-3 bg-[#f9fce8] rounded-full border border-[#bacd51] cursor-pointer hover:bg-opacity-80 transition'><PhoneCall className='text-sm sm:text-base' /></span>
                    <span className='p-2 sm:p-3 bg-[#f9fce8] rounded-full border border-[#bacd51] cursor-pointer hover:bg-opacity-80 transition'><Mail className='text-sm sm:text-base' /></span>
                </div>
                <div className='w-full'>
                    <p className='text-left font-medium py-1 sm:py-2 mb-1 sm:mb-2 text-sm sm:text-base'>Biography</p>
                    <p className='py-3 sm:py-5 px-3 sm:px-5 border rounded-lg sm:rounded-2xl text-xs sm:text-sm text-neutral-700'>{doctor?.biography}</p>
                </div>
            </div>
        ) : (null)
    )
}

export default DoctorProfile