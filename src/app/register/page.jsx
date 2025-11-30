"use client"
import StepOne from '@/components/signup/StepOne';
import StepThree from '@/components/signup/StepThree';
import StepTwo from '@/components/signup/StepTwo';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';


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
        <div className='font-poppins h-screen bg-blue-500/25 bg-cover bg-center py-4 w-full flex'>
            <div className='flex flex-col  justify-center items-center h-full p-4 flex-1/2'>
                <h1 className='text-2xl font-bold mb-8 text-white'>Connecting Doctors and Patients Seamlessly</h1>
                <p className='text-white mb-8'>Join the platform that makes healthcare communication simple, secure, and personal.</p>
            </div>
            <div className='flex p-6 gap-8 flex-1/2'>
                <div className='bg-white w-full p-8 rounded-3xl shadow-lg overflow-auto'>
                    <div className='flex justify-between'>
                        <h1 className=''>Welcome to <span className='text-blue-500'>SeamCare</span></h1>
                        <div className='text-gray-600 text-sm'>
                            <p>Have an account? </p>
                            <Link href="/login" className='text-blue-500'>Login</Link>
                        </div>
                    </div>
                    <h1 className='text-4xl font-medium mb-4'>Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className=''>

                        <div className='flex gap-4 mb-4'>
                            <input type="hidden" {...register("role")} />
                            <button onClick={() => handleRoleSelect('patient')} className={`flex-1 py-1 px-8 ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600`}>Patient</button>
                            <button onClick={() => handleRoleSelect('doctor')} className={`flex-1 py-1 px-8 ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:text-white'} font-poppins rounded-full border border-blue-500 hover:bg-blue-600`}>Doctor</button>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 1 ? "bg-blue-500 text-white" : step > 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                                >
                                    1
                                </div>
                                <p className="text-sm mt-1">Basic Info</p>
                            </div>

                            {/* Line */}
                            <div className={`flex-1 h-1 ${step > 1 ? "bg-blue-500" : "bg-gray-300"}`}></div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 2 ? "bg-blue-500 text-white" : step > 2 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                                >
                                    2
                                </div>
                                <p className="text-sm mt-1">Personal Info</p>
                            </div>

                            {/* Line */}
                            <div className={`flex-1 h-1 ${step > 2 ? "bg-blue-500" : "bg-gray-300"}`}></div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                                >
                                    3
                                </div>
                                <p className="text-sm mt-1">{role === 'patient' ? 'Patient Info' : 'Doctor Info'}</p>
                            </div>
                        </div>


                        {/* {errors && <p className="text-red-500 mb-2">{errors}</p>} */}
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