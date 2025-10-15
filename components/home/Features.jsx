import Image from 'next/image'
import React from 'react'
import Mobile from '../../public/Mobile.svg'
import iPhone from '../../public/iPhone.svg'
import { SlCalender } from "react-icons/sl";
import { MdOutlineContactPhone } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";




const Features = () => {
    return (
        <div className='flex flex-col py-20 gap-6'>
            <div className='items-center justify-center flex'>
                <p className='text-4xl'>Explore Our App's <span className='text-blue-500 italic'>Features</span></p>
            </div>
            <div className='flex px-14 gap-2'>
                <div className='flex flex-col gap-2 flex-2/3'>
                    <div className='px-6 pt-7 gap-6 flex bg-neutral-100 rounded-2xl'>
                        <div className='flex flex-col gap-6 justify-center'>
                            <div className='w-fit p-2 bg-neutral-200 rounded-full'>
                                <SlCalender size={30} className='text-blue-500' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-2xl'>Convenient Online Booking</p>
                                <p className='font-medium text-neutral-500'>Easily schedule consultations and meetings with healthcare professionals through our user-friendly online booking platform.</p>
                            </div>
                        </div>
                        <Image className='' src={Mobile} alt='mobile-img' />
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col px-6 py-10 gap-6 bg-neutral-100 rounded-2xl'>
                            <div className='p-2 w-fit rounded-full bg-neutral-200'>
                                <IoDocuments size={30} className='text-blue-500' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-2xl font-medium'>Records Management</p>
                                <p className='text-neutral-500'>Effortlessly store and access patient medical records, ensuring vital information is available for healthcare providers during appointments.</p>
                            </div>
                        </div>
                        <div className='flex flex-col px-6 py-10 gap-6 bg-neutral-100 rounded-2xl'>
                            <div className='p-2 w-fit rounded-full bg-neutral-200'>
                                <IoDocuments size={30} className='text-blue-500' />
                            </div>
                            <div className='flex flex-col gap-2 justify-center'>
                                <p className='text-2xl font-medium'>Records Management</p>
                                <p className='text-neutral-500'>Effortlessly store and access patient medical records, ensuring vital information is available for healthcare providers during appointments.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-6 px-10 flex flex-col gap-15 bg-neutral-100 rounded-2xl flex-1/3'>
                    <div className='flex flex-col gap-6'>
                        <div className='bg-neutral-200 rounded-full w-fit p-2'>
                            <MdOutlineContactPhone size={30} className='text-blue-500' />
                        </div>
                        <p className='text-2xl'>Secure Virtual Meeting</p>
                        <p>Experience secure and convenient virtual consultations from home. Our encrypted video conferencing guarantees confidential interactions, removing the need for in-person visits.</p>
                    </div>
                    <Image width={300} src={iPhone} alt='iPhone-img' />
                </div>
            </div>
        </div>
    )
}

export default Features