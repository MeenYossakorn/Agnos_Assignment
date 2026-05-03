"use client";
import { useEffect, useState } from "react";
import { socket } from "../lib/socket";


// ---------------- TYPES ----------------
type Patient = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  addressLine1: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  language?: string;
  religion?: string;

  emergencyName?: string;
  emergencyRelation?: string;
  emergencyPhone?: string;
};



type StepData = {
  step: number;
  data: Patient;
};

// ---------------- COMPONENT ----------------
export default function StaffView() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const [activePatients, setActivePatients] = useState<Array<{
  firstName: string;
  lastName: string;
  socketId: string;
}>>([]);
  const [typingPatients, setTypingPatients] = useState<Array<{
  firstName: string;
  lastName: string;
  field: string;
  socketId: string;
}>>([]);
const [stepInfoList, setStepInfoList] = useState<StepData[]>([]);

  // ---------------- SOCKET ----------------
  useEffect(() => {

    // active patients update
    socket.on("active-patients-list", (data) => {
      setActivePatients(data);
      setStepInfoList((prev) =>
      prev.filter((s) =>
        data.some(
          (a: { firstName: string; lastName: string }) =>
           a.firstName === s.data.firstName &&
           a.lastName === s.data.lastName
        )
      )
      );
    });

    // final submit
    socket.on("receive-patient", (data: Patient) => {
      setPatients((prev) => [...prev, data]);
    });

    // typing realtime
    socket.on("typing-patients-list", (data) => {
      setTypingPatients(data);
    });

    // step update
    socket.on("patient-step", (data: StepData) => {
    setStepInfoList((prev) => {
      const exists = prev.findIndex(
        (s) =>
         s.data.firstName === data.data.firstName &&
          s.data.lastName === data.data.lastName
      );
      if (exists !== -1) {
        const updated = [...prev];
        updated[exists] = data;
        return updated;
      }
      return [...prev, data];
   });
  });



    return () => {
      socket.off("patient-step");
      socket.off("active-patients-list");
      socket.off("receive-patient");
      socket.off("typing-patients-list");
    };
  }, []);

    // STATUS_CODES
  if (patients.length === 0 && stepInfoList.length === 0) {
    return <p className="text-gray-500">No patient data yet</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Staff View</h2>

      <div className="space-y-2">
    <p className="text-sm text-gray-500">Active Status</p>

    {activePatients.length > 0 ? (
      <div className="space-y-1">
        {activePatients.map((patient) => (
          <div key={patient.socketId} className="bg-green-100 text-green-800 px-3 py-2 rounded">
            {patient.firstName} {patient.lastName}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-sm text-red-500">No active user</div>
    )}

    <p className="text-sm text-gray-500">Typing Status</p>
    {typingPatients.length > 0 ? (
      <div className="space-y-1">
        {typingPatients.map((patient) => (
          <div key={patient.socketId} className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded">
             <strong>
              {patient.firstName || "Someone"} {patient.lastName || ""}
            </strong>{" "}
            is typing {patient.field && `(${patient.field})`}
          </div>
        ))}
      </div>
    ) : null}

      <p className="text-sm text-gray-500">Info Status</p>
     {stepInfoList.length > 0 &&(
      <div className="space-y-1">
        {stepInfoList.map((info, i) => (
         <div key={`${info.data.firstName}-${info.data.lastName}`} className="bg-blue-100 text-blue-800 px-3 py-2 rounded">
            <strong>
          {info.data.firstName} {info.data.lastName}
        </strong>{" "}
        completed step {info.step}
        </div>
      ))}
      </div>
    )}
    </div>


      {/* ---------------- PATIENT LIST ---------------- */}
      {patients.map((data, index) => (
        <div key={index} className="border-b pb-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p><strong>First Name:</strong> {data.firstName}</p>
            <p><strong>Last Name:</strong> {data.lastName}</p>
            <p><strong>Middle Name:</strong> {data.middleName || "-"}</p>
            <p><strong>Date of Birth:</strong> {data.dob}</p>
            <p><strong>Gender:</strong> {data.gender}</p>
            <p><strong>Phone Number:</strong> {data.phone}</p>
            <p><strong>Email:</strong> {data.email}</p>

            <p className="col-span-2">
              <strong>Address:</strong> {data.addressLine1}, {data.subDistrict}, {data.district}, {data.province}, {data.postalCode}
            </p>
            <p><strong>Religion:</strong> {data.religion || "-"}</p>

            <p className="col-span-2">
              <strong>Emergency:</strong>{" "}
              {data.emergencyName
                ? `${data.emergencyName} (${data.emergencyRelation}) - ${data.emergencyPhone}`
                : "-"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}