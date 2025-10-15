import React from 'react'
import Header from '@/components/Header';
import UpcomingSchedule from '@/components/UpcomingSchedule';
import Summary from '@/components/Summary';
import Appointment from '@/components/Appointment';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';



const page = async () => {
    const session = await getServerSession();

    if (!session) {
        console.log('no signin');

        redirect('/login');
    }
    return (
        <div className='bg-neutral-100 h-screen px-4 py-4 grid grid-cols-[2fr_1fr] gap-4'>
            <div className='flex flex-col gap-3'>
                <Header />
                <Summary />
                <Appointment />
            </div>
            <UpcomingSchedule />
        </div>
    )
}

export default page