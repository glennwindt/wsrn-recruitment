import React, { useState } from "react";

export default function InvoiceView() {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    invoiceId: "",
    clientName: "",
    amount: "",
    date: "",
    status: "Unpaid",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvoices([formData, ...invoices]);
    alert(`✅ Invoice ${formData.invoiceId} recorded.`);
    setFormData({ invoiceId: "", clientName: "", amount: "", date: "", status: "Unpaid", notes: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this invoice?")) {
      setInvoices(invoices.filter(inv => inv.invoiceId !== id));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📄 Invoice Tracker</h2>

      <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded space-y-4 mb-6">
        <input type="text" name="invoiceId" value={formData.invoiceId} onChange={handleChange} placeholder="Invoice ID" required className="p-3 bg-gray-800 rounded w-full" />
        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name" required className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount (€)" className="p-3 bg-gray-800 rounded w-full" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full" />
        <select name="status" value={formData.status} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full">
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" className="p-3 bg-gray-800 rounded w-full" rows={2} />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold transition">
          Save Invoice
        </button>
      </form>

      <section>
        <h3 className="text-xl font-semibold mb-4">Invoices ({invoices.length})</h3>
        {invoices.length === 0 ? (
          <p className="italic text-gray-400">No invoices recorded.</p>
        ) : (
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Client</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-right p-2">Date</th>
                <th className="text-right p-2">Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-gray-700 transition">
                  <td className="py-3">{inv.invoiceId}</td>
                  <td className="py-3">{inv.clientName}</td>
                  <td className="py-3 text-right">€{parseFloat(inv.amount).toFixed(2)}</td>
                  <td className="py-3 text-right">{inv.date}</td>
                  <td className="py-3 text-right">{inv.status}</td>
                  <td className="py-3 text-right space-x-2">
                    <button onClick={() => handleDelete(inv.invoiceId)} className="text-red-400 hover:text-red-300 text-sm">❌ Delete</button>
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

