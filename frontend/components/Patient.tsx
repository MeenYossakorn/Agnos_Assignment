import { useState } from "react";
import { socket } from "../lib/socket";

export default function PatientForm({ onSubmit }) {
  const [form, setForm] = useState({
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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {/* <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl"> */}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl">
          <h2 className="text-xl mb-4">Patient Form</h2>

      <div className="grid grid-cols-2 gap-4">
        <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" />
        <input name="middleName" placeholder="Middle Name" onChange={handleChange} className="input" />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" />
        <input name="dob" type="date" onChange={handleChange} className="input" />

        <select name="gender" onChange={handleChange} className="input">
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="nationality" placeholder="Nationality" onChange={handleChange} className="input" />

        <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
        <input name="email" placeholder="Email" onChange={handleChange} className="input" />

        <input name="language" placeholder="Preferred Language" onChange={handleChange} className="input col-span-2" />

        <textarea name="address" placeholder="Address" onChange={handleChange} className="input col-span-2" />

        <input name="religion" placeholder="Religion" onChange={handleChange} className="input" />
        <input name="emergency" placeholder="Emergency Contact" onChange={handleChange} className="input" />
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
    </div>
    // </div>
  );
}