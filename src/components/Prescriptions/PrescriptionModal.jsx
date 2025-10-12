"use client"
import { Plus, X, Pill, Clock, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";

const PrescriptionModal = ({ trigger }) => {
    const [open, setOpen] = useState(false);
    const [patientName, setPatientName] = useState("");
    const [medications, setMedications] = useState([
        { name: "", dosage: "", frequency: "", duration: "", instructions: "" }
    ]);
    const [generalNotes, setGeneralNotes] = useState("");

    const addMedication = () => {
        setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
    };

    const removeMedication = (index) => {
        if (medications.length > 1) {
            setMedications(medications.filter((_, i) => i !== index));
        }
    };

    const updateMedication = (index, field, value) => {
        const updated = medications.map((med, i) =>
            i === index ? { ...med, [field]: value } : med
        );
        setMedications(updated);
    };

    const handleSubmit = () => {
        // Here you would typically save the prescription
        console.log({
            patientName,
            medications: medications.filter(med => med.name && med.dosage),
            generalNotes,
            prescribedDate: new Date().toISOString()
        });

        // Reset form and close modal
        setPatientName("");
        setMedications([{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
        setGeneralNotes("");
        setOpen(false);
    };

    const isFormValid = patientName && medications.some(med => med.name && med.dosage);

    const frequencyOptions = [
        "Once daily",
        "Twice daily",
        "3x daily",
        "4x daily",
        "Every 4 hours",
        "Every 6 hours",
        "Every 8 hours",
        "Every 12 hours",
        "As needed",
        "Before meals",
        "After meals",
        "At bedtime"
    ];

    const durationOptions = [
        "3 days",
        "5 days",
        "7 days",
        "10 days",
        "14 days",
        "21 days",
        "30 days",
        "60 days",
        "90 days",
        "6 months",
        "1 year",
        "Ongoing"
    ];

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Pill className="h-5 w-5 text-blue-600" />
                            Create New Prescription
                        </DialogTitle>
                        <DialogDescription>
                            Create a new prescription for a patient with medication details and instructions.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Patient Selection */}
                        <div className="space-y-2">
                            <Label>Patient *</Label>
                            <Select value={patientName} onValueChange={setPatientName}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                                    <SelectItem value="michael-chen">Michael Chen</SelectItem>
                                    <SelectItem value="emily-davis">Emily Davis</SelectItem>
                                    <SelectItem value="robert-wilson">Robert Wilson</SelectItem>
                                    <SelectItem value="maria-garcia">Maria Garcia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Medications */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Medications *</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addMedication}
                                    className="h-8"
                                >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add Medication
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {medications.map((medication, index) => (
                                    <Card key={index} className="border border-gray-200">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-gray-900 flex items-center gap-2">
                                                    <Pill className="h-4 w-4" />
                                                    Medication {index + 1}
                                                </h4>
                                                {medications.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeMedication(index)}
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Medication Name */}
                                                <div className="space-y-2">
                                                    <Label>Medication Name *</Label>
                                                    <Input
                                                        placeholder="e.g., Amoxicillin"
                                                        value={medication.name}
                                                        onChange={(e) => updateMedication(index, 'name', e.target.value)}
                                                    />
                                                </div>

                                                {/* Dosage */}
                                                <div className="space-y-2">
                                                    <Label>Dosage *</Label>
                                                    <Input
                                                        placeholder="e.g., 500mg"
                                                        value={medication.dosage}
                                                        onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                                                    />
                                                </div>

                                                {/* Frequency */}
                                                <div className="space-y-2">
                                                    <Label>Frequency</Label>
                                                    <Select
                                                        value={medication.frequency}
                                                        onValueChange={(value) => updateMedication(index, 'frequency', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select frequency" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {frequencyOptions.map((option) => (
                                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Duration */}
                                                <div className="space-y-2">
                                                    <Label>Duration</Label>
                                                    <Select
                                                        value={medication.duration}
                                                        onValueChange={(value) => updateMedication(index, 'duration', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select duration" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {durationOptions.map((option) => (
                                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            {/* Instructions */}
                                            <div className="space-y-2 mt-4">
                                                <Label>Special Instructions</Label>
                                                <Textarea
                                                    placeholder="e.g., Take with food, avoid alcohol"
                                                    value={medication.instructions}
                                                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                                                    rows={2}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* General Notes */}
                        <div className="space-y-2">
                            <Label>General Notes</Label>
                            <Textarea
                                placeholder="Additional notes for the patient or pharmacy..."
                                value={generalNotes}
                                onChange={(e) => setGeneralNotes(e.target.value)}
                                rows={3}
                            />
                        </div>

                        {/* Prescription Options */}
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex-1">
                                <h4 className="text-blue-900 mb-2">Prescription Options</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex items-center gap-2 text-sm text-blue-700">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        Send to patient electronically
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-blue-700">
                                        <input type="checkbox" className="rounded" />
                                        Allow refills (specify in notes)
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-blue-700">
                                        <input type="checkbox" className="rounded" />
                                        Mark as urgent
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-blue-700">
                                        <input type="checkbox" className="rounded" />
                                        Require consultation before refill
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outline"
                                disabled={!isFormValid}
                                className="flex-1"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Save as Draft
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                                className="flex-1"
                            >
                                <Pill className="h-4 w-4 mr-2" />
                                Create & Send Prescription
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PrescriptionModal