import React from "react";
import Header from "@/components/Header";
import UpcomingSchedule from "@/components/UpcomingSchedule";
import Summary from "@/components/Summary";
import Appointment from "@/components/Appointment";

const page = async () => {
  return (
    <div className="h-full sm:px-4 sm:py-4 flex flex-col">
      <Header />
      <div className="h-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 sm:gap-4">
        <div className="flex flex-col h-full gap-2 sm:gap-3">
          <Summary />
          <Appointment />
        </div>
        <UpcomingSchedule />
      </div>
    </div>
  );
};

export default page;
