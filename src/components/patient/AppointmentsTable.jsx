"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { BsCalendar } from "react-icons/bs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Badge } from "@/components/ui/badge";
import { Button } from '../ui/button';



const AppointmentsTable = ({ appointments, title, pages }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pages,
    });

    // columns.js
    const columns = [
        {
            accessorKey: "appointmentId",
            header: "Appointment ID",
        },
        {
            accessorKey: "doctor",
            header: "Doctor",
        },
        {
            accessorKey: "department",
            header: "Department",
        },
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            accessorKey: "time",
            header: "Time",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status");

                const statusColorMap = {
                    Upcoming: "bg-blue-100 text-blue-800",
                    Completed: "bg-green-100 text-green-800",
                    Cancelled: "bg-red-100 text-red-800",
                };

                return (
                    <Badge className={statusColorMap[status] || "bg-gray-100 text-gray-800"}>
                        {status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "reason",
            header: "Reason",
        },
    ];

    const table = useReactTable({
        data: appointments,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination
        },
        onPaginationChange: setPagination

    })
    return (
        <div>
            <Card className={'py-4 gap-2'}>
                <CardHeader>
                    <CardTitle className='flex gap-2 items-center'>
                        <BsCalendar />
                        <span className='text-sm'>{title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableHeader>
                        <TableBody>
                            {
                                table.getRowModel().rows.map(rows =>
                                    <TableRow key={rows.id}>
                                        {
                                            rows.getVisibleCells().map(cell =>
                                                <TableCell key={cell.id}>
                                                    {
                                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                                    }
                                                </TableCell>
                                            )}
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                    <div className=" flex justify-end space-x-2 py-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}

export default AppointmentsTable