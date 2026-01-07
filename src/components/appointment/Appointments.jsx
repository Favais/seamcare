"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns, data } from "./data";
import { useAppContext } from "@/context/AppContext";
import { useDoctorAppointments } from "@/hooks/useDoctorAppointments";
import { useSession } from "next-auth/react";

const Appointments = ({ globalFilter, setGlobalFilter }) => {
  const { session } = useAppContext();
  const doctorId = session?.user?.id;
  const {
    data: appointments,
    isLoading,
    error,
  } = useDoctorAppointments(doctorId);
  // console.log(appointments, isLoading, error);

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data: appointments || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      pagination,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  return (
    <div className="flex flex-col gap-2 sm:gap-3 bg-card rounded-lg sm:rounded-2xl p-2 sm:p-3 h-full overflow-x-auto">
      <div>
        <p className="p-1 text-lg sm:text-2xl font-medium">Appointments</p>
      </div>
      <div className="text-gray-700 flex-1 flex flex-col text-xs sm:text-sm">
        <Table className={"border-none flex-1"}>
          <TableHeader className={""}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={""}>
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
          <TableBody className="flex-1">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 sm:p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 sm:py-10 text-gray-400 text-xs sm:text-sm"
                >
                  No appointments available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-2 py-2 sm:py-3 mt-auto text-xs sm:text-sm">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50 hover:bg-gray-50 transition w-full sm:w-auto"
          >
            Previous
          </button>

          <span className="text-xs sm:text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50 hover:bg-gray-50 transition w-full sm:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
