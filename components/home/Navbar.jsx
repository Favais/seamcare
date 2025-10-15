import React from 'react'
import Image from 'next/image'
import logo from '../../public/seamlogo.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-20 py-4'>
            <Image alt='logo' src={logo} width={70} priority />
            <ul className='flex gap-12 text-neutral-500'>
                <li className='text-blue-500'>Home</li>
                <li>Services</li>
                <li>Doctors</li>
                <li>Blog</li>
                <li>About</li>
            </ul>
            <div>
                <Link href='/login' className='py-3 px-8 bg-white text-blue-500 font-montserrat rounded-full mr-4 border border-blue-500 hover:bg-blue-500 hover:text-white'>Login</Link>
                <Link href='/register' className='py-3 px-8 bg-blue-500 text-white font-montserrat rounded-full hover:bg-blue-600'>Register</Link>
            </div>
        </div>
    )
}

export default Navbar