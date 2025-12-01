"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
    const [role, setRole] = useState('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [medicalLicenseNumber, setMedicalLicenseNumber] = useState('');
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const router = useRouter();
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
                medicalLicenseNumber:
                    role === 'doctor' ? medicalLicenseNumber : undefined,
                callbackUrl: role === "doctor" ? "/doctor" : "/patient"
            });

            if (res.error) {
                toast.error(res.error);
                setError(res.error);
                return;
            }

            if (res.ok && res.url) {
                toast.success("Welcome Back!");
                router.push(res.url);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='font-poppins min-h-screen bg-blue-500/25 bg-cover bg-center py-4 w-full flex flex-col lg:flex-row'>
            {/* Left Section - Hero Content (Hidden on mobile, visible on lg) */}
            <div className='hidden lg:flex flex-col justify-center items-center flex-1 p-4'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white text-center'>Connecting Doctors and Patients Seamlessly</h1>
                <p className='text-white mb-6 sm:mb-8 text-sm sm:text-base text-center max-w-md'>Join the platform that makes healthcare communication simple, secure, and personal.</p>
            </div>

            {/* Right Section - Login Form */}
            <div className='flex p-3 sm:p-6 gap-4 sm:gap-8 flex-1 items-center justify-center'>
                <div className='bg-white w-full max-w-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg'>
                    {/* Header */}
                    <div className='flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6'>
                        <h1 className='text-sm sm:text-base'>Welcome to <span className='text-blue-500 font-semibold'>SeamCare</span></h1>
                        <div className='text-gray-600 text-xs sm:text-sm'>
                            <p>No account? </p>
                            <Link href="/register" className='text-blue-500 hover:underline font-medium'>Sign up</Link>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 sm:mb-6 lg:mb-8'>Sign in</h1>

                    {/* Role Buttons */}
                    <div className='flex gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8'>
                        <button
                            onClick={() => setRole('patient')}
                            className={`py-2 sm:py-3 px-4 sm:px-8 flex-1 text-xs sm:text-sm lg:text-base ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600 transition`}
                        >
                            Patient
                        </button>
                        <button
                            onClick={() => setRole('doctor')}
                            className={`py-2 sm:py-3 px-4 sm:px-8 flex-1 text-xs sm:text-sm lg:text-base ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600 transition`}
                        >
                            Doctor
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mb-3 sm:mb-4 text-xs sm:text-sm">{error}</p>}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:gap-4'>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                className='p-2 sm:p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base'
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="p-2 sm:p-3 lg:p-4 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                            >
                                {showPassword ? <EyeOff size={18} className='sm:w-5 sm:h-5' /> : <Eye size={18} className='sm:w-5 sm:h-5' />}
                            </button>
                        </div>

                        {/* Medical License (Doctor only) */}
                        {role === 'doctor' && (
                            <input
                                type='text'
                                value={medicalLicenseNumber}
                                onChange={(e) => setMedicalLicenseNumber(e.target.value)}
                                placeholder='Medical License Number'
                                className='p-2 sm:p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base'
                            />
                        )}

                        {/* Submit Button */}
                        <button className='flex justify-center py-2 sm:py-3 lg:py-3 px-4 sm:px-8 bg-blue-500 text-white font-poppins rounded-full hover:bg-blue-600 transition mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base font-medium'>
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 sm:h-5 w-4 sm:w-5 text-white" viewBox="0 0 24 24">
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
    );
}

export default LoginForm;
