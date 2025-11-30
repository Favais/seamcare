"use client"
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { columns, data } from './data';
import { useAppContext } from '@/context/AppContext';

const Appointments = ({ globalFilter, setGlobalFilter }) => {
    const { appointments } = useAppContext()
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const table = useReactTable({
        data: appointments,
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
        onPaginationChange: setPagination
    })


    return (
        <div className='flex flex-col gap-3 bg-white rounded-2xl p-3 h-full'>
            <div>
                <p className='p-1 text-2xl font-medium'>Appointments</p>
            </div>
            <div className=" text-gray-700 flex-1 flex flex-col">
                <Table className={'border-none flex-1'}>
                    <TableHeader className={''}>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className={''}>
                                    {
                                        headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className={''}>
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
                    <TableBody className="flex-1">
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="p-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-10 text-gray-400">
                                    No appointments available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between px-2 py-3 mt-auto">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-sm">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Appointments