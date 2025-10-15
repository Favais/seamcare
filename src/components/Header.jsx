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
        <div className='flex justify-between'>
            <div className='flex gap-6 items-center'>
                <Input value={value} onChange={(e) => setValue(e.target.value)} className={'bg-white p-4 w-64 '} type="search" placeholder="Search" />
                <p className='p-3 bg-blue-500/15 rounded-lg'>Welcome back <span className='font-bold text-blue-500'>{session?.user.role === 'doctor' ? "Dr" : "User"} {session?.user.lastName}</span></p>
            </div>
            <div className='flex gap-4'>
                <Button variant='secondary' size='icon' className='bg-white'>
                    <FaBell className='text-neutral-500' />
                </Button>
                <Button variant='secondary' size='icon' className='bg-white'>
                    <MdMessage className='text-neutral-500' />
                </Button>
            </div>
        </div>
    )
}

export default Header