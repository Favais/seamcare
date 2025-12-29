"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FaPlusSquare } from "react-icons/fa";
import PatientsTable from './PatientsTable';
import PatientDetails from './PatientDetails';
import { patientsData } from './data';
import { useAppContext } from '@/context/AppContext';
import { usePatients } from '@/hooks/useAllPatient';


const Patients = () => {
  const { user, session } = useAppContext()
  const { data: patients, isLoading, error } = usePatients({ doctorId: user.userId, session, user });
  const [currentView, setCurrentView] = useState('list')
  const [selectedPatient, setSelectedPatient] = useState(null)

  const handleViewPatient = (patientId) => {
    setSelectedPatient(patientId)
    setCurrentView('view')
  }

  if (!selectedPatient && currentView === 'view') {
    return (
      <div className="min-h-screen bg-background p-3 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-8 sm:py-12">
            <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">Patient not found</h2>
            <button onClick={() => setCurrentView('list')}
              className="text-blue-500 hover:underline text-sm sm:text-base">
              Back to patient list
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'list') {
    return (
      <div className='flex flex-col gap-2 sm:gap-3 h-screen'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0'>
          <div>
            <p className='text-xl sm:text-2xl font-semibold'>Patients</p>
            <p className='text-xs sm:text-sm text-neutral-600'>Manage and view all patient records</p>
          </div>
          <Button className='text-xs sm:text-sm w-full sm:w-auto'>
            <FaPlusSquare />
            Add New Patient
          </Button>
        </div>
        <div className='flex-1 min-h-0 overflow-hidden'>
          <PatientsTable handleViewPatient={handleViewPatient} patients={patients} />
        </div>
      </div>
    )
  }
  const patient = patients?.find(p => p.userInfo.id === selectedPatient)

  if (currentView === 'view') {
    return (
      <PatientDetails
        patient={patient}
        setCurrentView={setCurrentView}
        setSelectedPatient={setSelectedPatient} />
    )
  }

}

export default Patients