"use client"
import React, { useEffect, useState } from 'react'
import { upcomingSchedule, timeSlots, hours } from '../../assets/data'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Paper, Typography, Accordion, AccordionDetails, AccordionSummary, Stack, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { MdDelete } from "react-icons/md";



const UpcomingSchedule = () => {
    const [schedule, setSchedule] = useState(upcomingSchedule)

    const scheduleMap = schedule.reduce((acc, a) => {
        const [hour] = a.startTime.split(':').map(Number);
        const key = `${String(hour).padStart(2, '0')}:00`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(a);
        return acc;
    }, {});




    return (
        <div className='py-5 px-4 bg-white rounded-2xl overflow-y-auto'>
            <div className='flex justify-between '>
                <p className='text-lg font-semibold text-neutral-600'>Upcoming Schedule</p>
                <p className='text-sm text-blue-500'>View All</p>
            </div>
            <div className=''>
                {
                    Object.entries(scheduleMap).map(([key, value]) => {
                        // const event = scheduleMap[hour]

                        return (
                            <Timeline key={key} sx={{ px: 0 }} position='right'>
                                <TimelineItem sx={{}}>
                                    <TimelineOppositeContent sx={{ flex: 0.2, pl: 0, }}>
                                        <Typography sx={{ textAlign: 'start' }} variant='body2' color='text.secondary'>
                                            {key}
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color='grey' />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ pr: 0 }}>
                                        {
                                            value.map((evt, idx) => (
                                                <div key={idx} className='flex flex-col mb-1'>
                                                    <Accordion elevation={1} disableGutters sx={{ borderRadius: 2 }}>
                                                        <AccordionSummary expandIcon={<IoIosArrowDown />}>
                                                            <Typography variant="subtitle1" fontWeight="" className={`${evt.status === 'confirmed' ? 'line-through text-neutral-500' : evt.status === 'cancelled' ? 'text-red-500 line-through' : ''}`}>
                                                                <GoDotFill className='inline-flex' />  {evt.startTime}   {evt.title}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography variant="body2" color="text.secondary" component='div'>
                                                                <div className='flex gap-4'>
                                                                    <p className='font-semibold'>Patient</p>
                                                                    <p>{evt.patient}</p>
                                                                </div>
                                                            </Typography>
                                                            <Typography variant="body2" py={2} component='div'>
                                                                <div className='flex gap-4'>
                                                                    <p className='font-semibold'>Time</p>
                                                                    <p>{evt.startTime} - {evt.endTime}</p>
                                                                </div>
                                                            </Typography>
                                                            <Typography component='div'>
                                                                <div className='flex gap-4'>
                                                                    <p className='font-semibold'>Purpose</p>
                                                                    <p>{evt.type}</p>
                                                                </div>
                                                            </Typography>
                                                            <Divider className='pt-3' />
                                                            <div className='flex justify-between items-center pt-2'>
                                                                <IconButton size='small'>
                                                                    <MdDelete color='red' />
                                                                </IconButton>
                                                                <button className='text-blue-500 p-1.5 bg-blue-50 rounded text-sm'>Begin appointment</button>
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                            ))
                                        }
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UpcomingSchedule