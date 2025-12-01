import Image from 'next/image'
import React from 'react'
import Mobile from '../../../public/Mobile.svg'
import iPhone from '../../../public/iPhone.svg'
import { SlCalender } from "react-icons/sl";
import { MdOutlineContactPhone } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";




const Features = () => {
    return (
        <div className='flex flex-col py-10 sm:py-16 lg:py-20 gap-4 sm:gap-6'>
            <div className='items-center justify-center flex px-4'>
                <p className='text-2xl sm:text-3xl md:text-4xl text-center'>Explore Our App's <span className='text-blue-500 italic'>Features</span></p>
            </div>
            <div className='flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-14 gap-2 sm:gap-4'>
                <div className='flex flex-col gap-2 w-full lg:w-2/3'>
                    <div className='px-4 sm:px-6 py-4 sm:py-7 gap-4 sm:gap-6 flex flex-col sm:flex-row bg-neutral-100 rounded-lg sm:rounded-2xl'>
                        <div className='flex flex-col gap-4 sm:gap-6 justify-center'>
                            <div className='w-fit p-2 bg-neutral-200 rounded-full'>
                                <SlCalender size={24} className='sm:text-3xl text-blue-500' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-lg sm:text-2xl'>Convenient Online Booking</p>
                                <p className='font-medium text-neutral-500 text-sm sm:text-base'>Easily schedule consultations and meetings with healthcare professionals through our user-friendly online booking platform.</p>
                            </div>
                        </div>
                        <Image className='w-full sm:w-auto sm:min-w-[200px]' src={Mobile} alt='mobile-img' />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-2'>
                        <div className='flex flex-col px-4 sm:px-6 py-6 sm:py-10 gap-4 sm:gap-6 bg-neutral-100 rounded-lg sm:rounded-2xl flex-1'>
                            <div className='p-2 w-fit rounded-full bg-neutral-200'>
                                <IoDocuments size={24} className='sm:text-3xl text-blue-500' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-lg sm:text-2xl font-medium'>Records Management</p>
                                <p className='text-neutral-500 text-sm sm:text-base'>Effortlessly store and access patient medical records, ensuring vital information is available for healthcare providers during appointments.</p>
                            </div>
                        </div>
                        <div className='flex flex-col px-4 sm:px-6 py-6 sm:py-10 gap-4 sm:gap-6 bg-neutral-100 rounded-lg sm:rounded-2xl flex-1'>
                            <div className='p-2 w-fit rounded-full bg-neutral-200'>
                                <IoDocuments size={24} className='sm:text-3xl text-blue-500' />
                            </div>
                            <div className='flex flex-col gap-2 justify-center'>
                                <p className='text-lg sm:text-2xl font-medium'>Records Management</p>
                                <p className='text-neutral-500 text-sm sm:text-base'>Effortlessly store and access patient medical records, ensuring vital information is available for healthcare providers during appointments.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-4 sm:py-6 px-4 sm:px-10 flex flex-col gap-8 sm:gap-15 bg-neutral-100 rounded-lg sm:rounded-2xl w-full lg:w-1/3 mt-2 sm:mt-0'>
                    <div className='flex flex-col gap-4 sm:gap-6'>
                        <div className='bg-neutral-200 rounded-full w-fit p-2'>
                            <MdOutlineContactPhone size={24} className='sm:text-3xl text-blue-500' />
                        </div>
                        <p className='text-lg sm:text-2xl'>Secure Virtual Meeting</p>
                        <p className='text-sm sm:text-base'>Experience secure and convenient virtual consultations from home. Our encrypted video conferencing guarantees confidential interactions, removing the need for in-person visits.</p>
                    </div>
                    <Image width={250} src={iPhone} alt='iPhone-img' className='w-full sm:w-auto' />
                </div>
            </div>
        </div>
    )
}

export default Features