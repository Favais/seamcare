import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

export const columns = [
    {
        accessorKey: "visitNo",
        header: ({ column }) => (
            <button className='flex gap-2 p-3 items-center' onClick={() => column.toggleSorting()}>
                Visit No
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
    },
    {
        accessorKey: "patientNo",
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Patient Number
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
    },
    {
        accessorKey: "patientName",
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Patient Name
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Gender
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
    },
    {
        accessorKey: "dateOfVisit",
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Date of visit
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
    },
    {
        accessorKey: "timeOfVisit",
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Time of visit
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
    },
    {
        accessorKey: "Reason",
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Reason
                {column.getIsSorted() === "asc" ? <TiArrowSortedUp /> : column.getIsSorted() === "desc" ? <TiArrowSortedDown /> : "  "}
            </button>
        ),
    },
    {
        accessorKey: "Action",
        enableGlobalFilter: false,
        header: 'Action'
    },

];

export const data = [
    {
        visitNo: 1001,
        patientNo: "P001",
        patientName: "Jon Snow",
        gender: "Male",
        dateOfVisit: "2025-07-15",
        timeOfVisit: "10:00 AM",
        Reason: "Routine Checkup",
        Action: "Consult",
    },
    {
        visitNo: 1002,
        patientNo: "P002",
        patientName: "Arya Stark",
        gender: "Female",
        dateOfVisit: "2025-07-15",
        timeOfVisit: "11:30 AM",
        Reason: "Flu Symptoms",
        Action: "Consult",
    },
    {
        visitNo: 1003,
        patientNo: "P003",
        patientName: "Tyrion Lannister",
        gender: "Male",
        dateOfVisit: "2025-07-14",
        timeOfVisit: "02:15 PM",
        Reason: "Headache",
        Action: "Consult",
    },
    {
        visitNo: 1004,
        patientNo: "P004",
        patientName: "Daenerys Targaryen",
        gender: "Female",
        dateOfVisit: "2025-07-13",
        timeOfVisit: "09:45 AM",
        Reason: "Stomach Pain",
        Action: "Consult",
    },
    {
        visitNo: 1005,
        patientNo: "P005",
        patientName: "Bran Stark",
        gender: "Male",
        dateOfVisit: "2025-07-12",
        timeOfVisit: "03:00 PM",
        Reason: "Annual Physical",
        Action: "Consult",
    },
    {
        visitNo: 1006,
        patientNo: "P006",
        patientName: "Cersei Lannister",
        gender: "Female",
        dateOfVisit: "2025-07-11",
        timeOfVisit: "08:30 AM",
        Reason: "Blood Pressure Check",
        Action: "Consult",
    },
    {
        visitNo: 1007,
        patientNo: "P007",
        patientName: "Robb Stark",
        gender: "Male",
        dateOfVisit: "2025-07-10",
        timeOfVisit: "01:45 PM",
        Reason: "Injury Follow-up",
        Action: "Consult",
    },
    {
        visitNo: 1008,
        patientNo: "P008",
        patientName: "Sansa Stark",
        gender: "Female",
        dateOfVisit: "2025-07-09",
        timeOfVisit: "12:15 PM",
        Reason: "Back Pain",
        Action: "Consult",
    },
    {
        visitNo: 1009,
        patientNo: "P009",
        patientName: "Jorah Mormont",
        gender: "Male",
        dateOfVisit: "2025-07-08",
        timeOfVisit: "10:45 AM",
        Reason: "Skin Rash",
        Action: "Consult",
    },
    {
        visitNo: 1010,
        patientNo: "P010",
        patientName: "Missandei",
        gender: "Female",
        dateOfVisit: "2025-07-07",
        timeOfVisit: "02:00 PM",
        Reason: "Allergy Test",
        Action: "Consult",
    },
    {
        visitNo: 1011,
        patientNo: "P011",
        patientName: "Samwell Tarly",
        gender: "Male",
        dateOfVisit: "2025-07-06",
        timeOfVisit: "04:30 PM",
        Reason: "Weight Check",
        Action: "Consult",
    },
    {
        visitNo: 1012,
        patientNo: "P012",
        patientName: "Ygritte",
        gender: "Female",
        dateOfVisit: "2025-07-05",
        timeOfVisit: "09:00 AM",
        Reason: "Cold Symptoms",
        Action: "Consult",
    },
];
