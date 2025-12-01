import Header from '@/components/Header'
import Patients from '@/components/patient/Patients'
import React from 'react'

const page = () => {
    return (
        <div className='py-3 px-4 flex flex-col h-full'>
            {/* <Header /> */}
            <Patients />
        </div>
    )
}

export default page