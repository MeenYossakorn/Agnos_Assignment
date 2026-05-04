"use client";
import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useLanguage } from "@/context/LanguageContext";


export default function PatientForm() {
  const { lang } = useLanguage();

  //  state
  const [step, setStep] = useState(1);

  const initialForm = {
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    religion: "",
    nationality: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    addressLine1: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  //  Text mapping
  const text = {
  en: {
    step: "Step",
    next: "Next",
    back: "Back",
    title: "Patient Form",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    nationality: "Nationality",
    dob: "Date of Birth",
    phone: "Phone",
    email: "Email",
    
    religion: "Religion",
    emergency: "Emergency Contact",
    emergencyName: "Emergency Contact Name",
    emergencyRelation: "Relationship",
    emergencyPhone: "Emergency Phone",
    submit: "Submit",
    submitting: "Submitting...",
    errorFirstName: "First name is required",
    errorLastName: "Last name is required",
    errorGender: "Invalid gender",
    errorEmail: "Invalid email format",
    errorPhone: "Phone must be 10 digits",
    errorDob: "Date of Birth is required",
    selectLanguage: "Select Language",
    errorAddressLine1: "Address is required",
    errorLanguage: "Language is required",
    errorReligion: "Religion is required",
    errorNationality: "Nationality is required",
    errorSubDistrict: "Sub-district is required",
    errorDistrict: "District is required",
    errorProvince: "Province is required",
    errorPostalCode: "Postal Code is required",
    selectGender: "Select Gender",
    english: "English",
    thai: "Thai",
    FillIn: "Please fill in your details ",
    FillInOption: "Please fill in your details (optional)",
    addressLine1: "Address (House No., Village, Alley)",
    subDistrict: "Sub-district",
    district: "District",
    province: "Province",
    postalCode: "Postal Code",
    
    
  },
  th: {
    step: "ขั้นตอน",
    next: "ถัดไป",
    back: "ย้อนกลับ",
    title: "แบบฟอร์มผู้ป่วย",
    firstName: "ชื่อ",
    middleName: "ชื่อกลาง",
    lastName: "นามสกุล",
    gender: "เพศ",
    male: "ชาย",
    female: "หญิง",
    other: "อื่นๆ",
    nationality: "สัญชาติ",
    dob: "วันที่เกิด",
    phone: "เบอร์โทร",
    email: "อีเมล",
    address: "ที่อยู่",
    religion: "ศาสนา",
    emergency: "ข้อมูลติดต่อฉุกเฉิน",
    emergencyName: "ชื่อผู้ติดต่อฉุกเฉิน",
    emergencyRelation: "ความสัมพันธ์",
    emergencyPhone: "เบอร์โทรฉุกเฉิน",
    submit: "ยืนยัน",
    submitting: "กำลังส่ง...",
    errorFirstName: "กรุณากรอกชื่อ",
    errorLastName: "กรุณากรอกนามสกุล",
    errorGender: "กรุณาเลือกเพศให้ถูกต้อง",
    errorEmail: "รูปแบบอีเมลไม่ถูกต้อง",
    errorPhone: "กรุณากรอกเบอร์ 10 หลัก",
    errorDob: "กรุณากรอก เดือน/วัน/ปี ที่เกิด",
    errorAddressLine1: "กรุณากรอกที่อยู่",
    errorLanguage: "กรุณาเลือกภาษาที่ใช้",
    errorReligion: "กรุณากรอกศาสนา",
    errorNationality: "กรุณากรอกสัญชาติ",
    errorSubDistrict: "กรุณากรอกตำบล",
    errorDistrict: "กรุณากรอกอำเภอ",
    errorProvince: "กรุณากรอกจังหวัด",
    errorPostalCode: "กรุณากรอกรหัสไปรษณีย์",
    selectLanguage: "กรุณาเลือกภาษา",
    selectGender: "กรุณาเลือกเพศ",
    english: "ภาษาอังกฤษ",
    thai: "ภาษาไทย",
    FillIn: "กรุณากรอกข้อมูลของคุณ",
    FillInOption: "กรุณากรอกข้อมูลของคุณ (ไม่บังคับ)",
    addressLine1: "ที่อยู่ (บ้านเลขที่, หมู่บ้าน, ซอย)",
    subDistrict: "ตำบล",
    district: "อำเภอ",
    province: "จังหวัด",
    postalCode: "รหัสไปรษณีย์",
    
    
  },
};

  //  HANDLERS 
  const handleChange = (e: any) => {
  const { name, value } = e.target;
  const updatedForm = { ...form, [name]: value };
  setForm(updatedForm);
  setError("");

  // ยิง event realtime
  if (name === "firstName" || name === "lastName") {
    socket.emit("patient-active", {
      firstName: updatedForm.firstName,
      lastName: updatedForm.lastName,
    });
  }

  socket.emit("patient-typing", {
    firstName: updatedForm.firstName,
    lastName: updatedForm.lastName,
    field: name,
  });

  // debounce stop typing
  clearTimeout((window as any).typingTimeout);
  (window as any).typingTimeout = setTimeout(() => {
    socket.emit("patient-stop-typing");
  }, 1000);
};

  //  VALIDATION 
  const validateStep = () => {
  const phoneRegex = /^[0-9]{10}$/;

  if (step === 1) {
    if (!form.firstName) return text[lang].errorFirstName;
    if (!form.lastName) return text[lang].errorLastName;
  }

  if (step === 2) {
    if (!form.dob) return text[lang].errorDob;
    if (!form.gender) return text[lang].errorGender;
    if (!form.nationality) return text[lang].errorNationality;
    if (!form.religion) return text[lang].errorReligion;
    if (!phoneRegex.test(form.phone)) return text[lang].errorPhone;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) return text[lang].errorEmail;
    if (!emailRegex.test(form.email)) return text[lang].errorEmail;
  }

  if (step === 3) {

    if (!form.addressLine1.trim()) return text[lang].errorAddressLine1;
    if (!form.subDistrict.trim()) return text[lang].errorSubDistrict;
    if (!form.district.trim()) return text[lang].errorDistrict;
    if (!form.province.trim()) return text[lang].errorProvince;
    if (!form.postalCode.trim()) return text[lang].errorPostalCode;
    if (form.emergencyPhone && !phoneRegex.test(form.emergencyPhone)) 
    return text[lang].errorPhone;
  }

  return null;
};


  

  //  NAVIGATION 
  const nextStep = () => {
  const err = validateStep();
  if (err) return setError(err);

  setError("");


  socket.emit("patient-step", {
    step: step,
    data: form,
  });

  setStep(step + 1);
};

  const prevStep = () => setStep(step - 1);

  //  SUBMIT 
  const handleSubmit = (e: any) => {
  e?.preventDefault();

  const err = validateStep(); 
  if (err) {
    setError(err);
    return;
  }

  setError("");
  setLoading(true);

  socket.emit("new-patient", form);

  setTimeout(() => {
    setForm(initialForm);
    setStep(1); 
    setLoading(false);
  }, 500);
};

  //  User interface 
  return (
    <div className="flex justify-center items-start sm:items-center min-h-screen bg-gray-100 px-4 py-6 sm:py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-xl w-full max-w-xl shadow">

        {/* Progress */}
        <p className="mb-4 text-xl text-[#1C60BF] font-semibold">
          {text[lang].step} {step} / 3
        </p>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* STEP 1 */}
        {step === 1 && (
          
          <>
          <div className="mb-4">
            <p >แบบฟอร์มนี้ใช้สำหรับกรอกข้อมูลผู้ป่วย เพื่อใช้ในการลงทะเบียนและจัดเก็บข้อมูลทางการแพทย์ กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง</p>
          </div>
          <label htmlFor="firstName" className="block text-sm mb-1">
            {text[lang].firstName}
            <input
              name="firstName"
              placeholder={text[lang].FillIn}
              value={form.firstName}
              onChange={handleChange}
              className="input w-full mb-2"
            />
            </label>

            <label htmlFor="middleName" className="block text-sm mb-1">
              {text[lang].middleName}
            <input
              name="middleName"
              placeholder={text[lang].FillInOption}
              value={form.middleName}
              onChange={handleChange}
              className="input mb-2"
            />
            </label>
            
            <label htmlFor="lastName" className="block text-sm mb-1">
              {text[lang].lastName}
            <input
              name="lastName"
              placeholder={text[lang].FillIn}
              value={form.lastName}
              onChange={handleChange}
              className="input"
            />
            </label>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="mb-4">
              <p >แบบฟอร์มนี้ใช้สำหรับกรอกข้อมูลผู้ป่วย เพื่อใช้ในการลงทะเบียนและจัดเก็บข้อมูลทางการแพทย์ กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง</p>
            </div>
            <label htmlFor="dob" className="block text-sm mb-1">
              {text[lang].dob}
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="input mb-2"
            />
            </label>

            <label htmlFor="gender" className="block text-sm mb-1">
              {text[lang].gender}
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input mb-2"
            >
              <option value="">{text[lang].selectGender}</option>
              <option value="Male">{text[lang].male}</option>
              <option value="Female">{text[lang].female}</option>
              <option value="Other">{text[lang].other}</option>
            </select>
            </label>

            <label htmlFor="nationality" className="block text-sm mb-1">
              {text[lang].nationality}
            <input
              name="nationality"
              placeholder={text[lang].FillIn}
              value={form.nationality}
              onChange={handleChange}
              className="input mb-2"
            />
            </label>

            <label htmlFor="religion" className="block text-sm mb-1">
              {text[lang].religion}
            <input
              name="religion"
              placeholder={text[lang].FillIn}
              value={form.religion}
              onChange={handleChange}
              className="input mb-2"
            />
            </label>

            <label htmlFor="phone" className="block text-sm mb-1">
              {text[lang].phone}
            <input
              name="phone"
              placeholder={text[lang].FillIn}
              value={form.phone}
              onChange={handleChange}
              className="input mb-2"
            />
            </label>

            <label htmlFor="email" className="block text-sm mb-1">
              {text[lang].email}
            <input
              name="email"
              placeholder={text[lang].FillIn}
              value={form.email}
              onChange={handleChange}
              className="input"
              
            />
            </label>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="space-y-4">
              <div className="mb-4">
                <p >แบบฟอร์มนี้ใช้สำหรับกรอกข้อมูลผู้ป่วย เพื่อใช้ในการลงทะเบียนและจัดเก็บข้อมูลทางการแพทย์ กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง</p>
              </div>
              {/* Address Line 1 */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].addressLine1}
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder={text[lang].errorAddressLine1}
                  value={form.addressLine1}
                  onChange={handleChange}
                  className="input mb-2 w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].subDistrict}
                </label>
                <input
                  name="subDistrict"
                  placeholder={text[lang].errorSubDistrict}
                  value={form.subDistrict}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].district}
                </label>
                <input
                  name="district"
                  placeholder={text[lang].errorDistrict}
                  value={form.district}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].province}
                </label>
                <input
                  name="province"
                  placeholder={text[lang].errorProvince}
                  value={form.province}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].postalCode}
                </label>
                <input
                  name="postalCode"
                  placeholder={text[lang].errorPostalCode}
                  value={form.postalCode}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              
              
              {/* Emergency Name */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].emergencyName}
                </label>
                <input
                  name="emergencyName"
                  placeholder={text[lang].FillInOption}
                  value={form.emergencyName}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              {/* Emergency Relation */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].emergencyRelation}
                </label>
                <input
                  name="emergencyRelation"
                  placeholder={text[lang].FillInOption}
                  value={form.emergencyRelation}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              {/* Emergency Phone */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  {text[lang].emergencyPhone}
                </label>
                <input
                  name="emergencyPhone"
                  placeholder={text[lang].FillInOption}
                  value={form.emergencyPhone}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

            </div>
          </>
        )}

        <div className="flex justify-between mt-6 gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-lg bg-[#1C60BF] text-white hover:bg-[#174EA6] transition hover:scale-105 hover:-translate-y-0.5  duration-200"
            >
              {text[lang].back}
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 rounded-lg bg-[#1C60BF] text-white hover:bg-[#174EA6] transition hover:scale-105 hover:-translate-y-0.5  duration-200"
            >
              {text[lang].next}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-[#1C60BF] text-white hover:bg-[#174EA6]  transition hover:scale-105 hover:-translate-y-0.5  duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? text[lang].submitting : text[lang].submit}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}