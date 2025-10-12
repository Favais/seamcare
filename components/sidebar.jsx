'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaCalendarAlt, FaUserInjured, FaClock, FaFileAlt, FaCog, FaBell, FaEnvelope, FaNotesMedical } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { HiOutlineLogout } from 'react-icons/hi';
import Image from 'next/image';
import logo from '../public/seamlogo.png'
import { IoGrid } from 'react-icons/io5';
import { RiCalendarScheduleFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";



const navItems = [
    { label: 'Overview', icon: <IoGrid />, href: '/doctor' },
    { label: 'Appointment', icon: <RiCalendarScheduleFill />, href: '/doctor/appointment' },
    { label: 'Patients', icon: <FaUserInjured />, href: '/doctor/patients' },
    { label: 'Schedule', icon: <SlCalender />, href: '/doctor/schedule' },
    { label: 'Documents', icon: <FaFileAlt />, href: '/doctor/documents' },
    // { label: 'Messages', icon: <FaEnvelope />, href: '/messages', badge: 4 },
    { label: 'Medication', icon: <FaNotesMedical />, href: '/doctor/prescriptions' },
    { label: 'Notification', icon: <FaBell />, href: '/doctor/notification', badge: 12 },
    { label: 'Settings', icon: <FaCog />, href: '/doctor/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[260px] min-h-screen bg-white p-4 flex flex-col justify-between">
            {/* Logo */}
            <div>
                <Image width={70} src={logo} alt='logo' priority />
                {/* <div className="flex items-center gap-2 mb-8 text-blue-600 font-bold text-xl">
                    <span className="text-3xl">➕</span>
                    <span>Health Cline</span>
                </div> */}

                {/* Nav Items */}
                <nav className="flex flex-col gap-3">
                    {navItems.map(({ label, icon, href, badge }) => (
                        <Link
                            key={label}
                            href={href}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 transition ${pathname === href ? 'bg-blue-50 text-blue-500 font-semibold' : 'text-gray-500'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{icon}</span>
                                <span className=''>{label}</span>
                            </div>
                            {badge && (
                                <span className="text-xs bg-red-500 text-white rounded-full px-2 py-1">
                                    {badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer (Doctor Info) */}
            <div className="flex items-center gap-3 mt-10 p-2 border-t pt-4">
                {/* <CgProfile className="w-10 h-10 rounded-full object-cover" /> */}
                <div className="text-sm">
                    <p className="font-semibold">Dr James Martin</p>
                    <p className="text-gray-500 text-xs">Cardiac Surgeon</p>
                </div>
            </div>
        </aside>
    );
}
