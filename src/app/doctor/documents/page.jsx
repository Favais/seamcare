"use client"
import { DocumentTable } from '@/components/documents/Documents'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import UploadDoc from '@/components/UploadDoc'
import { Bell, Search, Settings } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='py-3 px-4 flex flex-col'>
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Title */}
                    <div>
                        <h1 className="text-gray-900">Patient Documents</h1>
                        <p className="text-gray-600">Manage patient files and medical records</p>
                    </div>

                    {/* Center - Search Bar */}
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search documents, patients, or categories..."
                                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Right side - Profile and Actions */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-200">
                            <div className="text-right">
                                <p className="text-gray-900 text-sm">Dr. Sarah Wilson</p>
                                <p className="text-gray-500 text-xs">Internal Medicine</p>
                            </div>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://images.unsplash.com/photo-1758127211809-68494a643d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTk2ODMwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Dr. Sarah Wilson" />
                                <AvatarFallback>SW</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <UploadDoc />
            </div>
            <DocumentTable />
        </div>
    )
}

export default page