"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { FaBell } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { MdMessage } from "react-icons/md";
import { useSession } from 'next-auth/react';

const Header = ({ value, setValue }) => {
    const { data: session } = useSession();
    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-0'>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center w-full sm:w-auto'>
                <Input value={value} onChange={(e) => setValue(e.target.value)} className={'bg-white p-3 sm:p-4 w-full sm:w-64 text-sm sm:text-base'} type="search" placeholder="Search" />
                <p className='p-2 sm:p-3 bg-blue-500/15 rounded-lg text-xs sm:text-sm whitespace-nowrap'>Welcome back <span className='font-bold text-blue-500'>{session?.user.role === 'doctor' ? "Dr" : ""} {session?.user.lastName}</span></p>
            </div>
            <div className='flex gap-2 sm:gap-4'>
                <Button variant='secondary' size='icon' className='bg-white'>
                    <FaBell className='text-neutral-500 text-base sm:text-lg' />
                </Button>
                <Button variant='secondary' size='icon' className='bg-white'>
                    <MdMessage className='text-neutral-500 text-base sm:text-lg' />
                </Button>
            </div>
        </div>
    )
}

export default Header