"use client"
import StepOne from '@/components/signup/StepOne';
import StepThree from '@/components/signup/StepThree';
import StepTwo from '@/components/signup/StepTwo';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/registerSchema';



const page = () => {
    const [role, setRole] = useState('patient');
    const [step, setStep] = useState(1);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        trigger,
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { role: 'patient' }
    })
    const router = useRouter();

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleRoleSelect = (value) => {
        setRole(value);            // update UI
        setValue("role", value);   // update RHF form value
        reset({ role: value });
        setStep(1);                // reset to step 1
    };
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await axios.post('/api/auth/register', data);
            toast.success(res.data.message);
            router.push('/login');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }

    }
    return (
        <div className='font-poppins min-h-screen bg-blue-500/25 bg-cover bg-center py-4 w-full flex flex-col lg:flex-row'>
            {/* Left Section - Hero Content (Hidden on mobile, visible on lg) */}
            <div className='hidden lg:flex flex-col justify-center items-center flex-1 p-4'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white text-center'>Connecting Doctors and Patients Seamlessly</h1>
                <p className='text-white mb-6 sm:mb-8 text-sm sm:text-base text-center max-w-md'>Join the platform that makes healthcare communication simple, secure, and personal.</p>
            </div>

            {/* Right Section - Register Form */}
            <div className='flex p-3 sm:p-6 gap-4 sm:gap-8 flex-1 items-center justify-center'>
                <div className='bg-white w-full max-w-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg overflow-auto max-h-screen sm:max-h-none'>
                    {/* Header */}
                    <div className='flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6'>
                        <h1 className='text-sm sm:text-base'>Welcome to <span className='text-blue-500 font-semibold'>SeamCare</span></h1>
                        <div className='text-gray-600 text-xs sm:text-sm'>
                            <p>Have an account? </p>
                            <Link href="/login" className='text-blue-500 hover:underline font-medium'>Login</Link>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 sm:mb-4'>Register</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                        {/* Role Buttons */}
                        <div className='flex gap-2 sm:gap-4 mb-4 sm:mb-6'>
                            <input type="hidden" {...register("role")} />
                            <button
                                type='button'
                                onClick={() => handleRoleSelect('patient')}
                                className={`flex-1 py-2 sm:py-3 px-4 sm:px-8 text-xs sm:text-sm lg:text-base ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600 transition`}
                            >
                                Patient
                            </button>
                            <button
                                type='button'
                                onClick={() => handleRoleSelect('doctor')}
                                className={`flex-1 py-2 sm:py-3 px-4 sm:px-8 text-xs sm:text-sm lg:text-base ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600 transition`}
                            >
                                Doctor
                            </button>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold ${step === 1 ? "bg-blue-500 text-white" : step > 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                                >
                                    1
                                </div>
                                <p className="text-xs sm:text-sm mt-1 text-center">Basic Info</p>
                            </div>

                            {/* Line */}
                            <div className={`flex-1 h-1 mx-1 sm:mx-2 ${step > 1 ? "bg-blue-500" : "bg-gray-300"}`}></div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold ${step === 2 ? "bg-blue-500 text-white" : step > 2 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                                >
                                    2
                                </div>
                                <p className="text-xs sm:text-sm mt-1 text-center">Personal Info</p>
                            </div>

                            {/* Line */}
                            <div className={`flex-1 h-1 mx-1 sm:mx-2 ${step > 2 ? "bg-blue-500" : "bg-gray-300"}`}></div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                                >
                                    3
                                </div>
                                <p className="text-xs sm:text-sm mt-1 text-center">{role === 'patient' ? 'Patient Info' : 'Doctor Info'}</p>
                            </div>
                        </div>

                        {/* Form Steps */}
                        {step === 1 && (<StepOne role={role} register={register} handleSubmit={handleSubmit} nextStep={nextStep} errors={errors} trigger={trigger} />)}
                        {step === 2 && (<StepTwo role={role} register={register} handleSubmit={handleSubmit} nextStep={nextStep} prevStep={prevStep} errors={errors} trigger={trigger} />)}
                        {step === 3 && (<StepThree role={role} register={register} handleSubmit={handleSubmit} nextStep={nextStep} prevStep={prevStep} errors={errors} trigger={trigger} />)}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page