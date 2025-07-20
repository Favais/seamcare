import React from 'react'
import TableData from './TableData'

const Appointment = () => {
    return (
        <div className='flex flex-col px-3 rounded-lg bg-white'>
            <div className='flex justify-between py-3 px-2'>
                <p className='text-lg font-semibold text-neutral-600'>Appointments</p>
                <button className='text-blue-500'>View All</button>
            </div>
            <TableData />
        </div>
    )
}

export default Appointment