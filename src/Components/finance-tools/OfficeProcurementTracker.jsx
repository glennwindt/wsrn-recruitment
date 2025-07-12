import React, { useState } from "react";

export default function OfficeProcurementTracker() {
  const [procurements, setProcurements] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    vendor: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    invoiceRef: "",
    taxDeductible: true,
    deliveryTracking: "",
    status: "Ordered"
  });

  const categories = [
    "Office Supplies", "Tech Equipment", "Furniture",
    "Software", "Utilities", "Subscriptions",
    "Restaurant Inventory", "Lab Materials", "Other"
  ];

  const vendors = [
    "Amazon Portugal", "Worten", "MediaMarkt", "Pingo Doce",
    "Mercadona", "CTT", "Continente", "Local Artisan", "Other"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.item || !formData.vendor || !formData.amount) {
      alert("Please complete the required fields.");
      return;
    }

    const newEntry = {
      id: `PR${String(procurements.length + 1).padStart(3, "0")}`,
      ...formData
    };

    setProcurements([newEntry, ...procurements]);
    alert(`✅ ${newEntry.item} logged successfully.`);

    setFormData({
      item: "",
      vendor: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      invoiceRef: "",
      taxDeductible: true,
      deliveryTracking: "",
      status: "Ordered"
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this procurement record?")) {
      setProcurements(procurements.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📦 Procurement Tracker — Fonte Gaia</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-8">
        <h3 className="font-semibold mb-4">Log New Item</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="item" value={formData.item} onChange={handleChange} placeholder="Item Name" className="p-3 bg-gray-800 rounded" required />
          <select name="vendor" value={formData.vendor} onChange={handleChange} className="p-3 bg-gray-800 rounded" required>
            <option value="">Select Vendor</option>
            {vendors.map((v, i) => (
              <option key={i} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select name="category" value={formData.category} onChange={handleChange} className="p-3 bg-gray-800 rounded" required>
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-3 bg-gray-800 rounded" />
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount (€)" className="p-3 bg-gray-800 rounded" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" name="invoiceRef" value={formData.invoiceRef} onChange={handleChange} placeholder="Invoice Ref" className="p-3 bg-gray-800 rounded" />
          <input type="text" name="deliveryTracking" value={formData.deliveryTracking} onChange={handleChange} placeholder="Delivery / CTT Code" className="p-3 bg-gray-800 rounded" />
          <label className="inline-flex items-center mt-3">
            <input type="checkbox" name="taxDeductible" checked={formData.taxDeductible} onChange={handleChange} className="mr-2" />
            Tax-Deductible
          </label>
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition">
          🧾 Log Procurement Entry
        </button>
      </form>

      {/* Procurement Records */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Logged Items ({procurements.length})</h3>
        {procurements.length === 0 ? (
          <p className="italic text-gray-400">No items tracked yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Item</th>
                <th className="text-left p-2">Vendor</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-right p-2">Deductible</th>
                <th className="text-right p-2">Tracking</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {procurements.map((p, i) => (
                <tr key={i} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{p.item}</td>
                  <td className="py-3 text-gray-400">{p.vendor}</td>
                  <td className="py-3 text-right">€{parseFloat(p.amount).toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      p.taxDeductible ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                    }`}>
                      {p.taxDeductible ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {p.deliveryTracking ? (
                      <a href={`https://www.ctt.pt/en/tracking/?trackingCode=${p.deliveryTracking}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        📦 Track
                      </a>
                    ) : <span className="text-gray-500 text-sm">—</span>}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ❌ Delete
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

