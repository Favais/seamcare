"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { patientsData, columns as getColumns } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAppContext } from "@/context/AppContext";
import { Button } from "../ui/button";
import { FaPlusSquare } from "react-icons/fa";

const PatientsTable = ({ handleViewPatient, patients }) => {
  const [statusFilter, setStatusFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = getColumns({ onViewPatient: handleViewPatient });

  const table = useReactTable({
    data: patients || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      // pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    // onPaginationChange: setPagination
  });
  return (
    <Card className="flex flex-col bg-white rounded-lg sm:rounded-2xl min-h-0 h-full">
      <CardHeader className="px-3 sm:px-4 pb-0 border-b-0">
        <CardTitle className="flex justify-between text-base sm:text-lg">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">
              {" "}
              Patient Directory
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">
              Manage and view all patient records
            </p>
          </div>
          <Button className="text-xs sm:text-sm w-full sm:w-auto">
            <FaPlusSquare />
            Add New Patient
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full min-h-0">
        <div className="shrink-0 flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-3" />
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className={"pl-8 text-xs sm:text-sm"}
              placeholder="Search patients..."
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px] text-xs sm:text-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sorting[0]?.id ?? ""}
            onValueChange={(columnId) => {
              setSorting([{ id: columnId, desc: false }]);
            }}
          >
            <SelectTrigger className="w-full sm:w-[140px] text-xs sm:text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Name</SelectItem>
              <SelectItem value="lastVisit">Last Visit</SelectItem>
              <SelectItem value="patientNo">Patient ID</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-y-auto overflow-x-auto">
          <Table className="text-xs sm:text-sm">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="p-2 sm:p-3">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((rows) => (
                <TableRow key={rows.id}>
                  {rows.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 sm:p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientsTable;
