
import { useState } from "react";
import { socket } from "..//lib/socket";
import { useLanguage } from "@/context/LanguageContext";

export default function PatientForm() {
  const { lang } = useLanguage();
  const initialForm = {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    nationality: "",
    religion: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const text = {
  en: {
    title: "Patient Form",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    nationality: "Nationality",
    phone: "Phone",
    email: "Email",
    language: "Preferred Language",
    address: "Address",
    religion: "Religion",
    emergency: "Emergency Contact",
    submit: "Submit",
    submitting: "Submitting...",
    errorFirstName: "First name is required",
    errorLastName: "Last name is required",
    errorGender: "Invalid gender",
    errorEmail: "Invalid email format",
    errorPhone: "Phone must be 10 digits",
    errorDob: "Date of Birth is required",
    errorEmergency: "Emergency phone must be 10 digits",
    selectLanguage: "Select Language",
    errorAddress: "Address is required",
    errorLanguage: "Language is required",
    errorReligion: "Religion is required",
    selectGender: "Select Gender",
    english: "English",
    thai: "Thai",
    FillIn: "Please fill in your details ",
    emergencyName: "Emergency Contact Name",
    emergencyRelation: "Relationship",
    emergencyPhone: "Emergency Phone",
    
  },
  th: {
    title: "แบบฟอร์มผู้ป่วย",
    firstName: "ชื่อ",
    middleName: "ชื่อกลาง",
    lastName: "นามสกุล",
    gender: "เพศ",
    male: "ชาย",
    female: "หญิง",
    other: "อื่นๆ",
    nationality: "สัญชาติ",
    phone: "เบอร์โทร",
    email: "อีเมล",
    language: "ภาษาที่ใช้",
    address: "ที่อยู่",
    religion: "ศาสนา",
    emergency: "ข้อมูลติดต่อฉุกเฉิน",
    submit: "ยืนยัน",
    submitting: "กำลังส่ง...",
    errorFirstName: "กรุณากรอกชื่อ",
    errorLastName: "กรุณากรอกนามสกุล",
    errorGender: "กรุณาเลือกเพศให้ถูกต้อง",
    errorEmail: "รูปแบบอีเมลไม่ถูกต้อง",
    errorPhone: "กรุณากรอกเบอร์ 10 หลัก",
    errorDob: "กรุณากรอก วัน/เดือน/ปี ที่เกิด",
    errorEmergency: "เบอร์ฉุกเฉินต้องเป็น 10 หลัก",
    errorAddress: "กรุณากรอกที่อยู่",
    errorLanguage: "กรุณาเลือกภาษาที่ใช้",
    errorReligion: "กรุณากรอกศาสนา",
    selectLanguage: "กรุณาเลือกภาษา",
    selectGender: "กรุณาเลือกเพศ",
    english: "ภาษาอังกฤษ",
    thai: "ภาษาไทย",
    FillIn: "กรุณากรอกข้อมูลของคุณ",
    emergencyName: "ชื่อผู้ติดต่อฉุกเฉิน",
    emergencyRelation: "ความสัมพันธ์",
    emergencyPhone: "เบอร์โทรฉุกเฉิน",
  },
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validate = () => {
  if (!form.firstName) {
    return text[lang].errorFirstName;
  }

  if (!form.lastName) {
    return text[lang].errorLastName;
  }

  if (!form.gender || !form.gender.match(/^(Male|Female|Other)$/)) {
    return text[lang].errorGender;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    return text[lang].errorEmail;
  }

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(form.phone)) {
    return text[lang].errorPhone;
  }

  if (form.emergencyPhone && !phoneRegex.test(form.emergencyPhone)) {
  return text[lang].errorEmergency;
  }

  if (!form.dob) {
    return text[lang].errorDob;
  }

  if (!form.address) {
    return text[lang].errorAddress;
  }

  if (!form.language) {
    return text[lang].errorLanguage;
  }

  if (!form.religion) {
    return text[lang].errorReligion;
  }



  return null;
};
  
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    
    socket.emit("new-patient", form);

    
    setTimeout(() => {
      setForm(initialForm);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {/* <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl"> */}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl">
          <h2 className="text-xl mb-4">Patient Form</h2>

        {error && (
        <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}

      <div className="grid grid-cols-2 gap-4">

        <label htmlFor="firstName" className="block text-sm mb-1">
          {text[lang].firstName}
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder={text[lang].FillIn} className="input" />
        </label>

        <label htmlFor="middleName" className="block text-sm mb-1">
          {text[lang].middleName}
        <input name="middleName" value={form.middleName} onChange={handleChange} placeholder={text[lang].FillIn} className="input" />
        </label>

        <label htmlFor="lastName" className="block text-sm mb-1">
          {text[lang].lastName}
          <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder={text[lang].FillIn} className="input"/>
        </label>



        <label htmlFor="dob" className="block text-sm mb-1">
             {lang === "en" ? "Date of Birth" : "วันเกิด"}
             <input name="dob" type="date" value={form.dob} onChange={handleChange} className="input col-span-2"/>
        </label>
        
        <label  className="block text-sm mb-1">
            {text[lang].gender}
        <select name="gender" value={form.gender} onChange={handleChange} className="input">
          <option value="">{text[lang].selectGender}</option>
          <option value="Male">{text[lang].male}</option>
          <option value="Female">{text[lang].female}</option>
          <option value="Other">{text[lang].other}</option>
          </select>
        </label>
          
          <label  className="block text-sm mb-1">
            {text[lang].nationality}
          <input name="nationality" value={form.nationality} onChange={handleChange} placeholder={text[lang].FillIn} className="input" />
          </label>
          
          <label  className="block text-sm mb-1">
            {text[lang].phone}
          <input name="phone" value={form.phone} onChange={handleChange} placeholder={text[lang].FillIn} className="input" inputMode="numeric" pattern="[0-9]*" />
          </label>

          <label  className="block text-sm mb-1">
            {text[lang].email}
          <input name="email"  value={form.email} onChange={handleChange} placeholder={text[lang].FillIn} className="input" type="email" required  />
          </label>



          <label className="flex flex-col text-sm mb-2">{text[lang].language}
          <select name="language" value={form.language} onChange={handleChange} className="input mt-1">
            <option value="">{text[lang].selectLanguage}</option>
            <option value="th">{text[lang].thai}</option>
            <option value="en">{text[lang].english}</option>
           </select>
          </label>

          <label className="flex flex-col text-sm mb-2">
             {text[lang].address}
             <textarea name="address" value={form.address} onChange={handleChange} placeholder={text[lang].FillIn} className="input"/>
          </label>

          <label className="flex flex-col  text-sm mb-1">
            {text[lang].religion}
          <input name="religion" value={form.religion} onChange={handleChange} placeholder={text[lang].FillIn} className="input" />
          </label>

          <div className="col-span-2">
    <p className="text-sm mb-1">{text[lang].emergency}</p>

  <div className="grid grid-cols-3 gap-2">
    <input
      name="emergencyName"
      value={form.emergencyName}
      onChange={handleChange}
      placeholder={text[lang].emergencyName}
      className="input"
    />
  

    <input
      name="emergencyRelation"
      value={form.emergencyRelation}
      onChange={handleChange}
      placeholder={text[lang].emergencyRelation}
      className="input"
    />

    <input
      name="emergencyPhone"
      value={form.emergencyPhone}
      onChange={handleChange}
      placeholder={text[lang].emergencyPhone}
      className="input"
    />
  </div>
</div>

      </div>

      <button disabled={loading} className={`mt-4 px-4 py-2 rounded text-white transition 
      ${ loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
    >
          {loading ? "Submitting..." :  text[lang].submit}
        </button>
    </form>
    </div>
    // </div>
  );
}