import { useEffect, useState } from "react";
import {
  getDrugInventory,
  createDrug,
  updateDrug,
  deleteDrug,
} from "../services/api";
import { logout } from "../services/authApi";

// 🔧 Status logic based on stock and reorder level
const getStatus = (stock_qty: number, reorder_level: number): string => {
  if (stock_qty === 0) return "out of stock";
  if (stock_qty <= reorder_level) return "low stock";
  return "available";
};

const DrugInventory = () => {
  const [drugs, setDrugs] = useState<any[]>([]);
  const [newDrug, setNewDrug] = useState({
    drug_name: "",
    stock_qty: 0,
    reorder_level: 0,
  });
  const [editingDrugId, setEditingDrugId] = useState<number | null>(null);
  const [editedDrug, setEditedDrug] = useState<Partial<any>>({});

  const fetchInventory = async () => {
    const data = await getDrugInventory({});
    setDrugs(data);
  };

  useEffect(() => {
    fetchInventory();
    const interval = setInterval(fetchInventory, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const handleAddDrug = async () => {
    if (!newDrug.drug_name) return alert("Drug name is required.");
    const status = getStatus(newDrug.stock_qty, newDrug.reorder_level);
    await createDrug({ ...newDrug, status });
    setNewDrug({ drug_name: "", stock_qty: 0, reorder_level: 0 });
    fetchInventory();
  };

  const handleEditDrug = (drug: any) => {
    setEditingDrugId(drug.drug_id);
    setEditedDrug({ ...drug });
  };

  const handleSaveEdit = async () => {
    if (!editingDrugId) return;
    const status = getStatus(
      editedDrug.stock_qty ?? 0,
      editedDrug.reorder_level ?? 0
    );
    await updateDrug({ ...editedDrug, drug_id: editingDrugId, status });
    setEditingDrugId(null);
    setEditedDrug({});
    fetchInventory();
  };

  const handleDelete = async (drug_id: number) => {
    if (confirm("Are you sure you want to delete this drug?")) {
      await deleteDrug({ drug_id });
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
      <h1 className="text-3xl font-bold text-center mb-6">Drug Inventory</h1>

      {/* ➕ Add New Drug */}
      <div className="max-w-2xl mx-auto bg-white p-4 mb-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Drug</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            className="border p-2"
            placeholder="Drug Name"
            value={newDrug.drug_name}
            onChange={(e) =>
              setNewDrug({ ...newDrug, drug_name: e.target.value })
            }
          />
          <input
  type="number"
  className="border p-2"
  placeholder="Stock"
  value={newDrug.stock_qty === 0 ? "" : newDrug.stock_qty}
  onChange={(e) =>
    setNewDrug({
      ...newDrug,
      stock_qty: e.target.value === "" ? 0 : Number(e.target.value),
    })
  }
/>

<input
  type="number"
  className="border p-2"
  placeholder="Reorder Level"
  value={newDrug.reorder_level === 0 ? "" : newDrug.reorder_level}
  onChange={(e) =>
    setNewDrug({
      ...newDrug,
      reorder_level: e.target.value === "" ? 0 : Number(e.target.value),
    })
  }
/>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddDrug}
          >
            Add
          </button>
        </div>
      </div>

      {/* 📋 Drug Table */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow">
        <table className="min-w-full table-fixed">
  <thead>
    <tr className="bg-gray-100">
      <th className="w-1/12 p-3 text-left">ID</th>
      <th className="w-3/12 p-3 text-left">Drug Name</th>
      <th className="w-2/12 p-3 text-left">Stock</th>
      <th className="w-2/12 p-3 text-left">Reorder Level</th>
      <th className="w-2/12 p-3 text-left">Status</th>
      <th className="w-2/12 p-3 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {drugs.map((drug) => (
      <tr key={drug.drug_id} className="border-t">
        <td className="p-3">{drug.drug_id}</td>
        <td className="p-3 truncate">
          {editingDrugId === drug.drug_id ? (
            <input
              value={editedDrug.drug_name}
              onChange={(e) =>
                setEditedDrug({ ...editedDrug, drug_name: e.target.value })
              }
              className="border p-1 w-full"
            />
          ) : (
            drug.drug_name
          )}
        </td>
        <td className="p-3">
          {editingDrugId === drug.drug_id ? (
            <input
              type="number"
              value={editedDrug.stock_qty=== 0 ? "" : editedDrug.stock_qty}
              onChange={(e) =>
                setEditedDrug({
                  ...editedDrug,
                  stock_qty: Number(e.target.value),
                })
              }
              className="border p-1 w-full"
            />
          ) : (
            drug.stock_qty
          )}
        </td>
        <td className="p-3">
          {editingDrugId === drug.drug_id ? (
            <input
              type="number"
              value={editedDrug.reorder_level=== 0 ? "" : editedDrug.reorder_level}
              onChange={(e) =>
                setEditedDrug({
                  ...editedDrug,
                  reorder_level: Number(e.target.value),
                })
              }
              className="border p-1 w-full"
            />
          ) : (
            drug.reorder_level
          )}
        </td>
        <td className="p-3">
          <span
            className={`px-2 py-1 text-sm font-medium rounded ${getStatusColor(
              drug.status
            )}`}
          >
            {drug.status}
          </span>
        </td>
        <td className="p-3 space-x-2">
          {editingDrugId === drug.drug_id ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => handleEditDrug(drug)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(drug.drug_id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
    {drugs.length === 0 && (
      <tr>
        <td colSpan={6} className="text-center p-4 text-gray-500">
          No drugs in inventory.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default DrugInventory;
