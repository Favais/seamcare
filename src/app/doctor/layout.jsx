import "../globals.css";
import { SidebarProvider } from "@/context/sidebarContext";
import DashboardShell from "./dashboardShell";

export const metadata = {
  title: "Dashboard",
  description: "",
};

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
