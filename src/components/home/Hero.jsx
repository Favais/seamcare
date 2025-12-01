import React from 'react'
import { FaStar, FaArrowRight } from "react-icons/fa";
import heroImg from '../../../public/hero.svg'
import users from '../../../public/Users.svg'
import Image from 'next/image';

const Hero = () => {
    return (
        ~        <div className='py-10 px-4 sm:px-6 md:px-8 lg:px-14 flex flex-col lg:flex-row gap-6 lg:gap-10'>
            <div className='flex flex-col gap-6 sm:gap-8 lg:gap-10 flex-1'>
                <div className='px-4 sm:px-6 py-2 items-center gap-3 sm:gap-4 flex bg-blue-100 rounded-full w-fit text-xs sm:text-sm'>
                    <FaStar className='text-blue-500 flex-shrink-0' />
                    <p className='text-blue-500'>Rated #1 choice for healthcare appointments by users</p>
                </div>
                <div>
                    <p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-normal font-medium'>Connecting You <span className='text-blue-500 italic'>to</span> Better Health</p>
                    <p className='text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed mt-3 sm:mt-4'>We're here to link you directly to improved health outcomes, effortlessly connecting you with the care you need.</p>
                </div>
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-6 font-medium text-sm sm:text-base'>
                    <button className='px-6 sm:px-12 py-3 sm:py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition'>Book Consultation</button>
                    <button className='flex items-center justify-center sm:justify-start text-blue-500 gap-2 px-6 sm:px-12 py-3 sm:py-4 border border-blue-500 rounded-full hover:bg-blue-50 transition'>Learn More <FaArrowRight /></button>
                </div>
            </div>
            <div className='flex flex-col flex-1 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[auto]'>
                <div className='flex absolute h-fit right-2 sm:right-6 lg:right-16 top-2 sm:-top-2 lg:-top-6'>
                    <div className='flex py-3 px-3 sm:py-4 sm:px-4 gap-2 border border-blue-100 rounded-lg sm:rounded-2xl max-w-xs sm:max-w-sm lg:max-w-72 z-50 bg-white'>
                        <p className='font-semibold text-2xl sm:text-4xl lg:text-5xl text-blue-500'>10K+</p>
                        <p className='text-center text-xs sm:text-sm lg:text-base'>Hours Of Patient Meetings</p>
                    </div>
                </div>
                <Image className='w-full h-auto object-cover' src={heroImg} alt='hero image' />
                <div className='py-3 px-3 sm:py-4 sm:px-4 flex flex-col gap-3 sm:gap-4 border bg-white rounded-lg sm:rounded-2xl w-fit border-blue-100 absolute -bottom-6 sm:-bottom-8 lg:-bottom-12 -left-2 sm:-left-4 lg:-left-6'>
                    <div className='flex gap-3 sm:gap-4'>
                        <Image alt='users icon' src={users} width={30} height={30} />
                        <p className='text-2xl sm:text-3xl lg:text-4xl text-blue-500 font-semibold'>2.650+</p>
                    </div>
                    <p className='text-center text-xs sm:text-sm lg:text-base text-neutral-500'>We have our patients trust</p>
                </div>
            </div>
        </div>
    )
}

export default Hero