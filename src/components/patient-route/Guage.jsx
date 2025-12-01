"use client"
import { Gauge } from '@mui/x-charts'
import React from 'react'

const GuageChart = () => {
    const value = 75;

    return (
        <div className='relative w-full h-64 sm:h-80'>
            <Gauge
                value={value}
                startAngle={-100}
                endAngle={100}
                sx={{
                    "& .MuiGauge-valueText": {
                        fontSize: { xs: 16, sm: 20 },
                        transform: 'translate(0px, 0px)',
                    },
                    "& .MuiGauge-referenceArc": {
                        borderRadius: '50px',
                        fill: '#E0E0E0',
                        strokeLinecap: 'round',
                    },
                    "& .MuiGauge-valueArc": {
                        borderRadius: '50px',
                        fill: '#3B82F6',
                        strokeLinecap: 'round',
                    },
                }}
                text={() => ('')}
            />
            {/* Custom centered text overlay */}
            <div className="absolute inset-8 sm:inset-10 lg:inset-15 text-center flex flex-col justify-center items-center">
                <p className="text-xs sm:text-sm text-gray-500">Average Health Score</p>
                <p className="text-xl sm:text-2xl font-semibold text-blue-600">{value}</p>
            </div>

        </div>
    )
}

export default GuageChart