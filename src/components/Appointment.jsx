import React from 'react'
import TableData from './TableData'

const Appointment = () => {
    return (
        <div className='flex flex-col px-2 sm:px-3 rounded-lg bg-white'>
            <div className='flex flex-col sm:flex-row justify-between py-3 px-2 gap-2 sm:gap-0'>
                <p className='text-base sm:text-lg font-semibold text-neutral-600'>Appointments</p>
                <button className='text-blue-500 text-sm sm:text-base w-fit'>View All</button>
            </div>
            <TableData />
        </div>
    )
}

export default Appointment