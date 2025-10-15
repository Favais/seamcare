import React from 'react'
import aboutImg from '../../public/aboutImg.svg'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'

const AboutUs = () => {
    return (
        <div className='flex gap-6 py-10 px-14'>
            <Image src={aboutImg} alt='about-img' />
            <div className='flex flex-col gap-10'>
                <div className='px-6 py-2 items-center gap-4 flex bg-blue-100 rounded-full w-fit'>
                    <FaStar className='text-blue-500' />
                    <p className='text-blue-500'>Rated #1 for appointments with many professional doctors</p>
                </div>
                <p className='text-3xl'>We're revolutionizing healthcare with seamless access to trusted professionals, prioritizing your journey to better health.</p>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-6xl text-blue-500 text-center'>40+</p>
                        <p className='text-neutral-500 font-medium'>Dedicated Doctors</p>
                    </div>
                    <div>
                        <p className='text-5xl text-blue-500'>10K+</p>
                        <p className='text-neutral-500 font-medium'>Hours of Patient Consultations</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs