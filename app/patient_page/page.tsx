"use client";
import { useState } from "react";
import PatientForm from "@/frontend/components/patient";
import StaffView from "../../frontend/components/Staff";
import LanguageSwitcher from "@/frontend/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function PatientPage() {
  const { lang } = useLanguage();
  return (
    <div >
      <PatientForm />
    </div>
  );
}
