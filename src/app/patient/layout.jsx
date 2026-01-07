import Sidebar from "@/components/patient-route/Sidebar";
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="bg-background flex-1 h-screen overflow-auto rounded-2xl">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
