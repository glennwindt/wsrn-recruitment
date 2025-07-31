import React, { useState } from "react";

export default function ProjectExcursionLog() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    title: "", date: "", location: "",
    purpose: "", cost: "", notes: ""
  });

  const formatCurrency = (val) => `€${parseFloat(val || 0).toFixed(2)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogs([form, ...logs]);
    alert("🌍 Excursion recorded.");
    setForm({ title: "", date: "", location: "", purpose: "", cost: "", notes: "" });
  };

  const handleDelete = (idx) => {
    if (window.confirm("Delete this excursion?")) {
      setLogs(logs.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🌍 Project Excursion Log</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Excursion Title" required className="p-3 bg-gray-800 rounded w-full" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="p-3 bg-gray-800 rounded w-full" />
        <input name="purpose" value={form.purpose} onChange={handleChange} placeholder="Purpose" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="cost" value={form.cost} onChange={handleChange} placeholder="Cost (€)" className="p-3 bg-gray-800 rounded w-full" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" className="p-3 bg-gray-800 rounded w-full" rows={2} />
        <button type="submit" className="w-full bg-green-600 py-3 rounded font-semibold">➕ Save Excursion</button>
      </form>

      {logs.length > 0 && (
        <table className="w-full table-auto text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-right">Cost</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-gray-700 transition">
                <td className="py-2">{log.title}</td>
                <td className="py-2">{log.location}</td>
                <td className="py-2 text-right">{formatCurrency(log.cost)}</td>
                <td className="py-2 text-right">
                  <button onClick={() => handleDelete(i)} className="text-red-400 hover:text-red-300 text-sm">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

