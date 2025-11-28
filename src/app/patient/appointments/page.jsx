"use client";
import AppointmentTable from "@/components/patient-route/Appointment/AppointmentTable";
import BookAppointment from "@/components/patient-route/Appointment/BookAppointment";
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { X } from "lucide-react";
import { useState } from "react";

const Page = () => {
    const [openThis, setOpenThis] = useState(false);


    const handleClickOpen = () => {
        console.log("Opening dialog");
        setOpenThis(true);
    };

    const handleClose = () => {
        console.log("Closing dialog");
        setOpenThis(false);
    };


    return (
        <div className="p-4 w-full">
            <button
                onClick={handleClickOpen}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                Book Appointment
            </button>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={openThis}
                onClose={handleClose}
            >
                <DialogTitle sx={{ fontSize: "2rem", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Book Appointment</span>
                    <X className="pointer" onClick={handleClose} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can set my maximum width and whether to adapt or not.
                    </DialogContentText>
                    <Box
                    >
                        <BookAppointment />
                    </Box>
                </DialogContent>
            </Dialog>
            <AppointmentTable />

        </div>
    );
};

export default Page;