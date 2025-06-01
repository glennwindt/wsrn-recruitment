import React, { useState } from "react";

export default function RevenueTracker({ userRole = "admin" }) {
  const [revenueEntries, setRevenueEntries] = useState([
    {
      id: "REV001",
      organization: "DSA Maritime Ltd.",
      amount: 1200,
      type: "Commission",
      invoiceRef: "INV0001",
      paymentMethod: "Bank Transfer",
      date: "2025-04-15",
      status: "Paid"
    },
    {
      id: "REV002",
      organization: "Ocean Star Shipping",
      amount: 2500,
      type: "Membership",
      invoiceRef: "MEMB0001",
      paymentMethod: "Company Card",
      date: "2025-04-01",
      status: "Pending"
    }
  ]);

  const [formData, setFormData] = useState({
    organization: "",
    amount: "",
    type: "Commission",
    invoiceRef: "",
    paymentMethod: "Bank Transfer",
    date: new Date().toISOString().split("T")[0],
    status: "Pending"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.organization || !formData.amount || !formData.invoiceRef) {
      alert("Please fill all required fields.");
      return;
    }

    const newEntry = {
      id: `REV${String(revenueEntries.length + 1).padStart(3, "0")}`,
      ...formData
    };

    setRevenueEntries([newEntry, ...revenueEntries]);
    alert(`✅ New revenue entry added: ${newEntry.type} from ${newEntry.organization}`);
    
    // Reset form
    setFormData({
      organization: "",
      amount: "",
      type: "Commission",
      invoiceRef: "",
      paymentMethod: "Bank Transfer",
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    });
  };

  const totalRevenue = revenueEntries
    .filter(r => r.status === "Paid")
    .reduce((sum, r) => sum + parseFloat(r.amount), 0);

  const pendingRevenue = revenueEntries
    .filter(r => r.status !== "Paid")
    .reduce((sum, r) => sum + parseFloat(r.amount), 0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Company Revenue Tracker</h2>

      {/* Add New Revenue Entry */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Add New Revenue</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Organization</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Agency / Company Name"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Amount (€)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="E.g., 1200"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="Commission">Commission</option>
              <option value="Membership">Membership</option>
              <option value="Training Referral">Training Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Invoice Reference</label>
            <input
              type="text"
              name="invoiceRef"
              value={formData.invoiceRef}
              onChange={handleChange}
              placeholder="INV0001 / MEMB0001"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Company Card">Company Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Processing">Processing</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            💵 Record Revenue
          </button>
        </div>
      </form>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-700 p-4 rounded flex flex-col justify-between">
          <h4 className="font-semibold mb-2">Total Revenue Collected</h4>
          <p className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded flex flex-col justify-between">
          <h4 className="font-semibold mb-2">Pending Payments</h4>
          <p className="text-2xl font-bold">€{pendingRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Revenue List */}
      <section>
        <h3 className="text-xl font-semibold mb-4">All Revenue Entries ({revenueEntries.length})</h3>

        {revenueEntries.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Organization</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-right p-2">Type</th>
                <th className="text-right p-2">Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {revenueEntries.map((rev, index) => (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3 text-gray-400">{rev.date}</td>
                  <td className="py-3">{rev.organization}</td>
                  <td className="py-3 text-right">€{parseFloat(rev.amount).toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      rev.type === "Commission" ? "bg-green-900/30 text-green-400" :
                      rev.type === "Membership" ? "bg-blue-900/30 text-blue-400" : "bg-purple-900/30 text-purple-400"
                    }`}>
                      {rev.type}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      rev.status === "Paid" ? "bg-green-900/30 text-green-400" :
                      rev.status === "Pending" ? "bg-yellow-900/30 text-yellow-400" : "bg-red-900/30 text-red-400"
                    }`}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-3">
                    <button
                      onClick={() => alert(`Edit ${rev.id}`)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      🖊 Edit
                    </button>
                    <button
                      onClick={() => alert(`Delete ${rev.id}`)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ❌ Delete
                    </button>
                    <button
                      onClick={() => alert(`Generate Invoice for ${rev.id}`)}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      📄 Generate Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No revenue entries recorded yet.</p>
        )}
      </section>
    </div>
  );
}