import React, { useState } from "react";

export default function TravelExpenseTracker() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    tripName: "",
    date: "",
    destination: "",
    transportCost: "",
    hotelCost: "",
    mealsCost: "",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([form, ...entries]);
    alert("✈️ Travel expense recorded.");
    setForm({ tripName: "", date: "", destination: "", transportCost: "", hotelCost: "", mealsCost: "", notes: "" });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">✈️ Travel Expense Tracker</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-6">
        <input type="text" name="tripName" value={form.tripName} onChange={handleChange} placeholder="Trip Name / Purpose" required className="p-3 bg-gray-800 rounded w-full" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full" />
        <input type="text" name="destination" value={form.destination} onChange={handleChange} placeholder="City / Region" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="transportCost" value={form.transportCost} onChange={handleChange} placeholder="Transport (€)" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="hotelCost" value={form.hotelCost} onChange={handleChange} placeholder="Hotel (€)" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="mealsCost" value={form.mealsCost} onChange={handleChange} placeholder="Meals (€)" className="p-3 bg-gray-800 rounded w-full" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Comments or details" className="p-3 bg-gray-800 rounded w-full" rows={3} />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold transition">
          Save Travel Expense
        </button>
      </form>
    </div>
  );
}

