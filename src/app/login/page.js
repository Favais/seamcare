"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { signIn, sta } from 'next-auth/react';

const Login = () => {
    const [role, setRole] = useState('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [medicalLicenseNumber, setMedicalLicenseNumber] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                redirect: true,
                email,
                password,
                medicalLicenseNumber: role === 'doctor' ? medicalLicenseNumber : undefined,
                callbackUrl: role === 'doctor' ? '/doctor' : '/patient'
            });
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    return (
        <div className='font-poppins h-screen bg-blue-500/25 bg-cover bg-center py-4 w-full flex'>
            <div className='flex flex-col  justify-center items-center h-full p-4 flex-1/2'>
                <h1 className='text-2xl font-bold mb-8 text-white'>Connecting Doctors and Patients Seamlessly</h1>
                <p className='text-white mb-8'>Join the platform that makes healthcare communication simple, secure, and personal.</p>
            </div>
            <div className='flex p-6 gap-8 flex-1/2'>
                <div className='bg-white w-full p-8 rounded-3xl shadow-lg'>
                    <div className='flex justify-between'>
                        <h1 className=''>Welcome to <span className='text-blue-500'>SeamCare</span></h1>
                        <div className='text-gray-600 text-sm'>
                            <p>No account? </p>
                            <Link href="#" className='text-blue-500'>Sign up</Link>
                        </div>
                    </div>
                    <h1 className='text-5xl font-medium mb-8'>Sign in</h1>
                    <div className='flex gap-4 mb-8'>
                        <button onClick={() => setRole('patient')} className={`py-3 px-8 ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600`}>Patient</button>
                        <button onClick={() => setRole('doctor')} className={`py-3 px-8 ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600`}>Doctor</button>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input type='' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        {role === 'doctor' && (
                            <input type='text' value={medicalLicenseNumber} onChange={(e) => setMedicalLicenseNumber(e.target.value)} placeholder='Medical License Number' className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        )}
                        <button className='py-3 px-8 bg-blue-500 text-white font-poppins rounded-full hover:bg-blue-600 mt-4'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login