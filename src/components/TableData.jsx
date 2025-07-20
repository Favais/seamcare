"use client"
import React from 'react'
import { Box, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, renderActionsCell } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';
import { Button } from "@/components/ui/button"


const TableData = () => {
    const columns = [
        { field: 'id', headerName: 'Visit No.', width: 90 },
        {
            field: 'patientName',
            headerName: 'Patient Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 150,
            editable: true,
        },
        {
            field: 'reason',
            headerName: 'Reason',
            width: 150,
            editable: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            type: 'actions',
            renderCell: (params) => (
                <div className='p-3'>
                    <button className='px-4 py-2 bg-neutral-100 rounded hover:bg-neutral-700 hover:text-white'>Consolt</button>
                </div>
            ),
            width: 110,
            // editable: true,
        },

    ];

    const rows = [
        { id: 10421, firstName: 'Emily', lastName: 'Johnson', age: 28, gender: 'Female', reason: 'General checkup' },
        { id: 97532, firstName: 'Michael', lastName: 'Smith', age: 42, gender: 'Male', reason: 'Follow-up visit' },
        { id: 65234, firstName: 'Olivia', lastName: 'Brown', age: 35, gender: 'Female', reason: 'Flu symptoms' },
        { id: 82390, firstName: 'James', lastName: 'Williams', age: 50, gender: 'Male', reason: 'Blood pressure check' },
        { id: 11475, firstName: 'Sophia', lastName: 'Jones', age: 23, gender: 'Female', reason: 'Allergy treatment' },
        { id: 40912, firstName: 'Daniel', lastName: 'Garcia', age: 37, gender: 'Male', reason: 'Skin irritation' },
        { id: 73561, firstName: 'Mia', lastName: 'Martinez', age: 31, gender: 'Female', reason: 'Routine exam' },
        { id: 58273, firstName: 'William', lastName: 'Rodriguez', age: 46, gender: 'Male', reason: 'Chest pain' },
        { id: 30192, firstName: 'Ava', lastName: 'Lopez', age: 19, gender: 'Female', reason: 'Physical therapy' },
        { id: 99814, firstName: 'Liam', lastName: 'Hernandez', age: 33, gender: 'Male', reason: 'Digestive issues' },
    ];

    return (
        <div>
            <Box sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    className="px-4 
                    [&_.MuiDataGrid-virtualScrollerContent]:!border-0"
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 7,
                            },
                        },
                    }}
                    // hideFooter={true}
                    pageSizeOptions={[5]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    // [&_.MuiDataGrid-cell]:!border-0 
                    // [&_.MuiDataGrid-columnHeaders]:!border-0"
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        '& .MuiDataGrid-cell': {
                            border: 'none',
                        },

                    }}
                />
            </Box>
        </div>
    )

}

export default TableData