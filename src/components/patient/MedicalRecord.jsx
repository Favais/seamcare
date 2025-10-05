import React from 'react'
import { Alert, AlertDescription } from '../ui/alert'
import { GoAlert } from "react-icons/go";
import { Badge } from '../ui/badge';
import { BsFileText, BsHeart } from 'react-icons/bs';
import { CiPill } from "react-icons/ci";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RiSeparator } from "react-icons/ri";
import { Separator } from '../ui/separator';
import { FaHistory } from 'react-icons/fa';


const MedicalRecord = ({ MedicalRecord, vitals, vaccinations }) => {
    console.log(vaccinations);

    return (
        <div className='flex flex-col gap-2'>


            <div className='grid grid-cols-3 gap-2'>
                {/* Vital Signs */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BsHeart className="h-5 w-5" />
                            <span>Latest Vital Signs</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-muted-foreground">Blood Pressure</span>
                                <p>{vitals.bloodPressure}</p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">Heart Rate</span>
                                <p>{vitals.heartRate}</p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">Temperature</span>
                                <p>{vitals.temperature}</p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">Weight</span>
                                <p>{vitals.weight}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CiPill className="h-5 w-5" />
                            <span>Current Medications</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {MedicalRecord.medications.map((medication, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Badge variant="outline">{`${medication.name} ${medication.dosage} - ${medication.frequency}`}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                {/* Other History */}
                <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <FaHistory className='h-5 w-5' />
                            <span>Clinical Hisory</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-wrap gap-1'>
                                <span className='text-sm text-muted-foreground'>Vacinations:</span>
                                {vaccinations.map((vaccine) => (
                                    <Badge variant='outline'>
                                        {`${vaccine.vaccine}${vaccine.doses ? `(${vaccine.doses} Doses)` : ''}`}
                                    </Badge>
                                ))}
                            </div>
                            <div className='flex flex-wrap gap-1'>
                                <span className='text-sm text-muted-foreground'>Surgeries:</span>
                                {MedicalRecord.surgeries.map((surg) => (
                                    <Badge variant='outline'>
                                        {surg}
                                    </Badge>
                                ))}
                            </div>
                            <div className='flex flex-wrap gap-1'>
                                <span className='text-sm text-muted-foreground'>Family History:</span>
                                {MedicalRecord.familyHistory.map((fh, idx) => (
                                    <Badge key={idx} variant='outline'>
                                        {fh}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* Medical History */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <BsFileText className="h-5 w-5" />
                        <span>Medical History</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {MedicalRecord.treatmentHistory.map((record, index) => (
                            <div key={record.id}>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h4>{record.diagnosis}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Treatment: {record.treatment}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Doctor: {record.doctor} • {new Date(record.date).toLocaleDateString()}
                                        </p>
                                        {record.notes && (
                                            <p className="text-sm bg-muted p-2 rounded-md mt-2">
                                                {record.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {index < MedicalRecord.treatmentHistory.length - 1 && <Separator className="mt-4" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>



        </div>
    )
}

export default MedicalRecord