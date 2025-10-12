import { Eye, Download, Paperclip, Grid, List } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";



const mockDocuments = [
    {
        id: "1",
        patientName: "Sarah Johnson",
        patientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
        documentName: "Blood Test Results.pdf",
        category: "lab-results",
        uploadedBy: "Dr. Martinez",
        uploadDate: "2024-01-15",
        status: "pending"
    },
    {
        id: "2",
        patientName: "Michael Chen",
        patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk2OTE5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        documentName: "Prescription - Antibiotics.pdf",
        category: "prescription",
        uploadedBy: "Dr. Johnson",
        uploadDate: "2024-01-14",
        status: "viewed",
        isShared: true
    },
    {
        id: "3",
        patientName: "Emily Davis",
        patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
        documentName: "Cardiology Referral.pdf",
        category: "referral",
        uploadedBy: "Patient",
        uploadDate: "2024-01-13",
        status: "urgent"
    },
    {
        id: "4",
        patientName: "Robert Wilson",
        patientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NTk2OTE5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        documentName: "Follow-up Consultation Notes.pdf",
        category: "consultation-notes",
        uploadedBy: "Dr. Smith",
        uploadDate: "2024-01-12",
        status: "viewed"
    },
    {
        id: "5",
        patientName: "Maria Garcia",
        patientAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc1OTY5MTkwMnww&ixlib=rb-4.1.0&q=80&w=1080",
        documentName: "X-Ray Chest Report.pdf",
        category: "imaging",
        uploadedBy: "Dr. Rodriguez",
        uploadDate: "2024-01-11",
        status: "pending"
    }
];

const categoryConfig = {
    "lab-results": { label: "Lab Results", color: "bg-green-100 text-green-800 border-green-200" },
    "prescription": { label: "Prescription", color: "bg-blue-100 text-blue-800 border-blue-200" },
    "referral": { label: "Referral", color: "bg-purple-100 text-purple-800 border-purple-200" },
    "consultation-notes": { label: "Notes", color: "bg-orange-100 text-orange-800 border-orange-200" },
    "imaging": { label: "Imaging", color: "bg-gray-100 text-gray-800 border-gray-200" }
};

const statusConfig = {
    "viewed": { label: "Viewed by Patient", color: "bg-gray-100 text-gray-600" },
    "pending": { label: "Pending Review", color: "bg-yellow-100 text-yellow-800" },
    "urgent": { label: "Urgent", color: "bg-red-100 text-red-800" }
};

export function DocumentTable() {
    const [viewMode, setViewMode] = useState("list");

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (viewMode === "grid") {
        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-gray-900 mb-1">Documents Overview</h3>
                        <p className="text-gray-600">{mockDocuments.length} documents found</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("list")}
                            className="h-9"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className="h-9"
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockDocuments.map((doc) => (
                        <Card key={doc.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={doc.patientAvatar} alt={doc.patientName} />
                                        <AvatarFallback>{doc.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 truncate">{doc.patientName}</p>
                                        <p className="text-gray-500 text-sm">{formatDate(doc.uploadDate)}</p>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h4 className="text-gray-900 mb-2 truncate">{doc.documentName}</h4>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className={categoryConfig[doc.category].color}>
                                            {categoryConfig[doc.category].label}
                                        </Badge>
                                        {doc.status && (
                                            <Badge variant="outline" className={statusConfig[doc.status].color}>
                                                {statusConfig[doc.status].label}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm">By {doc.uploadedBy}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="flex-1">
                                        <Eye className="h-3 w-3 mr-1" />
                                        View
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Download className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Paperclip className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-3 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-gray-900 mb-1">Documents Overview</h3>
                    <p className="text-gray-600">{mockDocuments.length} documents found</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="h-9"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="h-9"
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader className="bg-gray-50 border-b border-gray-200">
                            <TableRow>
                                <TableHead className="text-left px-6 py-4 text-gray-700">Patient</TableHead>
                                <TableHead className="text-left px-6 py-4 text-gray-700">Document</TableHead>
                                <TableHead className="text-left px-6 py-4 text-gray-700">Category</TableHead>
                                <TableHead className="text-left px-6 py-4 text-gray-700">Uploaded By</TableHead>
                                <TableHead className="text-left px-6 py-4 text-gray-700">Date</TableHead>
                                <TableHead className="text-left px-6 py-4 text-gray-700">Status</TableHead>
                                <TableHead className="text-left px-6 py-4 text-gray-700">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-200">
                            {mockDocuments.map((doc) => (
                                <TableRow key={doc.id} className="hover:bg-gray-50">
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={doc.patientAvatar} alt={doc.patientName} />
                                                <AvatarFallback className="text-xs">
                                                    {doc.patientName.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-gray-900">{doc.patientName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-900">{doc.documentName}</span>
                                            {doc.isShared && (
                                                <Badge variant="outline" className="text-xs">Shared</Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge className={categoryConfig[doc.category].color}>
                                            {categoryConfig[doc.category].label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-gray-600">{doc.uploadedBy}</TableCell>
                                    <TableCell className="px-6 py-4 text-gray-600">{formatDate(doc.uploadDate)}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        {doc.status && (
                                            <Badge variant="outline" className={statusConfig[doc.status].color}>
                                                {statusConfig[doc.status].label}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline" className="h-8 px-3">
                                                <Eye className="h-3 w-3 mr-1" />
                                                View
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8 px-3">
                                                <Download className="h-3 w-3 mr-1" />
                                                Download
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8 px-3">
                                                <Paperclip className="h-3 w-3 mr-1" />
                                                Attach
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}