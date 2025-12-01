
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/sidebar";



export const metadata = {
    title: "Dashboard",
    description: "",
};

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="bg-neutral-100 flex-1 min-h-screen lg:h-screen overflow-auto lg:rounded-2xl">
                {children}
            </main>
        </div>
    );
}
