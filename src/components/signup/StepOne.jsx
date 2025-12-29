import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'

const StepOne = ({ role, register, nextStep, errors, trigger }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNext = async () => {
        const valid = await trigger([
            "firstName",
            "lastName",
            "email",
            "password",
            "confirmPassword"
        ]);

        if (valid) nextStep();
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="firstName" className="block mb-1 text-sm font-medium">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        {...register("firstName")}
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div className="flex-1">
                    <label htmlFor="lastName" className="block mb-1 text-sm font-medium">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        {...register("lastName")}
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium">
                    Password
                </label>
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={`w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className={`w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                        {showConfirmPassword ? <Eye /> : <EyeClosed />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Next
            </button>
        </div>
    )
}

export default StepOne