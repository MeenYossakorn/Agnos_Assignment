export default function StaffView({ data }) {
  if (!data) {
    return <p className="text-gray-500">No patient data yet</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl mb-4">Staff View</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>First Name:</strong> {data.firstName}</p>
        <p><strong>Middle Name:</strong> {data.middleName || "-"}</p>
        <p><strong>Last Name:</strong> {data.lastName}</p>
        <p><strong>DOB:</strong> {data.dob}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Nationality:</strong> {data.nationality}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p className="col-span-2"><strong>Address:</strong> {data.address}</p>
        <p><strong>Language:</strong> {data.language}</p>
        <p><strong>Religion:</strong> {data.religion || "-"}</p>
        <p><strong>Emergency:</strong> {data.emergency || "-"}</p>
      </div>
    </div>
  );
}