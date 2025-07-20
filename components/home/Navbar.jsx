import React from 'react'
import Image from 'next/image'
import logo from '../../public/seamlogo.png'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-20 py-4'>
            <Image alt='logo' src={logo} width={70} priority />
            <ul className='flex gap-12 text-neutral-500'>
                <l1 className='text-blue-500'>Home</l1>
                <l1>Services</l1>
                <l1>Doctors</l1>
                <l1>Blog</l1>
                <l1>About</l1>
            </ul>
            <div>
                <button className='py-3 px-16 bg-blue-500 text-white font-montserrat rounded-full'>Register</button>
            </div>
        </div>
    )
}

export default Navbar