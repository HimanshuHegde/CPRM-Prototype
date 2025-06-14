import { useEffect, useState } from "react";
import { getSyncedTokens } from "../services/api";
import type { TokenWithDepartment } from "../types/types";
import { useParams } from "react-router-dom";
import { logout } from "../services/authApi";

const TokenDashboard = () => {
  const { slug } = useParams() as { slug: string };
  const [tokens, setTokens] = useState<TokenWithDepartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const data = await getSyncedTokens({ departmentName: slug });

        // Separate tokens based on status
        const inprogress = data.filter(t => t.status === "inprogress");
        const waiting = data.filter(t => t.status === "waiting").sort((a, b) => a.token_id - b.token_id);
        const called = data.filter(t => t.status === "called");

        // Merge with new order
        const ordered = [...inprogress, ...waiting, ...called];
        setTokens(ordered);
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
    const interval = setInterval(() => {
      fetchTokens();
    }, 5000);

    return () => clearInterval(interval);
  }, [slug]);

  const getCardShadow = (token: TokenWithDepartment): string => {
    if (token.status === "inprogress") {
      return "shadow-green-200 mb-6";
    }

    if (token.status === "waiting") {
      const inProgressExists = tokens.some(t => t.status === "inprogress");
      const waitingTokens = tokens.filter(t => t.status === "waiting");
      const thisWaitingIndex = waitingTokens.findIndex(t => t.token_id === token.token_id);

      if (!inProgressExists && thisWaitingIndex === 0) return "shadow-yellow-200 mb-6";
      if (inProgressExists && thisWaitingIndex === 0) return "shadow-yellow-200 mb-6";
      return "shadow-red-200 mb-4";
    }

    // called
    return "shadow-gray-200 mb-2";
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 border-none"
              onClick={async ()=>{
                  await logout();
                localStorage.removeItem("token");
                window.location.href = "/";
              }}>signout</button>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🩺 Dashboard</h1>

        {loading ? (
          <p className="text-gray-500 text-lg text-center">Loading tokens...</p>
        ) : tokens.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">No synced tokens found.</p>
        ) : (
          <div className="flex-col">
            {tokens.map((token) => (
              <div
                key={token.token_id}
                className={`bg-white border flex justify-between border-gray-200 rounded-2xl p-6 w-[80vw] shadow ${getCardShadow(token)} hover:shadow-lg transition`}
              >
                <p className="text-gray-700 mt-1">
                  <strong>Department:</strong> {token.department?.department_name}
                </p>
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  Token #{token.token_id}
                </h2>
                <p className="text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-sm rounded-full ${
                      token.status === "inprogress"
                        ? "bg-green-100 text-green-700"
                        : token.status === "called"
                        ? "bg-blue-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {token.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenDashboard;
