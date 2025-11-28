'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaFileAlt, FaUserInjured } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { SlCalender } from 'react-icons/sl';

const navItems = [
    { label: 'Overview', icon: <IoGrid />, href: '/patient' },
    { label: 'Appointment', icon: <RiCalendarScheduleFill />, href: '/patient/appointments' },
    { label: 'Analytics', icon: <FaUserInjured />, href: '/patient/analytics' },
    { label: 'Doctor', icon: <SlCalender />, href: '/patient/doctor' },
    { label: 'Documents', icon: <FaFileAlt />, href: '/patient/documents' },
    { label: 'Help', icon: <FaFileAlt />, href: '/patient/help' }
];

const Sidebar = () => {
    const pathname = usePathname();


    return (
        <aside className="w-[260px] min-h-screen bg-white p-4 flex flex-col justify-between">
            {/* Logo */}
            <div className="flex space-x-2">
                <Image src="/seamlogo.png" alt="Logo" className="h-8" width={40} height={30} />
                <span className="text-lg font-semibold">Patient Portal</span>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className={`flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition ${pathname === item.href ? 'bg-blue-50 text-blue-500 font-semibold' : 'text-gray-500'}`}
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-red-500 text-white rounded-full px-2 text-xs">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <LogOut onClick={() => signOut({ callbackUrl: "/login" })} className="ml-auto text-gray-500 w-6 h-6 cursor-pointer hover:text-red-500" />

            </div>
        </aside >
    )
}

export default Sidebar