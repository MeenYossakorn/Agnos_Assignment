
import { useState } from "react";
import { socket } from "../lib/socket";

export default function PatientForm() {
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
    emergency: "",
    religion: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validate = () => {
    if (!form.firstName || !form.lastName) {
      return "จำเป็นต้องกรอกชื่อและนามสกุลให้ครบถ้วน";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "รูปแบบ Email ไม่ถูกต้อง";
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(form.phone)) {
      return "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก (ตัวเลขเท่านั้น)";
    }

    if (form.emergency && !phoneRegex.test(form.emergency)) {
      return "เบอร์ฉุกเฉินต้องเป็นตัวเลข 10 หลัก";
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
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input" />
        <input name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle Name" className="input" />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="input" />
        <input name="dob" value={form.dob} type="date" onChange={handleChange} className="input" />

        <select name="gender" value={form.gender} onChange={handleChange} className="input">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

        <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Nationality" className="input" />

          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" inputMode="numeric" pattern="[0-9]*" />
          <input name="email"  value={form.email} onChange={handleChange} placeholder="Email" className="input" type="email" required  />

          <input name="language" value={form.language} onChange={handleChange} placeholder="Preferred Language" className="input col-span-2" />

          <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input col-span-2" />

          <input name="religion" value={form.religion} onChange={handleChange} placeholder="Religion" className="input" />
          <input name="emergency" value={form.emergency} onChange={handleChange} placeholder="Emergency Contact" className="input" />

      </div>

      <button
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
    </form>
    </div>
    // </div>
  );
}