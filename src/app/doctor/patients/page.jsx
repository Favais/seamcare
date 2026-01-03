import Header from "@/components/Header";
import Patients from "@/components/patient/Patients";
import React from "react";

const page = () => {
  return (
    <div className="py-2 sm:py-3 px-2 sm:px-4 flex flex-col h-screen overflow-hidden">
      <Header />
      <Patients />
    </div>
  );
};

export default page;
