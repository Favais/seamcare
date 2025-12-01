import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";



const AchievementCard = ({ cardTitle, cardScore, cardPercentage, trend, bgImg }) => {
    return (
        <div className='py-4 sm:py-5 px-3 sm:px-4 bg-white rounded-lg sm:rounded-md flex flex-col gap-3 sm:gap-4 relative flex-1'>
            <div className='flex justify-between items-center'>
                <p className='text-neutral-600 font-black text-sm sm:text-base'>{cardTitle}</p>
                <BsThreeDotsVertical className='text-neutral-700 text-sm sm:text-base' />
            </div>
            <div className='flex flex-col gap-2 py-2 sm:py-3 px-2 sm:px-2'>
                <p className='text-3xl sm:text-4xl font-bold text-neutral-700'>{cardScore}</p>
                <div className='flex items-center gap-2 font-semibold text-xs sm:text-sm'>
                    {trend === 'upTrend' ? <FaArrowAltCircleUp className='text-green-600' /> : trend === 'downTrend' ? <FaArrowAltCircleDown className='text-amber-500' /> : null}
                    <p className='text-green-600'>+{cardPercentage}</p>
                </div>
            </div>
            <div className='absolute right-3 sm:right-4 bottom-4 sm:bottom-5 text-amber-100 text-3xl sm:text-5xl p-2 sm:p-4'>
                {bgImg}
            </div>
        </div>
    )
}

export default AchievementCard