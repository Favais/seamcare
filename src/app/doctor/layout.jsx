
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "../../../components/sidebar";
import { Toaster } from "sonner";



export const metadata = {
    title: "Dashboard",
    description: "",
};

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="bg-neutral-100 flex-1 h-screen overflow-auto rounded-2xl">
                {children}
            </main>
            <Toaster position="top-center" />
        </div>
    );
}
