"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import React from 'react'
// import multiMonthPlugin from '@fullcalendar/multimonth'
import timeGridPlugin from '@fullcalendar/timegrid'
import './css/customCalenderStyle.css'



const page = () => {

    const docColor = (role) => {
        switch (role) {
            case 'radiologist':
                return '#DA9100'
                break

        }


    }
    return (
        <div className='p-3 h-full'>
            <FullCalendar
                height='100%'
                contentHeight="100%"
                dayMaxEventRows={2} // Show max 2 rows of events per day
                fixedWeekCount={true} // forces all months to have 6 rows
                plugins={[dayGridPlugin, timeGridPlugin]}
                // weekends={false}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,timeGridWeek,dayGridMonth'
                }}
                editable={true}
                selectable={true}
                events={[
                    {
                        title: 'Medical Assesment',
                        date: '2025-10-07T09:30:00',
                        dotColor: docColor('radiologist')
                    },
                    {
                        title: 'Team Meetings',
                        start: '2025-10-25T11:00:00',
                        end: '2025-07-25T13:30:00'
                    },
                    {
                        title: 'MRI Scan',
                        start: '2025-10-25T10:00:00',
                        end: '2025-07-25T11:30:00'
                    },
                    {
                        title: 'Check Up',
                        start: '2025-10-20T12:00:00',
                        end: '2025-07-20T13:30:00',

                    },
                    {
                        title: 'Check Up',
                        start: '2025-07-20T12:30:00',
                        end: '2025-07-20T14:00:00',

                    },
                    {
                        title: 'Check Up',
                        start: '2025-07-20T14:30:00',
                        end: '2025-07-20T15:00:00',

                    }
                ]}
                eventDidMount={(info) => {
                    const dotEl = info.el.querySelector('.fc-daygrid-event-dot');
                    if (dotEl && info.event.extendedProps.dotColor) {
                        dotEl.style.borderColor = info.event.extendedProps.dotColor;
                    }
                }}
            />
        </div>
    )
}

export default page