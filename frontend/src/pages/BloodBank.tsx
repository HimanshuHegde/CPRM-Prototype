import { useEffect, useState } from "react";
import {
  getBloodInventory,
  createBloodUnit,
  updateBloodUnit,
  deleteBloodUnit,
} from "../services/api";
import { logout } from "../services/authApi";

const BloodBank = () => {
  const [bloodUnits, setBloodUnits] = useState<any[]>([]);
  const [newUnit, setNewUnit] = useState({
    blood_type: "",
    units_available: "",
    critical_level: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedUnit, setEditedUnit] = useState<Partial<any>>({});

  const calculateStatus = (units: number, critical: number): string => {
    if (units === 0) return "out of stock";
    if (units <= critical) return "low stock";
    return "available";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "low stock":
        return "bg-yellow-100 text-yellow-800";
      case "out of stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const fetchInventory = async () => {
    const data = await getBloodInventory({});
    setBloodUnits(data);
  };

  useEffect(() => {
    fetchInventory();
    const interval = setInterval(fetchInventory, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddUnit = async () => {
    const units = parseInt(newUnit.units_available);
    const critical = parseInt(newUnit.critical_level);
    if (!newUnit.blood_type || isNaN(units) || isNaN(critical)) {
      alert("Please fill all fields.");
      return;
    }
    const status = calculateStatus(units, critical);
    await createBloodUnit({ ...newUnit, units_available: units, critical_level: critical, status });
    setNewUnit({ blood_type: "", units_available: "", critical_level: "" });
    fetchInventory();
  };

  const handleEdit = (unit: any) => {
    setEditingId(unit.blood_id);
    setEditedUnit({ ...unit });
  };

  const handleSaveEdit = async () => {
    if (editingId == null) return;
    const units = editedUnit.units_available ?? 0;
    const critical = editedUnit.critical_level ?? 0;
    const status = calculateStatus(units, critical);
    await updateBloodUnit({ ...editedUnit, blood_id: editingId, status });
    setEditingId(null);
    setEditedUnit({});
    fetchInventory();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this blood unit?")) {
      await deleteBloodUnit({ blood_id: id });
      fetchInventory();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 border-none"
        onClick={async ()=>{
            await logout();
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>signout</button>
      <h1 className="text-3xl font-bold text-center mb-6">Blood Bank Inventory</h1>

      {/* Add New Unit */}
      <div className="max-w-2xl mx-auto bg-white p-4 mb-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Blood Unit</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            className="border p-2"
            placeholder="Blood Type"
            value={newUnit.blood_type}
            onChange={(e) => setNewUnit({ ...newUnit, blood_type: e.target.value })}
          />
          <input
            className="border p-2"
            type="number"
            placeholder="Units Available"
            value={newUnit.units_available}
            onChange={(e) => setNewUnit({ ...newUnit, units_available: e.target.value })}
          />
          <input
            className="border p-2"
            type="number"
            placeholder="Critical Level"
            value={newUnit.critical_level}
            onChange={(e) => setNewUnit({ ...newUnit, critical_level: e.target.value })}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddUnit}
          >
            Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow">
        <table className="min-w-full table-auto border-collapse">
  <thead>
    <tr className="bg-gray-100 text-left">
      <th className="p-3 w-16">ID</th>
      <th className="p-3 w-32">Blood Type</th>
      <th className="p-3 w-32">Units</th>
      <th className="p-3 w-40">Critical Level</th>
      <th className="p-3 w-32">Status</th>
      <th className="p-3 w-48">Actions</th>
    </tr>
  </thead>
  <tbody>
    {bloodUnits.map((unit) => (
      <tr key={unit.blood_id} className="border-t align-middle">
        <td className="p-3">{unit.blood_id}</td>
        <td className="p-3">
          {editingId === unit.blood_id ? (
            <input
              value={editedUnit.blood_type}
              onChange={(e) =>
                setEditedUnit({ ...editedUnit, blood_type: e.target.value })
              }
              className="border p-1 w-full"
            />
          ) : (
            unit.blood_type
          )}
        </td>
        <td className="p-3">
          {editingId === unit.blood_id ? (
            <input
              type="number"
              value={editedUnit.units_available}
              onChange={(e) =>
                setEditedUnit({
                  ...editedUnit,
                  units_available: Number(e.target.value),
                })
              }
              className="border p-1 w-full"
            />
          ) : (
            unit.units_available
          )}
        </td>
        <td className="p-3">
          {editingId === unit.blood_id ? (
            <input
              type="number"
              value={editedUnit.critical_level}
              onChange={(e) =>
                setEditedUnit({
                  ...editedUnit,
                  critical_level: Number(e.target.value),
                })
              }
              className="border p-1 w-full"
            />
          ) : (
            unit.critical_level
          )}
        </td>
        <td className="p-3">
          <span
            className={`px-2 py-1 text-sm font-medium rounded ${getStatusColor(
              unit.status
            )}`}
          >
            {unit.status}
          </span>
        </td>
        <td className="p-3 space-x-2">
          {editingId === unit.blood_id ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => handleEdit(unit)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(unit.blood_id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
    {bloodUnits.length === 0 && (
      <tr>
        <td colSpan={6} className="text-center p-4 text-gray-500">
          No blood units in inventory.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default BloodBank;
