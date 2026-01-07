"use client";
import Header from "@/components/Header";
import { AnalyticsCard } from "@/components/patient-route/AnalyticsCard";
import GuageChart from "@/components/patient-route/Guage";
import UpcomingAppointment from "@/components/patient-route/UpcomingAppointment";
import { Button } from "@mui/material";
import { ArrowUpCircle } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="bg-background h-screen px-4 py-4 flex flex-col gap-4">
      <Header />
      <div className="grid grid-cols-[1fr_2fr] gap-4 ">
        <div className="flex flex-col gap-3 p-5 bg-card rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <p className="">
              Overall <br />
              Performance
            </p>
            <span className="flex gap-2">
              <ArrowUpCircle />
              90%
            </span>
          </div>
          <GuageChart />
          <p className="text-center text-gray-500">
            Note: You are healthier than average
          </p>
          <Button
            variant="contained"
            className="bg-blue-500 w-full !mt-6 !p-5 !rounded-2xl hover:bg-blue-600"
          >
            View Detailed Report
          </Button>
        </div>
        <AnalyticsCard />
        <div className="col-span-2">
          <UpcomingAppointment />
        </div>
      </div>
    </div>
  );
};

export default page;
