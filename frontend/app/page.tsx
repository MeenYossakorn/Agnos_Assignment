"use client";
import { useState } from "react";
import PatientForm from "../components/Patient";
import StaffView from "../components/Staff";

export default function Home() {
  const [patientData, setPatientData] = useState(null);

  return (
    <div >
      <PatientForm onSubmit={setPatientData} />
      <StaffView data={patientData} />
    </div>
  );
}