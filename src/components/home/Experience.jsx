import React from 'react'
import Swiper from './Swiper'

const Experience = () => {
    return (
        <div className='flex flex-col py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-14 gap-4 sm:gap-6'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0'>
                <p className='text-2xl sm:text-3xl md:text-4xl'>Choose Doctor's <span className='text-blue-500 italic'>Expertise</span></p>
                <button className='text-blue-500 text-sm sm:text-base w-fit'>See All</button>
            </div>
            <div>
                <Swiper />
            </div>
        </div>
    )
}

export default Experience