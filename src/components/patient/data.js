import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Button } from "../ui/button";
import { BsCalendar, BsEye } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

export const columns = ({ onViewPatient }) => [
    {
        id: 'patient',
        accessorFn: row => `${row.userInfo.firstName} ${row.userInfo.lastName}`,
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Patient
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),

    },
    {
        id: "patientNumber", // optional, you can keep this as a reference
        accessorFn: row => row.patientProfileInfo.patientNumber,
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Patient Number
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
        cell: ({ row }) => {
            return (
                <p className="p-0.5 w-fit rounded bg-neutral-200">{row.original.patientProfileInfo.patientNumber}</p>
            )
        }
    },
    {
        id: 'ageGender',
        accessorFn: row => `${row.age} ${row.gender}`,
        header: 'Gender',
        cell: ({ row }) => {
            const age = new Date().getFullYear() - new Date(row.original.userInfo.dateOfBirth).getFullYear();
            return (
                <div>
                    <p>{age} years</p>
                    <p className="text-xs text-neutral-500">{row.original.userInfo.gender}</p>
                </ div>
            )
        }
    },
    {
        accessorKey: "contact",
        header: 'Contact',
        cell: ({ row }) => {
            const { email, phone } = row.original.userInfo;
            return (
                <div>
                    <p className="flex items-center gap-1"><CiMail />{email}</p>
                    <p className="flex items-center gap-1"><IoCallOutline />{phone}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "lastVisit",
        header: 'Last visit',
        cell: ({ row }) => {
            const pastAppointments = row.original.appointments?.filter(a => a.status === "Completed");
            const last = pastAppointments?.[pastAppointments.length - 1];
            return last?.date || "N/A";
        },
    },
    {
        accessorKey: "nextAppt",
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Next appointment
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
        cell: ({ row }) => {
            const upcoming = row.original.appointments?.find(a => a.status === "pending");
            return upcoming?.date
                ? <div>
                    <p>{new Date(upcoming.date).toLocaleDateString()}</p>
                    <p>{upcoming.time}</p>
                </div>
                : <p className="text-gray-500">None scheduled</p>;
        },
    },
    {
        accessorKey: "Action",
        enableGlobalFilter: false,
        header: 'Action',
        cell: ({ row }) => {

            return <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewPatient(row.original.userInfo.id)}
                >
                    <BsEye className="h-3 w-3" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditPatient(patient.id)}
                >
                    <FaRegEdit className="h-3 w-3" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onScheduleAppointment(patient.id)}
                >
                    <BsCalendar className="h-3 w-3" />
                </Button>
            </div>
        }

    },

];
