import React from 'react'
import { FaStar, FaArrowRight } from "react-icons/fa";
import heroImg from '../../public/hero.svg'
import users from '../../public/Users.svg'
import Image from 'next/image';

const Hero = () => {
    return (
        <div className='py-20 px-14 flex gap-10'>
            <div className=' flex flex-col gap-10 flex-1'>
                <div className='px-6 py-2 items-center gap-4 flex bg-blue-100 rounded-full w-fit'>
                    <FaStar className='text-blue-500' />
                    <p className='text-blue-500'>Rated #1 choice for healthcare appointments by users</p>
                </div>
                <div>
                    <p className='text-6xl leading-normal font-medium'>Connecting You <span className='text-blue-500 italic'>to</span> Better Health</p>
                    <p className='text-lg text-neutral-500 leading-normal'>We're here to link you directly to improved health outcomes, effortlessly connecting you with the care you need.</p>
                </div>
                <div className='flex gap-6 font-medium'>
                    <button className='px-12 py-4 bg-blue-500 text-white rounded-full'> Book Consultation</button>
                    <button className='items-center text-blue-500 flex gap-2 px-12 py-4 border border-blue-500 rounded-full'>Learn More <FaArrowRight /></button>
                </div>
            </div>
            <div className='flex flex-col flex-1 relative'>
                <div className='flex absolute h-fit right-16 -top-6'>
                    <div className='flex py-4 px-4 gap-2 border border-blue-100 rounded-2xl max-w-72 z-50 bg-white '>
                        <p className='font-semibold text-5xl text-blue-500'>10K+</p>
                        <p className='text-center'>Hours Of Patient Meetings</p>
                    </div>
                </div>
                <Image className='' src={heroImg} alt='hero image' />
                <div className='py-4  px-4 flex flex-col gap-4 border bg-white rounded-2xl w-fit border-blue-100 absolute -bottom-12 -left-6'>
                    <div className='flex gap-4'>
                        <Image alt='users icon' src={users} />
                        <p className='text-4xl text-blue-500 font-semibold'>2.650+</p>
                    </div>
                    <p className='text-center text-neutral-500'>We have our patcients trust</p>
                </div>
            </div>
        </div>
    )
}

export default Hero