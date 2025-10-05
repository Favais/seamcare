"use client"
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { columns, data } from './data';

const Appointments = ({ globalFilter, setGlobalFilter }) => {
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const table = useReactTable({
        data,
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
        <div className='flex flex-col gap-3 bg-white rounded-2xl p-3 h-fit'>
            <div>
                <p className='p-1 text-2xl font-medium'>Appointments</p>
            </div>
            <div className=" text-gray-700">
                <Table className={'border-none'}>
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
                    <TableBody className='border-none'>
                        {
                            table.getRowModel().rows.map((rows) => (
                                <TableRow className={''} key={rows.id}>
                                    {
                                        rows.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className={'p-4'}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between px-2 py-3">
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