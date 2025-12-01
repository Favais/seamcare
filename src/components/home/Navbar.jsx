import React from 'react'
import Image from 'next/image'
import logo from '../../../public/seamlogo.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-3 sm:py-4'>
            <Image alt='logo' src={logo} width={50} height={50} priority className='sm:w-[70px]' />
            <ul className='hidden md:flex gap-6 lg:gap-12 text-neutral-500 text-sm lg:text-base'>
                <li className='text-blue-500'>Home</li>
                <li>Services</li>
                <li>Doctors</li>
                <li>Blog</li>
                <li>About</li>
            </ul>
            <div className='flex gap-2 sm:gap-3'>
                <Link href='/login' className='py-2 px-4 sm:py-3 sm:px-6 lg:px-8 bg-white text-blue-500 font-montserrat rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white text-xs sm:text-sm transition'>Login</Link>
                <Link href='/register' className='py-2 px-4 sm:py-3 sm:px-6 lg:px-8 bg-blue-500 text-white font-montserrat rounded-full hover:bg-blue-600 text-xs sm:text-sm transition'>Register</Link>
            </div>
        </div>
    )
}

export default Navbar