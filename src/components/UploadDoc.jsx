import React, { useCallback } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { UploadCloud } from 'lucide-react'
import { BsUpload } from 'react-icons/bs'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
    Select, SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import { useDropzone } from 'react-dropzone'

const UploadDoc = () => {

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, // required
        multiple: true, // allow multiple files
        accept: {
            "image/*": [], // restrict to images
        },
    });
    return (
        <div className='flex justify-end items-center py-3'>
            <Dialog>
                <form action="">
                    <DialogTrigger asChild>
                        <Button variant="outline"><UploadCloud /> Upload a document</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Document</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="Title">Document Title</Label>
                                <Input id="Title" name="docTitle" defaultValue="X-Ray Result" />
                            </div>
                            <div className='grid grid-cols-2'>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selct document type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Prescription">Prescription</SelectItem>
                                        <SelectItem value="Lab Report">Lab Report</SelectItem>
                                        <SelectItem value="Note">Note</SelectItem>
                                        <SelectItem value="ID">ID</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input id="patientID" name="patientId" placeholder="Enter patient ID" />

                            </div>
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed h-52 p-6 rounded-2xl text-center flex flex-col items-center justify-center cursor-pointer transition ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Drop the files here...</p>
                                ) : (
                                    <p>Drag & drop files here, or click to select</p>
                                )}
                                <UploadCloud />

                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit"><BsUpload />Upload</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default UploadDoc