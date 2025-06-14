import { useCallback, useEffect, useState } from "react";
import { getSyncedTokens, deleteTokens, updateTokens } from "../services/api";
import { logout } from "../services/authApi";
import { useParams } from "react-router-dom";

const DoctorDashboard = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [onBreak, setOnBreak] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const {slug} = useParams();
 


  const fetchTokens = async () => {
    const data = await getSyncedTokens({departmentName: slug});
    setTokens(data);
    setInitialLoadComplete(true); // Ensure promotion only runs after first fetch
  };

  const promoteNextWaiting = useCallback(async () => {
    const nextWaiting = tokens
      .filter((t) => t.status === "waiting")
      .sort((a, b) => a.token_id - b.token_id)[0];

    if (nextWaiting) {
      await updateTokens({
        token_id: nextWaiting.token_id,
        status: "inprogress",
      });
      fetchTokens();
    }
  }, [tokens]);

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    if (initialLoadComplete && !onBreak) {
      const inProgress = tokens.find((t) => t.status === "inprogress");
      if (!inProgress) {
        promoteNextWaiting();
      }
    }
  }, [tokens, onBreak, initialLoadComplete, promoteNextWaiting]);

  const handleDone = async (tokenId: number) => {
    await deleteTokens({ token_id: tokenId });
    await fetchTokens();
  };

  const handleCalled = async (tokenId: number) => {
    await updateTokens({ token_id: tokenId, status: "called" });
    await fetchTokens();
  };

  const handleTakeBreak = async () => {
    const updates = tokens
      .filter((t) => t.status === "inprogress")
      .map((t) =>
        updateTokens({
          token_id: t.token_id,
          status: "waiting",
        })
      );

    await Promise.all(updates);
    setOnBreak(true);
    fetchTokens();
  };

  const handleEndBreak = async () => {
    setOnBreak(false);
    await fetchTokens(); // Promote will happen in useEffect
  };

  const inProgress = tokens.find((t) => t.status === "inprogress");
  const waiting = tokens
    .filter((t) => t.status === "waiting")
    .sort((a, b) => a.token_id - b.token_id);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTokens();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-[80%] hover:bg-red-600 border-none"
        onClick={async () => {
          await logout();
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Sign out
      </button>
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      {/* Current Patient */}
      <div className="max-w-xl mx-auto mb-6 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Current Patient</h2>
        {inProgress ? (
          <div>
            <p className="text-lg mb-2">
              #{inProgress.token_id} - {inProgress.patient_name}
            </p>
            <div className="space-x-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleDone(inProgress.token_id)}
              >
                Done
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => handleCalled(inProgress.token_id)}
              >
                Called
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No patient in progress</p>
        )}
      </div>

      {/* Waiting Patients */}
      <div className="max-w-xl mx-auto mb-6 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Waiting Patients</h2>
        {waiting.length === 0 ? (
          <p className="text-gray-500">No patients waiting</p>
        ) : (
          <ul className="space-y-2 text-left">
            {waiting.map((token) => (
              <li
                key={token.token_id}
                className="flex justify-between border-b py-1"
              >
                <span>
                  #{token.token_id} - {token.patient_name}
                </span>
                <span className="text-sm text-gray-500">{token.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Break Controls */}
      <div className="text-center">
        {onBreak ? (
          <button
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            onClick={handleEndBreak}
          >
            End Break
          </button>
        ) : (
          <button
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
            onClick={handleTakeBreak}
          >
            Take Break
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
