import React from 'react'
import aboutImg from '../../../public/aboutImg.svg'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'

const AboutUs = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 py-8 sm:py-12 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-14'>
            <div className='w-full lg:w-auto'>
                <Image src={aboutImg} alt='about-img' className='w-full h-auto object-cover rounded-lg' />
            </div>
            <div className='flex flex-col gap-6 sm:gap-8 lg:gap-10 flex-1'>
                <div className='px-4 sm:px-6 py-2 items-center gap-3 sm:gap-4 flex bg-blue-100 rounded-full w-fit text-xs sm:text-sm'>
                    <FaStar className='text-blue-500 flex-shrink-0' />
                    <p className='text-blue-500'>Rated #1 for appointments with many professional doctors</p>
                </div>
                <p className='text-2xl sm:text-3xl lg:text-4xl leading-snug'>We're revolutionizing healthcare with seamless access to trusted professionals, prioritizing your journey to better health.</p>
                <div className='flex flex-col sm:flex-row gap-6 sm:gap-8 justify-start sm:justify-between'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-4xl sm:text-5xl lg:text-6xl text-blue-500 text-center sm:text-left'>40+</p>
                        <p className='text-neutral-500 font-medium text-sm sm:text-base'>Dedicated Doctors</p>
                    </div>
                    <div>
                        <p className='text-3xl sm:text-4xl lg:text-5xl text-blue-500'>10K+</p>
                        <p className='text-neutral-500 font-medium text-sm sm:text-base'>Hours of Patient Consultations</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs