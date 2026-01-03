"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaPlusSquare } from "react-icons/fa";
import PatientsTable from "./PatientsTable";
import PatientDetails from "./PatientDetails";
import { patientsData } from "./data";
import { useAppContext } from "@/context/AppContext";
import { usePatients } from "@/hooks/useAllPatient";

const Patients = () => {
  const { user, session } = useAppContext();
  const {
    data: patients,
    isLoading,
    error,
  } = usePatients({ doctorId: user.userId, session, user });
  const [currentView, setCurrentView] = useState("list");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewPatient = (patientId) => {
    setSelectedPatient(patientId);
    setCurrentView("view");
  };

  if (!selectedPatient && currentView === "view") {
    return (
      <div className="h-full bg-background p-3 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-8 sm:py-12">
            <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">
              Patient not found
            </h2>
            <button
              onClick={() => setCurrentView("list")}
              className="text-blue-500 hover:underline text-sm sm:text-base"
            >
              Back to patient list
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "list") {
    return (
      <div className="flex flex-col flex-1 min-h-0 gap-2 sm:gap-3">
        <PatientsTable
          handleViewPatient={handleViewPatient}
          patients={patients}
        />
      </div>
    );
  }
  const patient = patients?.find((p) => p.userInfo.id === selectedPatient);

  if (currentView === "view") {
    return (
      <PatientDetails
        patient={patient}
        setCurrentView={setCurrentView}
        setSelectedPatient={setSelectedPatient}
      />
    );
  }
};

export default Patients;
