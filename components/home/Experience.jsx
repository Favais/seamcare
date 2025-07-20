import React from 'react'
import Swiper from './Swiper'

const Experience = () => {
    return (
        <div className='flex flex-col py-20 px-14 gap-6'>
            <div className='flex justify-between'>
                <p className='text-4xl '>Choose Doctor's <span className='text-blue-500 italic'> Expertise</span></p>
                <button className='text-blue-500'>See All</button>
            </div>
            <div>
                <Swiper />
            </div>
        </div>
    )
}

export default Experience