import React, { useState } from "react";

export default function MeetingCostRegistry() {
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({
    title: "", date: "", venue: "", attendees: "",
    hospitality: "", travel: "", notes: "", deductible: true
  });

  const formatCurrency = (val) => `€${parseFloat(val || 0).toFixed(2)}`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMeetings([form, ...meetings]);
    alert("✅ Meeting cost registered.");
    setForm({ title: "", date: "", venue: "", attendees: "", hospitality: "", travel: "", notes: "", deductible: true });
  };

  const handleDelete = (idx) => {
    if (window.confirm("Delete this meeting entry?")) {
      setMeetings(meetings.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📋 Meeting & Event Cost Registry</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-6">
        {/* Form Fields */}
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Meeting Title" className="p-3 bg-gray-800 rounded w-full" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full" required />
        <input type="text" name="venue" value={form.venue} onChange={handleChange} placeholder="Venue / Location" className="p-3 bg-gray-800 rounded w-full" />
        <input type="text" name="attendees" value={form.attendees} onChange={handleChange} placeholder="Attendees or Client Name" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="hospitality" value={form.hospitality} onChange={handleChange} placeholder="Hospitality Cost (€)" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="travel" value={form.travel} onChange={handleChange} placeholder="Travel Cost (€)" className="p-3 bg-gray-800 rounded w-full" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Special Notes" rows={2} className="p-3 bg-gray-800 rounded w-full" />
        <label className="text-sm flex items-center space-x-2 text-gray-300">
          <input type="checkbox" name="deductible" checked={form.deductible} onChange={handleChange} />
          <span>Deductible for tax purposes</span>
        </label>
        <button type="submit" className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold transition">
          📝 Log Meeting Cost
        </button>
      </form>

      {/* Meeting Table */}
      {meetings.length > 0 && (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Venue</th>
              <th className="text-right p-2">Total Cost</th>
              <th className="text-right p-2">Deductible</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((m, i) => {
              const total = parseFloat(m.hospitality || 0) + parseFloat(m.travel || 0);
              return (
                <tr key={i} className="hover:bg-gray-700 border-b border-gray-700">
                  <td className="py-3">{m.title}</td>
                  <td className="py-3">{m.venue}</td>
                  <td className="py-3 text-right">{formatCurrency(total)}</td>
                  <td className="py-3 text-right">{m.deductible ? "✅" : "—"}</td>
                  <td className="py-3 text-right">
                    <button onClick={() => handleDelete(i)} className="text-red-400 hover:text-red-300 text-sm">❌</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

