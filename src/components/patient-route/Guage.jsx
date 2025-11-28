"use client"
import { Gauge } from '@mui/x-charts'
import React from 'react'

const GuageChart = () => {
    const value = 75;

    return (
        <div className='relative'>
            <Gauge
                value={value}
                startAngle={-100}
                endAngle={100}
                // height={200}
                // innerRadius={100}
                sx={{
                    "& .MuiGauge-valueText": {
                        fontSize: 20,
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
            <div className="absolute inset-10 sm:inset-15 text-center">
                <p className="text-sm text-gray-500">Average Health Score</p>
                <p className="text-2xl font-semibold text-blue-600">{value}</p>
            </div>

        </div>
    )
}

export default GuageChart