import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { BsFileText, BsHeart } from 'react-icons/bs';
import { CiPill } from 'react-icons/ci';
import { FaHistory } from 'react-icons/fa';
import { useAppContext } from '@/context/AppContext';

const MedicalRecord = ({ patient }) => {
    console.log(patient);

    if (!patient?.patientProfileInfo) return null;

    const { vitals, medicalHistory, vaccinations } = patient.patientProfileInfo;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
                {/* Vital Signs */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BsHeart className="h-5 w-5" />
                            <span>Latest Vital Signs</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm text-muted-foreground">Blood Pressure</span>
                            <p>{vitals?.bloodPressure || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Heart Rate</span>
                            <p>{vitals?.heartRate || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Temperature</span>
                            <p>{vitals?.temperature || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Weight</span>
                            <p>{vitals?.weight || 'N/A'}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Current Medications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CiPill className="h-5 w-5" />
                            <span>Current Medications</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {medicalHistory?.medications?.length > 0 ? (
                            medicalHistory.medications.map((med, idx) => (
                                <Badge key={idx} variant="outline">
                                    {`${med.name} ${med.dosage} - ${med.frequency}`}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No medications recorded</p>
                        )}
                    </CardContent>
                </Card>

                {/* Clinical History */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FaHistory className="h-5 w-5" />
                            <span>Clinical History</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-1">
                            <span className="text-sm text-muted-foreground">Vaccinations:</span>
                            {vaccinations?.length > 0 ? (
                                vaccinations.map((vaccine, idx) => (
                                    <Badge key={idx} variant="outline">
                                        {`${vaccine.vaccine}${vaccine.doses ? ` (${vaccine.doses} Doses)` : ''}`}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground">None</span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                            <span className="text-sm text-muted-foreground">Surgeries:</span>
                            {medicalHistory?.surgeries?.length > 0 ? (
                                medicalHistory.surgeries.map((surg, idx) => (
                                    <Badge key={idx} variant="outline">{surg}</Badge>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground">None</span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                            <span className="text-sm text-muted-foreground">Family History:</span>
                            {medicalHistory?.familyHistory?.length > 0 ? (
                                medicalHistory.familyHistory.map((fh, idx) => (
                                    <Badge key={idx} variant="outline">{fh}</Badge>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground">None</span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Medical History / Treatments */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BsFileText className="h-5 w-5" />
                        <span>Medical History</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {medicalHistory?.treatmentHistory?.length > 0 ? (
                        medicalHistory.treatmentHistory.map((record, idx) => (
                            <div key={record._id}>
                                <div className="space-y-1">
                                    <h4>{record.diagnosis}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Treatment: {record.treatment}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Doctor: {record.doctor} • {new Date(record.date).toLocaleDateString()}
                                    </p>
                                    {record.notes && (
                                        <p className="text-sm bg-muted p-2 rounded-md mt-2">{record.notes}</p>
                                    )}
                                </div>
                                {idx < medicalHistory.treatmentHistory.length - 1 && <Separator className="mt-4" />}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No treatment history available</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MedicalRecord;
