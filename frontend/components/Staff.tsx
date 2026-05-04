"use client";
import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { useLanguage } from "@/context/LanguageContext";


const text = {
  en: {
    firstName: "First Name :",
    middleName: "Middle Name :",
    lastName: "Last Name :",
    dob: "Date of Birth :",
    gender: "Gender :",
    phone: "Phone Number :",
    email: "Email :",
    nationality: "Nationality :",
    activeStatus: "Active Status :",
    typingStatus: "Typing Status :",
    infoStatus: "Info Status :",
    noActiveUser: "No active user",
    isTyping: "is typing",
    completedStep: "completed step",
    noPatientData: "No patient data yet",
    addressLine1: "Address :",
    religion: "Religion :",
    emergency: "Emergency :",
  },
  th: {
    firstName: "ชื่อ :",
    middleName: "ชื่อกลาง :",
    lastName: "นามสกุล :",
    dob: "วันเกิด :", 
    gender: "เพศ :",
    phone: "เบอร์โทร :",
    email: "อีเมล :",
    nationality: "สัญชาติ :",
    addressLine1: "ที่อยู่ :",
    religion: "ศาสนา :",
    activeStatus: "สถานะผู้ใช้งาน :",
    typingStatus: "สถานะการพิมพ์ :",
    infoStatus: "สถานะข้อมูล :",
    noActiveUser: "ไม่มีผู้ใช้งานขณะนี้",
    isTyping: "กำลังพิมพ์",
    completedStep: "ทำขั้นตอนที่",
    noPatientData: "ยังไม่มีข้อมูลผู้ป่วย",
    emergency: "ฉุกเฉิน :",
    
  },
};



// TYPES 
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
  nationality: string,

  emergencyName?: string;
  emergencyRelation?: string;
  emergencyPhone?: string;
};



type StepData = {
  step: number;
  data: Patient;
};

//  COMPONENT 
export default function StaffView() {
  const { lang } = useLanguage();          // ← เพิ่ม
  const t = text[lang as "en" | "th"];

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



  //  SOCKET 
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
  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="bg-white p-5 sm:p-10 mx-0 sm:m-8 rounded-xl shadow space-y-4">
       <h2 className="text-xl font-semibold text-[#1C60BF]">Staff View</h2> 
      <p className="text-gray-500">{t.noPatientData}</p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
    <div className="bg-white p-5 sm:p-10 mx-0 sm:m-8 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-[#1C60BF]">Staff View</h2>

      <div className="space-y-2">
    <p className="text-sm text-gray-500">{t.activeStatus}</p>

    {activePatients.length > 0 ? (
      <div className="space-y-1">
        {activePatients.map((patient) => (
          <div key={patient.socketId} className="bg-green-100 text-green-800 px-3 py-2 rounded">
            {patient.firstName} {patient.lastName}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-sm text-red-500">{t.noActiveUser}</div>
    )}

    <p className="text-sm text-gray-500">{t.typingStatus}</p>
    {typingPatients.length > 0 ? (
      <div className="space-y-1">
        {typingPatients.map((patient) => (
          <div key={patient.socketId} className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded">
             <strong>
              {patient.firstName || "Someone"} {patient.lastName || ""}
            </strong>{" "}
            {t.isTyping} {patient.field && `(${patient.field})`}
          </div>
        ))}
      </div>
    ) : null}

      <p className="text-sm text-gray-500">{t.infoStatus}</p>
     {stepInfoList.length > 0 &&(
      <div className="space-y-1">
        {stepInfoList.map((info, i) => (
         <div key={`${info.data.firstName}-${info.data.lastName}`} className="bg-blue-100 text-blue-800 px-3 py-2 rounded">
            <strong>
          {info.data.firstName} {info.data.lastName}
        </strong>{" "}
        {t.completedStep} {info.step}
        </div>
      ))}
      </div>
    )}
    </div>


      
       {/* PATIENT LIST */}
      {patients.map((data, index) => (
        
        <div key={index} className="border-b pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <p><strong>{t.firstName}</strong> {data.firstName}</p>
            <p><strong>{t.lastName}</strong> {data.lastName}</p>
            <p><strong>{t.middleName}</strong> {data.middleName || "-"}</p>
            <p><strong>{t.dob}</strong> {data.dob}</p>
            <p><strong>{t.gender}</strong> {data.gender}</p>
            <p><strong>{t.phone}</strong> {data.phone}</p>
            <p><strong>{t.email}</strong> {data.email}</p>

            <p className="sm:col-span-2">
              <strong>{t.addressLine1}</strong> {data.addressLine1}, {data.subDistrict}, {data.district}, {data.province}, {data.postalCode}
            </p>
            <p><strong>{t.religion}</strong> {data.religion || "-"}</p>
            <p><strong>{t.nationality}</strong> {data.nationality || "-"}</p>

            <p className="sm:col-span-2">
              <strong>{t.emergency}</strong>{" "}
              {data.emergencyName
                ? `${data.emergencyName} (${data.emergencyRelation}) - ${data.emergencyPhone}`
                : "-"}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}