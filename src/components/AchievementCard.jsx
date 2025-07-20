import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";



const AchievementCard = ({ cardTitle, cardScore, cardPercentage, trend, bgImg }) => {
    return (
        <div className='py-5 px-2 bg-white rounded-md flex flex-col  flex-1/3 gap-4 relative'>
            <div className='flex justify-between items-center'>
                <p className='text-neutral-600 font-black'>{cardTitle}</p>
                <BsThreeDotsVertical className='text-neutral-700' />
            </div>
            <div className='flex flex-col gap-2 py-3 px-2'>
                <p className='text-4xl font-bold text-neutral-700'>{cardScore}</p>
                <div className='flex items-center gap-2 font-semibold'>
                    {trend === 'upTrend' ? <FaArrowAltCircleUp className='text-green-600' /> : trend === 'downTrend' ? <FaArrowAltCircleDown className='text-amber-500' /> : null}
                    <p className='text-green-600'>+{cardPercentage}</p>
                </div>
            </div>
            <div className='absolute right-4 bottom-5 text-amber-100 text-5xl p-4 '>
                {bgImg}
            </div>
        </div>
    )
}

export default AchievementCard