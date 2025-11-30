"use client";
import { Inter, Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AppWrapper } from "@/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
const montserrat = Montserrat({
  subsets: ["latin"], display: "swap",
});

// export const metadata = {
//   title: "Seam Care",
//   description: "Book appoinment and manage patients",
// };
const queryClient = new QueryClient();


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <AppWrapper>
              {children}
              <Toaster richColors position="top-right" />
            </AppWrapper>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
