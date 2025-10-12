import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, Send } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const mockPrescriptions = [
    {
        id: "1",
        patientName: "Sarah Johnson",
        patientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
        medications: [
            { name: "Amoxicillin", dosage: "500mg", frequency: "3x daily" },
            { name: "Ibuprofen", dosage: "200mg", frequency: "As needed" }
        ],
        prescribedDate: "2024-01-15",
        status: "active",
        duration: "7 days",
        notes: "Take with food. Complete full course."
    },
    {
        id: "2",
        patientName: "Michael Chen",
        patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk2OTE5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        medications: [
            { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
        ],
        prescribedDate: "2024-01-14",
        status: "active",
        duration: "30 days",
        notes: "Monitor blood pressure weekly."
    },
    {
        id: "3",
        patientName: "Emily Davis",
        patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
        medications: [
            { name: "Albuterol", dosage: "90mcg", frequency: "2 puffs as needed" }
        ],
        prescribedDate: "2024-01-13",
        status: "pending",
        duration: "90 days",
        notes: "Use before exercise or during asthma symptoms."
    },
    {
        id: "4",
        patientName: "Robert Wilson",
        patientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk2OTE5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        medications: [
            { name: "Metformin", dosage: "500mg", frequency: "2x daily" },
            { name: "Glipizide", dosage: "5mg", frequency: "Once daily" }
        ],
        prescribedDate: "2024-01-12",
        status: "completed",
        duration: "30 days"
    }
];
const statusConfig = {
    "active": { label: "Active", color: "bg-green-100 text-green-800 border-green-200" },
    "pending": { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    "completed": { label: "Completed", color: "bg-gray-100 text-gray-800 border-gray-200" }
};

const PrescriptionsTable = () => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    return (
        <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <Table className="w-full">
                <TableHeader className="bg-gray-50 border-b border-gray-200">
                    <TableRow>
                        <TableHead className="text-left px-6 py-4 text-gray-700">Patient</TableHead>
                        <TableHead className="text-left px-6 py-4 text-gray-700">Medications</TableHead>
                        <TableHead className="text-left px-6 py-4 text-gray-700">Duration</TableHead>
                        <TableHead className="text-left px-6 py-4 text-gray-700">Date Prescribed</TableHead>
                        <TableHead className="text-left px-6 py-4 text-gray-700">Status</TableHead>
                        <TableHead className="text-left px-6 py-4 text-gray-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {mockPrescriptions.map((prescription) => (
                        <TableRow key={prescription.id} className="hover:bg-gray-50">
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={prescription.patientAvatar} alt={prescription.patientName} />
                                        <AvatarFallback className="text-xs">
                                            {prescription.patientName.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-gray-900">{prescription.patientName}</p>
                                        <p className="text-gray-500 text-sm">ID: {prescription.id}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="space-y-1">
                                    {prescription.medications.slice(0, 2).map((med, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="text-gray-900 text-sm">{med.name}</span>
                                            <Badge variant="outline" className="text-xs">
                                                {med.dosage}
                                            </Badge>
                                        </div>
                                    ))}
                                    {prescription.medications.length > 2 && (
                                        <p className="text-gray-500 text-xs">
                                            +{prescription.medications.length - 2} more
                                        </p>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <span className="text-gray-900">{prescription.duration}</span>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <span className="text-gray-600">{formatDate(prescription.prescribedDate)}</span>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <Badge className={statusConfig[prescription.status].color}>
                                    {statusConfig[prescription.status].label}
                                </Badge>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="h-8 px-3">
                                        <Eye className="h-3 w-3 mr-1" />
                                        View
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-8 px-3">
                                        <Send className="h-3 w-3 mr-1" />
                                        Send
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default PrescriptionsTable