"use client";
import { ShieldAlert } from "lucide-react";
// import Link from 'next/link';
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-card shadow-xl rounded-2xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Access Denied</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
          <br />
          If you believe this is a mistake, please contact support.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.back()}
            className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Go Back
          </button>

          {/* <Link
                        href="/login"
                        className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Go to Login
                    </Link> */}
        </div>
      </div>
    </main>
  );
};

export default page;
