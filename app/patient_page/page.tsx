"use client";
import { useState } from "react";
import PatientForm from "../../frontend/components/Patient";
import StaffView from "../../frontend/components/Staff";

export default function PatientPage() {
  return (
    <div className="p-10">
      <PatientForm />
    </div>
  );
}
