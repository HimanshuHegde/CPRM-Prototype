import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSyncedTokens, addTokens, deleteTokens, getDepartments } from "../services/api";
import type { TokenWithDepartment } from "../types/types";
import { logout } from "../services/authApi";
// import type { Department } from "../../backend/generated/prisma";

const OperatorDashboard = () => {
  const { departmentSlug } = useParams<{ departmentSlug: string }>();
  const [departmentId, setDepartmentId] = useState<number | undefined>(undefined);
  const [patientName, setPatientName] = useState("");
  const [tokens, setTokens] = useState<TokenWithDepartment[]>([]);

  const fetchDepartment = async () => {
    
    const departments = await getDepartments({department_name: departmentSlug});
    setDepartmentId(departments[0].dept_id);
  };

  const fetchTokens = async () => {
    if (!departmentSlug) return;
    const data = await getSyncedTokens({ departmentName: departmentSlug.replace(/-/g, " ") });
    setTokens(data);
  };

  useEffect(() => {
    fetchDepartment();
    fetchTokens();
  }, [departmentSlug]);

  const handleAddToken = async () => {
    if (!departmentId || !patientName ) return alert("Fill all fields");
    const res = await addTokens({ departmentId, patient_name: patientName });
    if (res.status === 200) {
      setPatientName("");
      fetchTokens();
    } else {
      alert("Failed to add token");
    }
  };

  const handleDelete = async (token_id: number) => {
    await deleteTokens({ token_id });
    fetchTokens();
  };

  const handleDeleteCalled = async () => {
    await deleteTokens({ status: "called", departmentId });
    fetchTokens();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokens();
    }, 5000); // fetch every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 border-none"
              onClick={async ()=>{
                  await logout();
                localStorage.removeItem("token");
                window.location.href = "/";
              }}>signout</button>
      <h1 className="text-3xl font-bold mb-4 text-center capitalize">{departmentSlug} Operator Dashboard</h1>

      {/* Form Section */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Token</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            className="w-full border px-3 py-2 rounded"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddToken}
          >
            Add Token
          </button>

          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDeleteCalled}
          >
            Delete All Called Tokens
          </button>
        </div>
      </div>

      {/* Display Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Tokens</h2>
        <div className="bg-white p-4 rounded-md shadow-md">
          {tokens.length === 0 ? (
            <p className="text-gray-500">No tokens</p>
          ) : (
            <ul className="space-y-2">
              {tokens
                .sort((a, b) => {
                  const priority: Record<string, number> = {
                    inprogress: 0,
                    waiting: 1,
                    called: 2,
                  };
                  return priority[a.status] - priority[b.status];
                })
                .map((token, index, arr) => {
                  let bgColor = "bg-gray-100";
                  if (token.status === "waiting") {
                    const waitingTokens = arr.filter(t => t.status === "waiting");
                    if (waitingTokens[0]?.token_id === token.token_id) bgColor = "bg-yellow-100";
                    else bgColor = "bg-red-100";
                  } else if (token.status === "inprogress") {
                    bgColor = "bg-green-100";
                  }

                  return (
                    <li
                      key={token.token_id}
                      className={`flex justify-between items-center p-2 rounded ${bgColor}`}
                    >
                      <span>
                        #{token.token_id} - {token.patient_name}
                      </span>
                      <div className="flex gap-2">
                        <span className="text-sm text-gray-500">{token.status}</span>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(token.token_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
