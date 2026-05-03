"use client";
import { useState } from "react";
import PatientForm from "../../frontend/components/Patient";
import StaffView from "../../frontend/components/Staff";
import LanguageSwitcher from "@/frontend/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function PatientPage() {
  const { lang } = useLanguage();
  return (
    <div className="p-10">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      <PatientForm />
    </div>
  );
}
