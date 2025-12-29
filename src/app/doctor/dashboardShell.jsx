'use client';

import Sidebar from "@/components/sidebar";
import { useSidebar } from "@/context/sidebarContext";

export default function DashboardShell({ children }) {
    const { isOpen } = useSidebar();

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main
                className={`bg-neutral-100 flex-1 min-h-screen overflow-auto lg:rounded-2xl
          transition-all duration-300
          ${isOpen ? 'ml-32 md:ml-40 lg:ml-50' : 'ml-12 md:ml-16 lg:ml-20'}
        `}
            >
                {children}
            </main>
        </div>
    );
}
