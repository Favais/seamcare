"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { patientsData, columns as getColumns } from './data'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const PatientsTable = ({ handleViewPatient }) => {
    const [statusFilter, setStatusFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = getColumns({ onViewPatient: handleViewPatient });

    const table = useReactTable({
        data: patientsData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            // pagination,
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        // onPaginationChange: setPagination
    })
    return (
        <Card className='flex flex-col gap-2 bg-white rounded-2xl px-4 py-4'>
            <CardHeader>
                <CardTitle>
                    Patient Directory
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex gap-3'>
                    <div className='relative flex-1'>
                        <Search size={15} className='absolute left-3 top-3' />
                        <Input
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className={'pl-8'}
                            placeholder="Search patients by name, ID, or email..."
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Patients</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={sorting[0]?.id ?? ''} onValueChange={(columnId) => {
                        setSorting([{ id: columnId, desc: false }])
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="patient">Name</SelectItem>
                            <SelectItem value="lastVisit">Last Visit</SelectItem>
                            <SelectItem value="patientNo">Patient ID</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map(headerGroup =>
                                <TableRow key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(header =>
                                            <TableHead key={header.id}>
                                                {
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </TableHead>
                                        )
                                    }
                                </TableRow>
                            )}
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
            </CardContent>
        </Card >
    )
}

export default PatientsTable