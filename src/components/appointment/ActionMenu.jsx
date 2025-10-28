import { useState } from "react"
import { Button } from "../ui/button"
import { MoreVertical } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


export const ActionMenu = ({ row }) => {
    const [open, setOpen] = useState(false)

    const handleMarkCompleted = () => {
        console.log(`✅ Marked appointment ${row._id || row.id} as completed`)
        // 👉 call backend or update context here
        setOpen(false)
    }

    const handleCancel = () => {
        console.log(`❌ Cancelled appointment ${row._id || row.id}`)
        // 👉 call backend or update context here
        setOpen(false)
    }

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setOpen(true)}
                className="hover:bg-gray-100"
            >
                <MoreVertical className="h-4 w-4 text-gray-600" />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Manage Appointment</DialogTitle>
                    </DialogHeader>

                    <div className="py-3 space-y-2 text-sm">
                        <p>
                            Appointment for <strong>{row.patientName}</strong> with{" "}
                            <strong>{row.doctorName}</strong>
                        </p>
                        <p>Date: {row.date}</p>
                        <p>Time: {row.time}</p>
                        <p>Current status: {row.status}</p>
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="destructive" onClick={handleCancel}>
                            Cancel Appointment
                        </Button>
                        <Button onClick={handleMarkCompleted}>Mark as Completed</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
