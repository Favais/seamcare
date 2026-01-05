"use client";
import { DocumentTable } from "@/components/documents/Documents";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadDoc from "@/components/UploadDoc";
import { Bell, Search, Settings } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="py-3 sm:py-3 px-2 sm:px-4 flex flex-col min-h-screen">
      {/* <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 rounded-lg mb-3 sm:mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Patient Documents
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Manage patient files and medical records
            </p>
          </div>

          <div className="flex-1 min-w-0 md:max-w-xs lg:max-w-md mx-0 md:mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 bg-gray-50 border-gray-200 focus:bg-white text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 sm:h-9 sm:w-9 p-0"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 sm:h-9 sm:w-9 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-3 pl-2 sm:pl-3 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-gray-900 text-xs sm:text-sm font-medium">
                  Dr. Sarah Wilson
                </p>
                <p className="text-gray-500 text-xs">Internal Medicine</p>
              </div>
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1758127211809-68494a643d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTk2ODMwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Dr. Sarah Wilson"
                />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header> */}
      <Header
        isSearch={true}
        title="Documents"
        subtitle="Manage patient documents and records"
      />
      {/* <div className="mb-3 sm:mb-4">
        <UploadDoc />
      </div> */}
      <div className="flex-1 min-h-0 overflow-auto">
        <DocumentTable />
      </div>
    </div>
  );
};

export default page;
