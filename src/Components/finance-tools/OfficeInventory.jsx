import React, { useState, useEffect } from "react";

export default function OfficeInventory() {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    vendor: "",
    quantity: "",
    unit: "units",
    location: "Main Store",
    usagePurpose: "",
    notes: ""
  });

  const lowStockThresholds = {
    "Herbs": 10,
    "Office Supplies": 5,
    "Restaurant Stock": 20,
    "Tech": 2,
    "Furniture": 1
  };

  const categories = [
    "Herbs", "Office Supplies", "Restaurant Stock",
    "Personal Care", "Furniture", "Tech", "Cleaning", "Other"
  ];

  const vendors = [
    "Amazon Portugal", "MediaMarkt", "Local Farmer", "Herbal Coop",
    "Fonte Gaia Grow", "Continente", "Local Artisan", "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: `STK${String(inventory.length + 1).padStart(3, "0")}`,
      ...formData,
      quantity: parseFloat(formData.quantity),
      addedDate: new Date().toISOString().split("T")[0],
      status: "In Stock"
    };
    setInventory([newItem, ...inventory]);
    alert(`✅ ${newItem.item} added to inventory.`);
    setFormData({
      item: "", category: "", vendor: "",
      quantity: "", unit: "units", location: "Main Store",
      usagePurpose: "", notes: ""
    });
  };

  const handleUsage = (id) => {
    const amount = prompt("Amount to deduct from stock:");
    if (!amount || isNaN(amount)) return;
    setInventory(inventory.map(i => {
      if (i.id !== id) return i;
      const newQty = i.quantity - parseFloat(amount);
      return {
        ...i,
        quantity: newQty,
        status: newQty <= 0 ? "Depleted" : i.status
      };
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this inventory item?")) {
      setInventory(inventory.filter(i => i.id !== id));
    }
  };

  const getRowColor = (item) => {
    const threshold = lowStockThresholds[item.category] || 5;
    if (item.quantity <= 0) return "bg-red-900/30 text-red-400";
    if (item.quantity <= threshold) return "bg-yellow-900/30 text-yellow-400";
    return "bg-green-900/30 text-green-400";
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📦 Office Inventory Tracker — WSRN</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-8">
        <h3 className="font-semibold mb-4">Add New Stock Item</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="item" value={formData.item} onChange={handleChange} placeholder="Item Name" className="p-3 bg-gray-800 rounded" required />
          <select name="category" value={formData.category} onChange={handleChange} className="p-3 bg-gray-800 rounded" required>
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Qty" className="p-3 bg-gray-800 rounded" required />
          <select name="unit" value={formData.unit} onChange={handleChange} className="p-3 bg-gray-800 rounded">
            <option value="units">Units</option>
            <option value="ml">Milliliters</option>
            <option value="g">Grams</option>
            <option value="kg">Kilograms</option>
            <option value="liters">Liters</option>
          </select>
          <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} placeholder="Vendor / Source" className="p-3 bg-gray-800 rounded" />
        </div>

        <textarea name="usagePurpose" value={formData.usagePurpose} onChange={handleChange} placeholder="Usage Purpose (e.g. kitchen, lab, maintenance)" className="p-3 bg-gray-800 rounded w-full" rows={2} />
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" className="p-3 bg-gray-800 rounded w-full" rows={2} />

        <button type="submit" className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold transition">
          🧾 Log Inventory Item
        </button>
      </form>

      <section>
        <h3 className="text-xl font-semibold mb-4">Current Inventory ({inventory.length})</h3>
        {inventory.length === 0 ? (
          <p className="italic text-gray-400">No inventory yet. Sacred shelves await.</p>
        ) : (
          <table className="w-full table-auto border-collapse mb-6 text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Item</th>
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Quantity</th>
                <th className="text-right p-2">Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i, idx) => (
                <tr key={idx} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{i.item}</td>
                  <td className="py-3 text-gray-400">{i.category}</td>
                  <td className="py-3 text-right">{i.quantity} {i.unit}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded text-xs ${getRowColor(i)}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-2">
                    <button
                      onClick={() => handleUsage(i.id)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      ➖ Use
                    </button>
                    <button
                      onClick={() => handleDelete(i.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

