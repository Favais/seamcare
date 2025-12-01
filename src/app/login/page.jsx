"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from "lucide-react"; // optional icon library
import { sendEmail } from '@/lib/email';

const Login = () => {
    const [role, setRole] = useState('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [medicalLicenseNumber, setMedicalLicenseNumber] = useState('');
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl")
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
                role,
                medicalLicenseNumber: role === 'doctor' ? medicalLicenseNumber : undefined,
                callbackUrl: callbackUrl || (role === 'doctor' ? '/doctor' : '/patient')
            });

            if (res.error) {
                setError(res.error);
                toast.error(res.error);
                return;
            } else if (res.ok && res.url) {
                toast.success("Welcome Back!");
                router.push(res.url);
            }
        } catch (error) {
            console.error("Error signing in:", error);
            setError("Something went wrong.");
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
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
                            <Link href="/register" className='text-blue-500'>Sign up</Link>
                        </div>
                    </div>
                    <h1 className='text-4xl font-medium mb-8'>Sign in</h1>
                    <div className='flex gap-4 mb-8'>
                        <button onClick={() => setRole('patient')} className={`py-3 px-8 flex-1 ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600`}>Patient</button>
                        <button onClick={() => setRole('doctor')} className={`py-3 px-8 flex-1 ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600`}>Doctor</button>
                    </div>

                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>                        {role === 'doctor' && (
                            <input type='text' value={medicalLicenseNumber} onChange={(e) => setMedicalLicenseNumber(e.target.value)} placeholder='Medical License Number' className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        )}
                        <button className='flex justify-center py-3 px-8 bg-blue-500 text-white font-poppins rounded-full hover:bg-blue-600 mt-4'>
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login