"use client";
import Appointments from "@/components/appointment/Appointments";
import Header from "@/components/Header";
import React, { useState } from "react";

const page = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className="py-3 sm:py-3 px-2 sm:px-4 flex flex-col gap-6 sm:gap-8 min-h-screen">
      <div className="pt-2 sm:pt-3">
        <Header value={globalFilter} setValue={setGlobalFilter} />
      </div>
      <div className="flex-1 min-h-0">
        <Appointments
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </div>
  );
};

export default page;
