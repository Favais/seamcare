"use client";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AppWrapper } from "@/context/AppContext";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "700"] });

// export const metadata = {
//   title: "Seam Care",
//   description: "Book appoinment and manage patients",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <SessionProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
