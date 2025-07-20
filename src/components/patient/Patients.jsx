"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FaPlusSquare } from "react-icons/fa";
import PatientsTable from './PatientsTable';
import PatientDetails from './PatientDetails';
import { patientsData } from './data';


const Patients = () => {
  const [currentView, setCurrentView] = useState('list')
  const [selectedPatient, setSelectedPatient] = useState(null)

  const handleViewPatient = (patientId) => {
    setSelectedPatient(patientId)
    setCurrentView('view')
  }

  if (!selectedPatient && currentView === 'view') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-12">
            <h2 className="text-2xl mb-4">Patient not found</h2>
            <button onClick={() => setCurrentView('list')}
              className="text-blue-500 hover:underline">
              Back to patient list
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'list') {
    return (
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-2xl font-semibold'>Patients</p>
            <p className='text-neutral-600'>Manage and view all patient records</p>
          </div>
          <Button >
            <FaPlusSquare />
            Add New Patient
          </Button>
        </div>
        <PatientsTable handleViewPatient={handleViewPatient} />
      </div>
    )
  }
  const patient = patientsData.find(p => p.patientNo === selectedPatient)

  if (currentView === 'view') {
    return (
      <PatientDetails patient={patient} setCurrentView={setCurrentView} setSelectedPatient={setSelectedPatient} />
    )
  }

}

export default Patients