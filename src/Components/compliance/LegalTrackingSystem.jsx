import React, { useState } from "react";

export default function LegalTrackingSystem() {
  const [cases, setCases] = useState([]);
  const [form, setForm] = useState({
    caseId: "",
    subject: "",
    authority: "",
    startDate: "",
    status: "Open",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCases([form, ...cases]);
    alert("✅ Legal case logged.");
    setForm({ caseId: "", subject: "", authority: "", startDate: "", status: "Open", notes: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this legal case?")) {
      setCases(cases.filter(c => c.caseId !== id));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">⚖️ Legal Tracking System</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-6">
        <input type="text" name="caseId" value={form.caseId} onChange={handleChange} placeholder="Case ID" required className="p-3 bg-gray-800 rounded w-full" />
        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject / Issue" className="p-3 bg-gray-800 rounded w-full" />
        <input type="text" name="authority" value={form.authority} onChange={handleChange} placeholder="Court or Legal Entity" className="p-3 bg-gray-800 rounded w-full" />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full" />
        <select name="status" value={form.status} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full">
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes or details..." className="p-3 bg-gray-800 rounded w-full" rows={3} />
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold transition">
          Log Legal Case
        </button>
      </form>

      {cases.length > 0 && (
        <table className="w-full text-sm table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">ID</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Authority</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, i) => (
              <tr key={i} className="hover:bg-gray-700 transition">
                <td className="py-3">{c.caseId}</td>
                <td className="py-3">{c.subject}</td>
                <td className="py-3">{c.authority}</td>
                <td className="py-3">{c.status}</td>
                <td className="py-3 space-x-2 text-right">
                  <button onClick={() => handleDelete(c.caseId)} className="text-red-400 hover:text-red-300 text-sm">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

