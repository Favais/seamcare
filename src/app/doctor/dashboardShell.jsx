"use client";

import Sidebar from "@/components/sidebar";
import { useSidebar } from "@/context/sidebarContext";

export default function DashboardShell({ children }) {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-full">
      <Sidebar />
      <main
        className={`bg-background flex-1 h-full overflow-auto lg:rounded-2xl
          transition-all duration-300
          ${isOpen ? "ml-32 md:ml-40 lg:ml-50" : "ml-12 md:ml-16 lg:ml-20"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
