import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../services/api";
import { logout } from "../services/authApi";



export default function TokenOptions() {
  const [departments, setDepartments] = useState<string[]>([]);
  useEffect(() => {
    (async()=>{
      const data = await getDepartments({});
      setDepartments(data.map((d) => d.department_name));
    })()
  })
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (role: "screen" | "DoctorDashboard" | "TokenOperator") => {
    if (!selectedDepartment) return alert("Please select a department");
    navigate(`/tokens/${role}/${selectedDepartment}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <button className="bg-red-500 text-white px-4 py-2 rounded mr-auto hover:bg-red-600 border-none"
              onClick={async ()=>{
                  await logout();
                localStorage.removeItem("token");
                window.location.href = "/";
              }}>signout</button>
      <h1 className="text-2xl font-bold mb-8">Select Your Role</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Token Screen */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-4">Token Screen</h2>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={() => handleNavigate("screen")}
          >
            Go to Screen
          </button>
        </div>

        {/* Doctor */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-4">Doctor</h2>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
            onClick={() => handleNavigate("DoctorDashboard")}
          >
            Go to Doctor
          </button>
        </div>

        {/* Operator */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-4">Operator</h2>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
            onClick={() => handleNavigate("TokenOperator")}
          >
            Go to Operator
          </button>
        </div>
      </div>
    </div>
  );
}
