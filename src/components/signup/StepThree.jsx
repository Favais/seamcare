import React from 'react'

const StepThree = ({ register, prevStep, nextStep, role, errors, trigger }) => {
    const handleSubmit = async () => {
        const fields = role === 'doctor'
            ? ["specialization", "licenseNumber"]
            : ["emergencyContact", "medicalHistory"];

        const valid = await trigger(fields);
        if (valid) nextStep();
    };

    return (
        <div className='flex flex-col gap-4'>
            {role === 'doctor' ? (
                <>
                    <div>
                        <label htmlFor="specialization" className="block mb-1 text-sm font-medium">
                            Specialization
                        </label>
                        <input
                            id="specialization"
                            type="text"
                            {...register("specialization", {
                                required: "Specialization is required",
                                minLength: { value: 3, message: "Specialization must be at least 3 characters" }
                            })}
                            placeholder="e.g., Cardiology, Pediatrics"
                            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.specialization ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="licenseNumber" className="block mb-1 text-sm font-medium">
                            License Number
                        </label>
                        <input
                            id="licenseNumber"
                            type="text"
                            {...register("licenseNumber", {
                                required: "License number is required",
                                minLength: { value: 5, message: "License number must be at least 5 characters" }
                            })}
                            placeholder="Enter your license number"
                            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.licenseNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>}
                    </div>
                </>
            ) : (
                <>
                    {/* Blood Group */}
                    <div>
                        <label htmlFor="bloodGroup" className="block mb-1 text-sm font-medium">
                            Blood Group
                        </label>
                        <select
                            id="bloodGroup"
                            {...register("bloodGroup")}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className=' flex gap-4'>
                        {/* Insurance Provider */}
                        <div>
                            <label htmlFor="insuranceProvider" className="block mb-1 text-sm font-medium">
                                Insurance Provider
                            </label>
                            <input
                                id="insuranceProvider"
                                type="text"
                                {...register("insurance.provider")}
                                placeholder="Enter insurance provider"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Policy Number */}
                        <div>
                            <label htmlFor="policyNumber" className="block mb-1 text-sm font-medium">
                                Policy Number
                            </label>
                            <input
                                id="policyNumber"
                                type="text"
                                {...register("insurance.policyNumber")}
                                placeholder="Enter policy number"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="emergencyContact" className="block mb-1 text-sm font-medium">
                            Emergency Contact
                        </label>
                        <input
                            id="emergencyContact"
                            type="tel"
                            {...register("emergencyContact", {
                                required: "Emergency contact is required",
                                pattern: {
                                    value: /^[\d\s\-\+\(\)]{10,}$/,
                                    message: "Please enter a valid phone number"
                                }
                            })}
                            placeholder="Enter emergency contact number"
                            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.emergencyContact ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="medicalHistory" className="block mb-1 text-sm font-medium">
                            Medical History
                        </label>
                        <textarea
                            id="medicalHistory"
                            {...register("medicalHistory", {
                                minLength: { value: 10, message: "Please provide at least 10 characters" }
                            })}
                            placeholder="Describe any relevant medical conditions or allergies"
                            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.medicalHistory ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            rows="4"
                        />
                        {errors.medicalHistory && <p className="text-red-500 text-sm mt-1">{errors.medicalHistory.message}</p>}
                    </div>
                </>
            )}

            <div className='flex gap-3'>
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-4 py-2 rounded flex-1 hover:bg-gray-600 transition"
                >
                    Go Back
                </button>
                <button
                    type="submit"
                    // onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded flex-1 hover:bg-green-600 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default StepThree