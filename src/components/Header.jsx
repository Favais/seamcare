"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { FaBell } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { MdMessage } from "react-icons/md";

const Header = ({ value, setValue }) => {

    return (
        <div className='flex justify-between'>
            <Input value={value} onChange={(e) => setValue(e.target.value)} className={'bg-white p-4 w-64 '} type="search" placeholder="Search" />

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