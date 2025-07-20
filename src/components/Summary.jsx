import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AchievementCard from './AchievementCard'
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaBedPulse } from "react-icons/fa6";



const Summary = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className=''>
                <Select >
                    <SelectTrigger>
                        <SelectValue placeholder='Today' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='today'>Today</SelectItem>
                        <SelectItem value='thisweek'>This Week</SelectItem>
                        <SelectItem value='thisMonth'>This Month</SelectItem>
                        <SelectItem value='lastMonth'>Last Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex gap-2'>
                <AchievementCard
                    cardTitle={'Appointments'}
                    cardScore={'24'}
                    cardPercentage={'5%'}
                    trend={'upTrend'}
                    bgImg={<FaBriefcaseMedical />}
                />
                <AchievementCard
                    cardTitle={'Hours'}
                    cardScore={'1hr'}
                    cardPercentage={'7.11%'}
                    trend={'upTrend'}
                    bgImg={<FaClock />}
                />
                <AchievementCard
                    cardTitle={'Surgery'}
                    cardScore={'02'}
                    cardPercentage={'20%'}
                    trend={'downTrend'}
                    bgImg={<FaBedPulse />}
                />
            </div>
        </div >
    )
}

export default Summary