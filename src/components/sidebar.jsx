'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaCalendarAlt, FaUserInjured, FaClock, FaFileAlt, FaCog, FaBell, FaEnvelope, FaNotesMedical } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { HiOutlineLogout } from 'react-icons/hi';
import Image from 'next/image';
import logo from '../../public/seamlogo.png'
import { IoGrid } from 'react-icons/io5';
import { RiCalendarScheduleFill } from "react-icons/ri";
import { signOut } from 'next-auth/react';
import { useAppContext } from '@/context/AppContext';




const navItems = [
    { label: 'Overview', icon: <IoGrid />, href: '/doctor' },
    { label: 'Appointment', icon: <RiCalendarScheduleFill />, href: '/doctor/appointment' },
    { label: 'Patients', icon: <FaUserInjured />, href: '/doctor/patients' },
    { label: 'Schedule', icon: <SlCalender />, href: '/doctor/schedule' },
    { label: 'Documents', icon: <FaFileAlt />, href: '/doctor/documents' },
    // { label: 'Messages', icon: <FaEnvelope />, href: '/messages', badge: 4 },
    { label: 'Medication', icon: <FaNotesMedical />, href: '/doctor/prescriptions' },
    { label: 'Notification', icon: <FaBell />, href: '/doctor/notification' },
    { label: 'Settings', icon: <FaCog />, href: '/doctor/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    const { session } = useAppContext();
    return (
        <aside className=" min-h-screen bg-white sm:p-4 flex flex-col justify-between overflow-y-auto">
            {/* Logo */}
            <div>
                <Image width={50} height={50} src={logo} alt='logo' priority className='sm:w-[70px]' />
                {/* <div className="flex items-center gap-2 mb-8 text-blue-600 font-bold text-xl">
                    <span className="text-3xl">➕</span>
                    <span>Health Cline</span>
                </div> */}

                {/* Nav Items */}
                <nav className="flex flex-col gap-2 items-center sm:items-start sm:gap-3 mt-4 sm:mt-6">
                    {navItems.map(({ label, icon, href, badge }) => (
                        <Link
                            key={label}
                            href={href}
                            className={`flex items-center w-fit justify-between px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg hover:bg-blue-50 transition text-xs sm:text-sm ${pathname === href ? 'bg-blue-50 text-blue-500 font-semibold' : 'text-gray-500'
                                }`}
                        >
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-base sm:text-lg flex-shrink-0">{icon}</span>
                                <span className='hidden sm:inline'>{label}</span>
                            </div>
                            {badge && (
                                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1">
                                    {badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer (Doctor Info) */}
            <div className="flex items-center gap-2 sm:gap-3 mt-8 sm:mt-10 p-2 border-t pt-3 sm:pt-4">
                {/* <CgProfile className="w-10 h-10 rounded-full object-cover" /> */}
                <div className="text-xs sm:text-sm hidden sm:block">
                    <p className="font-semibold">{session?.user.firstName} {session?.user.lastName}</p>
                    <p className="text-gray-500 text-xs">{ }</p>
                </div>
                <HiOutlineLogout onClick={() => signOut({ callbackUrl: "/login" })} className="ml-auto text-gray-500 w-5 sm:w-6 h-5 sm:h-6 cursor-pointer hover:text-red-500 transition flex-shrink-0" />
            </div>
        </aside>
    );
}
