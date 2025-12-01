import React from 'react'
import Header from '@/components/Header';
import UpcomingSchedule from '@/components/UpcomingSchedule';
import Summary from '@/components/Summary';
import Appointment from '@/components/Appointment';


const page = async () => {
    return (
        <div className='bg-neutral-100 min-h-screen px-2 py-3 sm:px-4 sm:py-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 sm:gap-4'>
            <div className='flex flex-col gap-2 sm:gap-3'>
                <Header />
                <Summary />
                <Appointment />
            </div>
            <UpcomingSchedule />
        </div>
    )
}

export default page