import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  ArchiveBoxIcon,
  BeakerIcon,
  ExclamationTriangleIcon, // New icon for alerts
} from "@heroicons/react/24/outline";
import { logout } from "../services/authApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Token Management",
      description: "Manage patient tokens department-wise.",
      icon: <ClipboardDocumentListIcon className="h-10 w-10 text-blue-600" />,
      onClick: () => navigate("/tokens"),
    },
    {
      title: "Drug Inventory",
      description: "Track and manage drug stock levels.",
      icon: <ArchiveBoxIcon className="h-10 w-10 text-green-600" />,
      onClick: () => navigate("/drugInventory"),
    },
    {
      title: "Blood Bank Inventory",
      description: "Monitor and control blood unit availability.",
      icon: <BeakerIcon className="h-10 w-10 text-red-600" />,
      onClick: () => navigate("/blood_inventory"),
    },
    {
      title: "Emergency Alerts",
      description: "View and handle code blue/red alerts.",
      icon: <ExclamationTriangleIcon className="h-10 w-10 text-yellow-600" />,
      onClick: () => navigate("/alertOption"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-auto hover:bg-red-600 border-none"
        onClick={async () => {
          await logout();
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        signout
      </button>
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Hospital Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            onClick={item.onClick}
            className="cursor-pointer bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex flex-col items-center text-center"
          >
            {item.icon}
            <h2 className="text-xl font-semibold mt-3 mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
