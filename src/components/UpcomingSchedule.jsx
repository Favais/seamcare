"use client";
import React, { useEffect, useState } from "react";
import { upcomingSchedule, timeSlots, hours } from "../../assets/data";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {
  Paper,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { MdDelete } from "react-icons/md";

const UpcomingSchedule = () => {
  const [schedule, setSchedule] = useState(upcomingSchedule);

  const scheduleMap = schedule.reduce((acc, a) => {
    const [hour] = a.startTime.split(":").map(Number);
    const key = `${String(hour).padStart(2, "0")}:00`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full bg-white rounded-lg sm:rounded-2xl px-3 sm:px-4 py-4 sm:py-5 overflow-hidden">
      <div className="shrink-0 flex justify-between gap-2">
        <p className="text-base sm:text-lg font-semibold text-neutral-600">
          Upcoming Schedule
        </p>
        <p className="text-xs sm:text-sm text-blue-500 w-fit">View All</p>
      </div>
      <div className="h-full overflow-y-auto mt-3">
        {Object.entries(scheduleMap).map(([key, value]) => {
          // const event = scheduleMap[hour]

          return (
            <Timeline
              key={key}
              sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}
              position="right"
            >
              <TimelineItem sx={{}}>
                <TimelineOppositeContent
                  sx={{
                    flex: { xs: 0.15, sm: 0.2 },
                    pl: 0,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  }}
                >
                  <Typography
                    sx={{ textAlign: "start" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {key}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    color="grey"
                    sx={{
                      width: { xs: 12, sm: "auto" },
                      height: { xs: 12, sm: "auto" },
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ pr: 0, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {value.map((evt, idx) => (
                    <div key={idx} className="flex flex-col mb-1">
                      <Accordion
                        elevation={1}
                        disableGutters
                        sx={{
                          borderRadius: 1,
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<IoIosArrowDown />}
                          sx={{ padding: { xs: "8px", sm: "12px" } }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight=""
                            className={`text-xs sm:text-base ${evt.status === "confirmed" ? "line-through text-neutral-500" : evt.status === "cancelled" ? "text-red-500 line-through" : ""}`}
                          >
                            <GoDotFill className="inline-flex text-xs sm:text-sm" />{" "}
                            <span className="text-xs sm:text-sm">
                              {evt.startTime}
                            </span>{" "}
                            <span className="text-xs sm:text-sm">
                              {evt.title}
                            </span>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            padding: { xs: "8px", sm: "12px" },
                            fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="div"
                          >
                            <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
                              <p className="font-semibold whitespace-nowrap">
                                Patient
                              </p>
                              <p>{evt.patient}</p>
                            </div>
                          </Typography>
                          <Typography variant="body2" py={1} component="div">
                            <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
                              <p className="font-semibold whitespace-nowrap">
                                Time
                              </p>
                              <p>
                                {evt.startTime} - {evt.endTime}
                              </p>
                            </div>
                          </Typography>
                          <Typography component="div">
                            <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
                              <p className="font-semibold whitespace-nowrap">
                                Purpose
                              </p>
                              <p>{evt.type}</p>
                            </div>
                          </Typography>
                          <Divider className="py-1 sm:pt-3" />
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-1 sm:pt-2 gap-2 sm:gap-0">
                            <IconButton size="small" sx={{ padding: "4px" }}>
                              <MdDelete
                                color="red"
                                className="text-xs sm:text-sm"
                              />
                            </IconButton>
                            <button className="text-blue-500 p-1 sm:p-1.5 bg-blue-50 rounded text-xs sm:text-sm hover:bg-blue-100 transition">
                              Begin appointment
                            </button>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingSchedule;
