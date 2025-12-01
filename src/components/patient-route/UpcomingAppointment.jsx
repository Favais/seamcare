"use client"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { ActionMenu } from '../appointment/ActionMenu'

const UpcomingAppointment = () => {
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const columns = [
        {
            accessorKey: "visitorId",
            header: ({ column }) => (
                <button className='flex gap-1 sm:gap-2 p-2 sm:p-3 items-center text-xs sm:text-sm' onClick={() => column.toggleSorting()}>
                    Visit No
                    {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
                </button>
            ),
        },
        {
            accessorKey: "patientId",
            header: ({ column }) => (
                <button className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm' onClick={() => column.toggleSorting()}>
                    Patient Number
                    {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
                </button>
            ),
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <button className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm' onClick={() => column.toggleSorting()}>
                    Date of visit
                    {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
                </button>
            ),
        },
        {
            accessorKey: "time",
            header: ({ column }) => (
                <button className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm' onClick={() => column.toggleSorting()}>
                    Time of visit
                    {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
                </button>
            ),
        },
        {
            accessorKey: "reason",
            header: ({ column }) => (
                <button className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm' onClick={() => column.toggleSorting()}>
                    Reason
                    {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
                </button>
            ),
        },
        {
            header: 'Action',
            id: "actions",
            cell: ({ row }) => <ActionMenu row={row.original} />,
        },

    ];

    const visitData = [
        {
            visitorId: "VST-001",
            patientId: "PT-1001",
            date: "2025-11-10",
            time: "09:15 AM",
            reason: "Routine Checkup",
        },
        {
            visitorId: "VST-002",
            patientId: "PT-1002",
            date: "2025-11-10",
            time: "10:30 AM",
            reason: "Fever and Headache",
        },
        {
            visitorId: "VST-003",
            patientId: "PT-1003",
            date: "2025-11-11",
            time: "11:45 AM",
            reason: "Follow-up Consultation",
        },
        {
            visitorId: "VST-004",
            patientId: "PT-1004",
            date: "2025-11-11",
            time: "02:00 PM",
            reason: "Blood Test",
        },
        {
            visitorId: "VST-005",
            patientId: "PT-1005",
            date: "2025-11-12",
            time: "04:20 PM",
            reason: "Chest Pain",
        },
    ];

    const table = useReactTable({
        data: visitData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            // globalFilter,
            pagination,
            sorting,
        },
        // onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination
    })
    return (
        <div className='bg-white p-3 sm:p-5 rounded-lg sm:rounded-2xl w-full'>
            <header>
                <p className='text-base sm:text-lg font-semibold'>Upcoming Appointments</p>
            </header>
            <div className='flex flex-col gap-2 sm:gap-3 bg-white rounded-lg sm:rounded-2xl p-2 sm:p-3 h-fit overflow-x-auto'>
                <div className="text-gray-700 text-xs sm:text-sm">
                    <Table className={'border-none'}>
                        <TableHeader className={''}>
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className={''}>
                                        {
                                            headerGroup.headers.map((header) => (
                                                <TableHead key={header.id} className='p-1 sm:p-2 md:p-3'>
                                                    {
                                                        flexRender(header.column.columnDef.header, header.getContext())

                                                    }
                                                </TableHead>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableHeader>
                        <TableBody className='border-none'>
                            {
                                table.getRowModel().rows.map((rows) => (
                                    <TableRow className={''} key={rows.id}>
                                        {
                                            rows.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className='p-1 sm:p-2 md:p-4 text-xs sm:text-sm'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-2 py-2 sm:py-3">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50 hover:bg-gray-50 transition"
                        >
                            Previous
                        </button>

                        <span className="text-xs sm:text-sm">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>

                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50 hover:bg-gray-50 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingAppointment