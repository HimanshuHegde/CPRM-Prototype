// pages/alerts.tsx
import { useEffect, useState } from "react";
import { alertGet } from "../services/api";
import type { AlertWithDepartment } from "../types/types";

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertWithDepartment[]>([]);

  const fetchAlerts = async () => {
    const res = await alertGet({status:"Active"}); 
    setAlerts(res);
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live Emergency Alerts</h1>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.alert_id}
            className={`p-4 rounded shadow-md ${
              alert.code_type === "Code Blue"
                ? "bg-blue-100 border-l-4 border-blue-600"
                : "bg-red-100 border-l-4 border-red-600"
            }`}
          >
            <div className="font-semibold">{alert.code_type}</div>
            <div>Status: {alert.status}</div>
            <div>Department: {alert.department?.department_name}</div>
            <div>Time: {new Date(alert.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
