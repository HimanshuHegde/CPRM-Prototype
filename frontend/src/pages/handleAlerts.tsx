import { useEffect, useState } from "react";
import { alertGet, alertUpdate, alertCreate, getDepartments } from "../services/api";

const HandleAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [newCodeType, setNewCodeType] = useState("Code Blue");
  const [departmentId, setDepartmentId] = useState<number>(0); 
  const [departments, setDepartments] = useState<any[]>([]);

  const fetchAlerts = async () => {
    const res = await alertGet({});
    setAlerts(res);
  };

  const updateStatus = async (alert_id: number, newStatus: string) => {
    await alertUpdate({ alert_id, status: newStatus });
    fetchAlerts();
  };

  const handleAddAlert = async () => {
    if (!departmentId) return alert("Select department");
    const timestamp = new Date().toISOString();
    await alertCreate({
      code_type: newCodeType,
      status: "Active",
      departmentId,
      timestamp,
    });
    fetchAlerts();
  };

  useEffect(() => {
    fetchAlerts();
    const fetchDepartments = async () => {
      const departments = await getDepartments({});
      setDepartments(departments);
    };
    fetchDepartments();
  }, []);

  // Helper to get row background color based on code
  const getRowColor = (code: string) => {
    switch (code) {
      case "Code Red":
        return "bg-red-100";
      case "Code Blue":
        return "bg-blue-100";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Handle Emergency Alerts</h1>

      {/* Alert Form */}
      <div className="mb-6 p-4 border border-gray-300 rounded">
        <h2 className="text-xl font-semibold mb-2">Add New Alert</h2>
        <div className="flex gap-4 flex-wrap">
          <select
            className="border p-2 rounded"
            value={newCodeType}
            onChange={(e) => setNewCodeType(e.target.value)}
          >
            <option>Code Blue</option>
            <option>Code Red</option>
          </select>
          <select
            className="border p-2 rounded"
            value={departmentId}
            onChange={(e) => setDepartmentId(Number(e.target.value))}
          >
            <option value={0}>Select Department</option>
            {departments.map((department) => (
              <option key={department.dept_id} value={department.dept_id}>
                {department.department_name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddAlert}
          >
            Add Alert
          </button>
        </div>
      </div>

      {/* Active Alerts Table */}
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Code</th>
            <th className="p-2">Department</th>
            <th className="p-2">Status</th>
            <th className="p-2">Timestamp</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts
            .filter((alert) => alert.status !== "Cleared")
            .map((alert) => (
              <tr
                key={alert.alert_id}
                className={`border-t text-center ${getRowColor(alert.code_type)}`}
              >
                <td className="p-2 font-semibold">{alert.code_type}</td>
                <td className="p-2">{alert.department?.department_name}</td>
                <td className="p-2">{alert.status}</td>
                <td className="p-2">
                  {new Date(alert.timestamp).toLocaleString()}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => updateStatus(alert.alert_id, "Active")}
                  >
                    Activate
                  </button>
                  <button
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                    onClick={() => updateStatus(alert.alert_id, "Cleared")}
                  >
                    Clear
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HandleAlerts;
