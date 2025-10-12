import Header from '@/components/Header'
import Patients from '@/components/patient/Patients'
import React from 'react'

const page = () => {
    return (
        <div className='py-3 px-4 flex flex-col gap-5'>
            {/* <Header /> */}
            <Patients />
        </div>
    )
}

export default page