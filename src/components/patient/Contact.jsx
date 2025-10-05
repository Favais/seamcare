import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { BsPhone, BsShield } from 'react-icons/bs'
import { CgMail } from 'react-icons/cg'
import { PiUserSquare } from 'react-icons/pi'

const Contact = ({ emergencyContacts, insurance }) => {

    return (
        <div className='grid grid-cols-2 gap-2'>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <PiUserSquare className="h-5 w-5" />
                        <span>Emergency Contacts</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {emergencyContacts.map((contact, idx) => (
                            <div key={idx}>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4>{contact.name}</h4>
                                        <Badge variant="outline">{contact.relationship}</Badge>
                                    </div>

                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-2">
                                            <BsPhone className="h-3 w-3" />
                                            <span>{contact.phone}</span>
                                        </div>

                                        {contact.email && (
                                            <div className="flex items-center space-x-2">
                                                <CgMail className="h-3 w-3" />
                                                <span>{contact.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {idx < emergencyContacts.length - 1 && <Separator className="mt-4" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <BsShield className="h-5 w-5" />
                        <span>Insurance Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4>{insurance.provider}</h4>
                            <Badge variant={insurance.status === "Active" ? "default" : "destructive"}>
                                {insurance.status}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Policy Number</span>
                                <p>{insurance.policyNumber}</p>
                            </div>

                            <div>
                                <span className="text-muted-foreground">Group Number</span>
                                <p>{insurance.groupNumber}</p>
                            </div>

                            <div>
                                <span className="text-muted-foreground">Copay</span>
                                <p>{insurance.copay}</p>
                            </div>

                            <div>
                                <span className="text-muted-foreground">Deductible</span>
                                <p>{insurance.deductible}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Contact