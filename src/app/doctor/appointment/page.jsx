"use client"
import Appointments from '@/components/appointment/Appointments'
import Header from '@/components/Header'
import React, { useState } from 'react'

const page = () => {
    const [globalFilter, setGlobalFilter] = useState("");

    return (
        <div className='py-3 px-4 flex flex-col gap-8'>
            <div className='pt-3'>
                <Header value={globalFilter} setValue={setGlobalFilter} />
            </div>
            <div>
                <Appointments globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            </div>
        </div>
    )
}

export default page