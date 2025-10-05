import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Button } from "../ui/button";
import { BsCalendar, BsEye } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";


export const patientsData = [
    {
        patientNo: "P100234",
        firstName: "Aisha",
        lastName: "Bello",
        gender: "Female",
        dateOfBirth: "1992-05-17",
        age: 33,
        email: "aisha.bello@example.com",
        phone: "+2348031234567",
        address: {
            street: "12 Opebi Road",
            city: "Lagos",
            state: "Lagos",
            zipCode: "100001",
            country: "Nigeria"
        },
        emergencyContact: [
            {
                name: "Yusuf Bello",
                relationship: "Brother",
                phone: "+2348029876543",
                email: "yusuf.bello@example.com"
            }
        ],
        insurance: {
            provider: "AXA Mansard",
            policyNumber: "AXA-NG-2023123456",
            groupNumber: null,
            copay: null,
            deductible: null,
            status: "Active",
            validTill: "2026-06-30"
        },
        medicalHistory: {
            conditions: ["Hypertension", "Asthma"],
            allergies: [
                { name: "Penicillin", severity: "Severe" }
            ],
            medications: [
                { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
                { name: "Ventolin Inhaler", dosage: "100mcg", frequency: "As needed" }
            ],
            surgeries: ["Appendectomy - 2010"],
            familyHistory: ["Diabetes (Mother)", "Stroke (Grandfather)"],
            treatmentHistory: [
                {
                    date: "2025-06-15",
                    diagnosis: "Asthma exacerbation",
                    treatment: "Nebulization, oral steroids",
                    doctor: "Dr. Linda Eze",
                    notes: "Patient responded well to nebulization. Advised to avoid triggers and follow up in 2 weeks."
                },
                {
                    date: "2025-07-01",
                    diagnosis: "Hypertension follow-up",
                    treatment: "Medication adjustment",
                    doctor: "Dr. Emeka Okafor",
                    notes: "Blood pressure slightly elevated. Lisinopril dose increased. Monitor BP at home."
                }
            ]
        },
        vitals:
        {
            date: "2025-07-01",
            bloodPressure: "130/85",
            heartRate: 78,
            temperature: 36.8,
            respiratoryRate: 18,
            spo2: 98,
            weight: 68,
            height: 165
        }
        ,
        appointments: [
            {
                appointmentId: "APT1001",
                doctor: "Dr. Emeka Okafor",
                department: "Cardiology",
                date: "2025-07-22",
                time: "10:30",
                status: "Upcoming",
                reason: "Routine checkup"
            }, {
                appointmentId: "APT1002",
                doctor: "Dr. Sarah Johnson",
                department: "Dermatology",
                date: "2025-07-25",
                time: "14:00",
                status: "Completed",
                reason: "Skin rash evaluation"
            },
            {
                appointmentId: "APT1003",
                doctor: "Dr. Ahmed Khan",
                department: "Neurology",
                date: "2025-07-28",
                time: "09:15",
                status: "Upcoming",
                reason: "Headache and dizziness"
            },
            {
                appointmentId: "APT1004",
                doctor: "Dr. Linda Mensah",
                department: "Pediatrics",
                date: "2025-08-01",
                time: "11:00",
                status: "Upcoming",
                reason: "Annual wellness exam"
            },
            {
                appointmentId: "APT1005",
                doctor: "Dr. Chinedu Nwosu",
                department: "Orthopedics",
                date: "2025-08-03",
                time: "13:30",
                status: "Cancelled",
                reason: "Knee pain consultation"
            },
            {
                appointmentId: "APT1006",
                doctor: "Dr. Fiona Garcia",
                department: "Ophthalmology",
                date: "2025-08-05",
                time: "15:45",
                status: "Upcoming",
                reason: "Blurry vision and eye strain"
            },
            {
                appointmentId: "APT0995",
                doctor: "Dr. Linda Eze",
                department: "Pulmonology",
                date: "2025-06-15",
                time: "14:00",
                status: "Completed",
                notes: "Follow-up for asthma control"
            }
        ],
        labResults: [
            {
                testName: "CBC",
                date: "2025-06-16",
                result: "Normal",
                documentLink: "https://hospital.com/labs/cbc-P100234.pdf"
            },
            {
                testName: "Chest X-Ray",
                date: "2025-06-10",
                result: "Mild inflammation",
                documentLink: "https://hospital.com/labs/xray-P100234.pdf"
            }
        ],
        vaccinations: [
            { vaccine: "COVID-19", doses: 2, lastDoseDate: "2022-03-15" },
            { vaccine: "Tetanus", lastDoseDate: "2024-08-01" }
        ],
        createdAt: "2024-11-10T09:30:00Z",
        updatedAt: "2025-07-01T15:45:00Z"
    },
    {
        patientNo: "P100235",
        firstName: "Emmanuel",
        lastName: "Okon",
        gender: "Male",
        dateOfBirth: "1988-09-12",
        age: 36,
        email: "emmanuel.okon@example.com",
        phone: "+2348132234467",
        address: {
            street: "22 Etim Inyang Crescent",
            city: "Uyo",
            state: "Akwa Ibom",
            zipCode: "520001",
            country: "Nigeria"
        },
        emergencyContact: [
            {
                name: "Grace Okon",
                relationship: "Wife",
                phone: "+2348169987766",
                email: "grace.okon@example.com"
            }
        ],
        insurance: {
            provider: "Leadway Health",
            policyNumber: "LWH-9898753",
            groupNumber: null,
            copay: null,
            deductible: null,
            status: "Active",
            validTill: "2025-12-31"
        },
        medicalHistory: {
            conditions: ["Type 2 Diabetes"],
            allergies: [],
            medications: [
                { name: "Metformin", dosage: "500mg", frequency: "Twice daily" }
            ],
            surgeries: [],
            familyHistory: ["Hypertension (Father)"],
            treatmentHistory: [
                {
                    date: "2025-07-10",
                    diagnosis: "Hyperglycemia",
                    treatment: "Medication review, dietary advice",
                    doctor: "Dr. Boma Nwachukwu",
                    notes: "Patient advised to monitor blood sugar closely and adhere to dietary recommendations."
                }
            ]
        },
        vitals: [
            {
                date: "2025-07-01",
                bloodPressure: "140/90",
                heartRate: 82,
                temperature: 37.0,
                respiratoryRate: 19,
                spo2: 97,
                weight: 85,
                height: 178
            }
        ],
        appointments: [
            {
                appointmentId: "APT1002",
                doctor: "Dr. Boma Nwachukwu",
                department: "Endocrinology",
                date: "2025-08-05",
                time: "09:00",
                status: "Upcoming",
                reason: "Blood sugar review"
            }
        ],
        labResults: [
            {
                testName: "Fasting Blood Sugar",
                date: "2025-07-10",
                result: "High",
                documentLink: "https://hospital.com/labs/fbs-P100235.pdf"
            }
        ],
        vaccinations: [
            { vaccine: "COVID-19", doses: 3, lastDoseDate: "2023-01-20" }
        ],
        createdAt: "2024-12-01T11:00:00Z",
        updatedAt: "2025-07-01T15:00:00Z"
    },
    {
        patientNo: "P100236",
        firstName: "Zainab",
        lastName: "Mohammed",
        gender: "Female",
        dateOfBirth: "2000-01-22",
        age: 25,
        email: "zainab.mohammed@example.com",
        phone: "+2348091112233",
        address: {
            street: "5 Airport Road",
            city: "Abuja",
            state: "FCT",
            zipCode: "900211",
            country: "Nigeria"
        },
        emergencyContact: [
            {
                name: "Fatima Mohammed",
                relationship: "Mother",
                phone: "+2348023344556",
                email: "fatima.mohammed@example.com"
            }
        ],
        insurance: {
            provider: null,
            policyNumber: null,
            groupNumber: null,
            copay: null,
            deductible: null,
            status: null,
            validTill: null
        },
        medicalHistory: {
            conditions: [],
            allergies: [
                { name: "Dust", severity: "Mild" },
                { name: "Seafood", severity: "Moderate" }
            ],
            medications: [],
            surgeries: [],
            familyHistory: [],
            treatmentHistory: [
                {
                    date: "2025-07-01",
                    diagnosis: "Allergic rhinitis",
                    treatment: "Antihistamines prescribed",
                    doctor: "Dr. Musa Garba",
                    notes: "Patient instructed to avoid allergens and use antihistamines as needed."
                }
            ]
        },
        vitals:
        {
            date: "2025-07-01",
            bloodPressure: "110/70",
            heartRate: 72,
            temperature: 36.5,
            respiratoryRate: 16,
            spo2: 99,
            weight: 60,
            height: 160
        },
        appointments: [
            {
                appointmentId: "APT1003",
                doctor: "Dr. Musa Garba",
                department: "ENT",
                date: "2025-07-25",
                time: "13:00",
                status: "Upcoming",
                reason: "Allergy flare-up"
            }
        ],
        labResults: [],
        vaccinations: [
            { vaccine: "Hepatitis B", doses: 3, lastDoseDate: "2019-06-15" }
        ],
        createdAt: "2025-01-10T08:15:00Z",
        updatedAt: "2025-07-01T12:00:00Z"
    },
    {
        patientNo: "P100237",
        firstName: "Chinedu",
        lastName: "Ifeanyi",
        gender: "Male",
        dateOfBirth: "1976-03-11",
        age: 49,
        email: "chinedu.ifeanyi@example.com",
        phone: "+2347012233445",
        address: {
            street: "18 Nnewi Road",
            city: "Onitsha",
            state: "Anambra",
            zipCode: "430001",
            country: "Nigeria"
        },
        emergencyContact: [
            {
                name: "Ngozi Ifeanyi",
                relationship: "Wife",
                phone: "+2348021122334",
                email: "ngozi.ifeanyi@example.com"
            }
        ],
        insurance: {
            provider: "NHIS",
            policyNumber: "NHIS-ANA-445599",
            groupNumber: null,
            copay: null,
            deductible: null,
            status: "Active",
            validTill: "2025-10-15"
        },
        medicalHistory: {
            conditions: ["Arthritis"],
            allergies: [],
            medications: [
                { name: "Ibuprofen", dosage: "200mg", frequency: "Twice daily" }
            ],
            surgeries: [],
            familyHistory: [],
            treatmentHistory: [
                {
                    date: "2025-06-25",
                    diagnosis: "Joint pain",
                    treatment: "NSAIDs prescribed, physiotherapy advised",
                    doctor: "Dr. Linda Eze",
                    notes: "Patient to start physiotherapy sessions next week. Monitor pain and report any side effects."
                }
            ]
        },
        vitals: [
            {
                date: "2025-06-25",
                bloodPressure: "125/80",
                heartRate: 75,
                temperature: 36.6,
                respiratoryRate: 17,
                spo2: 98,
                weight: 80,
                height: 172
            }
        ],
        appointments: [],
        labResults: [],
        vaccinations: [],
        createdAt: "2023-09-05T10:00:00Z",
        updatedAt: "2025-06-25T09:45:00Z"
    },
    {
        patientNo: "P100238",
        firstName: "Funmi",
        lastName: "Adebayo",
        gender: "Female",
        dateOfBirth: "1990-10-30",
        age: 34,
        email: "funmi.adebayo@example.com",
        phone: "+2348075556677",
        address: {
            street: "45 Allen Avenue",
            city: "Lagos",
            state: "Lagos",
            zipCode: "100212",
            country: "Nigeria"
        },
        emergencyContact: [
            {
                name: "Tayo Adebayo",
                relationship: "Sister",
                phone: "+2348069998877",
                email: "tayo.adebayo@example.com"
            }
        ],
        insurance: {
            provider: "Blue Cross Blue Shield",
            policyNumber: "ABC123456789",
            groupNumber: "GRP001",
            copay: "$25",
            deductible: "$1,500",
            status: "Active",
            validTill: null
        },
        medicalHistory: {
            conditions: ["Migraines"],
            allergies: [
                { name: "None", severity: "Mild" }
            ],
            medications: [
                { name: "Paracetamol", dosage: "500mg", frequency: "As needed" }
            ],
            surgeries: [],
            familyHistory: [],
            treatmentHistory: [
                {
                    date: "2025-06-20",
                    diagnosis: "Migraine attack",
                    treatment: "Pain relief, rest advised",
                    doctor: "Dr. Emeka Okafor",
                    notes: "Patient advised to keep a headache diary and return if symptoms worsen."
                }
            ]
        },
        vitals:
        {
            date: "2025-07-01",
            bloodPressure: "118/76",
            heartRate: 70,
            temperature: 36.4,
            respiratoryRate: 16,
            spo2: 99,
            weight: 62,
            height: 162
        },
        appointments: [],
        labResults: [],
        vaccinations: [
            { vaccine: "HPV", lastDoseDate: "2021-04-22" }
        ],
        createdAt: "2025-03-01T09:00:00Z",
        updatedAt: "2025-07-01T11:45:00Z"
    },
    {
        patientNo: "P100239",
        firstName: "Ibrahim",
        lastName: "Salihu",
        gender: "Male",
        dateOfBirth: "1982-06-02",
        age: 43,
        email: "ibrahim.salihu@example.com",
        phone: "+2347058882233",
        address: {
            street: "7 Kaduna Road",
            city: "Kano",
            state: "Kano",
            zipCode: "700001",
            country: "Nigeria"
        },
        emergencyContact: [
            {
                name: "Amina Salihu",
                relationship: "Wife",
                phone: "+2348133344555",
                email: "amina.salihu@example.com"
            }
        ],
        insurance: {
            provider: "Hygeia",
            policyNumber: "HYG-KN-998877",
            groupNumber: "GRP002",
            copay: "$20",
            deductible: "$1,000",
            status: "Active",
            validTill: null
        },
        medicalHistory: {
            conditions: [],
            allergies: [
                { name: "None", severity: "Mild" }
            ],
            medications: [],
            surgeries: [],
            familyHistory: [],
            treatmentHistory: [
                {
                    date: "2025-06-29",
                    diagnosis: "General checkup",
                    treatment: "No treatment required",
                    doctor: "Dr. Musa Garba",
                    notes: "Routine checkup. No issues found. Advised to maintain healthy lifestyle."
                }
            ]
        },
        vitals: [
            {
                date: "2025-06-29",
                bloodPressure: "122/78",
                heartRate: 74,
                temperature: 36.7,
                respiratoryRate: 17,
                spo2: 98,
                weight: 77,
                height: 175
            }
        ],
        appointments: [],
        labResults: [],
        vaccinations: [],
        createdAt: "2024-10-10T08:00:00Z",
        updatedAt: "2025-06-29T14:00:00Z"
    }
    // You can copy and extend with 4 more using similar structure
];

export const columns = ({ onViewPatient }) => [
    {
        id: 'patient',
        accessorFn: row => `${row.firstName} ${row.lastName}`,
        header: ({ column }) => (
            <button className='flex gap-2 items-center' onClick={() => column.toggleSorting()}>
                Patient
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
        cell: ({ row }) => {
            return (
                <p className="p-0.5 w-fit rounded bg-neutral-200">{row.original.patientNo}</p>
            )
        }
    },
    {
        id: 'ageGender',
        accessorFn: row => `${row.age} ${row.gender}`,
        header: 'Gender',
        cell: ({ row }) => {
            return (
                <div>
                    <p>{row.original.age} years</p>
                    <p className="text-xs text-neutral-500">{row.original.gender}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "contact",
        header: 'Contact',
        cell: ({ row }) => {
            const { email, phone } = row.original
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
            const upcoming = row.original.appointments?.find(a => a.status === "Upcoming");
            return upcoming?.date
                ? <div>
                    <p>{upcoming.date}</p>
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
                    onClick={() => onViewPatient(row.original.patientNo)}
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
