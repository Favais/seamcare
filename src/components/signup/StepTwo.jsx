import React from 'react'

const StepTwo = ({ register, prevStep, nextStep, errors, trigger }) => {
    const handleNext = async () => {
        const valid = await trigger([
            "dateOfBirth",
            "gender",
            "address",
            "phone"
        ]);

        if (valid) nextStep();
    };

    return (
        <div className='flex flex-col gap-4'>
            {/* Date of Birth */}
            <div>
                <label htmlFor="dob" className="block mb-1 text-sm font-medium">
                    Date of Birth
                </label>
                <input
                    id="dob"
                    type="date"
                    {...register("dateOfBirth")}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
            </div>

            {/* Gender */}
            <div>
                <label htmlFor="gender" className="block mb-1 text-sm font-medium">
                    Gender
                </label>
                <select
                    id="gender"
                    {...register("gender")}
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
            </div>

            {/* Address */}
            <div>
                <label htmlFor="address" className="block mb-1 text-sm font-medium">
                    Address
                </label>
                <input
                    id="address"
                    type="text"
                    {...register("address")}
                    placeholder="Enter your address"
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium">
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+234 801 234 5678"
                    className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div className='flex gap-3'>
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-4 py-2 rounded flex-1 hover:bg-gray-600 transition"
                >
                    Go Back
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white px-4 py-2 rounded flex-1 hover:bg-blue-600 transition"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default StepTwo