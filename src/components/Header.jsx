"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdMessage } from "react-icons/md";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search, Settings } from "lucide-react";

const Header = ({ value, setValue, isSearch, title, subtitle }) => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col sm:px-3 py-2 sm:flex-row justify-between h-fit gap-4 sm:gap-0 items-center bg-white rounded-lg mb-3 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center w-full sm:w-auto">
        <div className="p-2">
          <h1 className="font-semibold text-lg text-gray-900">
            {title
              ? title
              : `Good ${
                  new Date().getHours() < 12
                    ? "morning"
                    : new Date().getHours() < 18
                      ? "afternoon"
                      : "evening"
                }, Dr.${session?.user.lastName}`}
          </h1>
          <p className="text-gray-500 text-sm">
            {subtitle
              ? subtitle
              : "Hope you have a great day ahead!, You have 5 appointments today"}
          </p>
        </div>
        {/* <p className="p-2 sm:p-3 bg-blue-500/15 rounded-lg text-xs sm:text-sm whitespace-nowrap">
          Welcome back{" "}
          <span className="font-bold text-blue-500">
            {session?.user.role === "doctor" ? "Dr" : ""}{" "}
            {session?.user.lastName}
          </span>
        </p> */}
      </div>
      <div className="flex gap-2 sm:gap-4">
        {isSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={"bg-white pl-8 w-full sm:w-64 text-sm sm:text-base"}
              type="search"
              placeholder="Search"
            />
          </div>
        )}
        <Button variant="secondary" size="icon" className="bg-white">
          <Bell className=" text-base sm:text-lg" />
        </Button>
        <Button variant="secondary" size="icon" className="bg-white">
          <Settings className="text-base sm:text-lg" />
        </Button>
        <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-3 pl-2 sm:pl-3 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-gray-900 text-xs sm:text-sm font-medium">
              Dr. {session?.user.firstName} {session?.user.lastName}
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
  );
};

export default Header;
