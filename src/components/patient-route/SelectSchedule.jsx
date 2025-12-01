import { useAppContext } from '@/context/AppContext';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import axios from 'axios';

const SelectSchedule = ({ doctor, currentDate, setCurrentDate, selectedTime, setSelectedTime }) => {
    const { formatDate } = useAppContext()
    const [timeSlots, setTimeSlots] = useState()

    const getWeekDates = () => {
        const dates = [];
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 3); // 3 days before

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    };
    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        return d < today;  // true if the date already passed
    };

    const weekDates = getWeekDates();
    const getDayName = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };
    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };


    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + (direction * 7));
        setCurrentDate(newDate);
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const handleDateSelect = (date) => {
        setCurrentDate(date);
        // setSelectedTime(generateTimeSlots(date)[0]); // Auto-select first available slot
    };


    useEffect(() => {
        if (!doctor) return;

        const fetchDailyTimeSlots = async (doctorId, date) => {
            try {
                const res = await axios.post(`/api/${doctorId}/slots`, { date })
                setTimeSlots(res.data)
                return res.data
            } catch (error) {
                console.log(error);
            }
        }
        fetchDailyTimeSlots(doctor.userId, currentDate)
    }, [doctor, currentDate])
    return (
        <div className="w-full mx-auto p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-amber-100 rounded-2xl sm:rounded-3xl shadow-lg">
            {/* Header with Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-8">
                <h2 className="text-lg sm:text-2xl text-gray-400 font-light">Choose date and time</h2>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        type='button'
                        onClick={() => navigateMonth(-1)}
                        className="p-1 sm:p-2 hover:bg-white/60 rounded-lg transition-all"
                    >
                        <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-700 min-w-fit justify-center text-xs sm:text-base">
                        <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
                        <span className="font-medium">
                            {currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                    <button
                        type='button'
                        onClick={() => navigateMonth(1)}
                        className="p-1 sm:p-2 hover:bg-white/60 rounded-lg transition-all"
                    >
                        <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Week Navigation */}
            <div className="flex items-center gap-1 sm:gap-3 mb-4 sm:mb-8 overflow-x-auto">
                <button
                    type='button'
                    onClick={() => navigateWeek(-1)}
                    className="p-1 sm:p-2 hover:bg-white/60 rounded-lg transition-all flex-shrink-0"
                >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                {/* Date Selection */}
                <div className="grid grid-cols-7 gap-1 sm:gap-3 flex-1">
                    {weekDates.map((date, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => !isPastDate(date) && handleDateSelect(date)}
                            disabled={isPastDate(date)}
                            className={`flex flex-col items-center justify-center py-1 sm:py-2 px-0.5 sm:px-2 rounded-lg sm:rounded-2xl transition-all text-xs sm:text-base
        ${isPastDate(date)
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                                    : isSameDay(currentDate, date)
                                        ? "bg-blue-500 text-white shadow-lg scale-105"
                                        : "bg-white/60 text-gray-700 hover:bg-white hover:shadow-md"
                                }`}
                        >
                            <span className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">{getDayName(date)}</span>
                            <span className="text-sm sm:text-lg font-bold">{date.getDate()}</span>
                        </button>

                    ))}
                </div>

                <button
                    type='button'
                    onClick={() => navigateWeek(1)}
                    className="p-1 sm:p-2 hover:bg-white/60 rounded-lg transition-all flex-shrink-0"
                >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-8">
                {timeSlots?.map((time) => (
                    <button
                        type='button'
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-1 sm:py-2 px-2 sm:px-4 rounded-lg sm:rounded-2xl flex items-center justify-center text-xs sm:text-md font-medium transition-all ${selectedTime === time
                            ? 'bg-blue-100 text-blue-600 border-2 border-blue-300 shadow-md'
                            : 'bg-white/60 text-gray-700 hover:bg-white hover:shadow-md'
                            }`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SelectSchedule