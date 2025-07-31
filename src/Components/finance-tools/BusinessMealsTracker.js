import React, { useState } from "react";

export default function BusinessMealsTracker() {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({
    date: "",
    restaurant: "",
    amount: "",
    attendees: "",
    purpose: "",
    deductible: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMeals([form, ...meals]);
    alert("🍽️ Business meal recorded.");
    setForm({ date: "", restaurant: "", amount: "", attendees: "", purpose: "", deductible: true });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🍽️ Business Meals Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-6">
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full" />
        <input name="restaurant" value={form.restaurant} onChange={handleChange} placeholder="Restaurant / Location" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount (€)" className="p-3 bg-gray-800 rounded w-full" />
        <input name="attendees" value={form.attendees} onChange={handleChange} placeholder="Attendees / Clients" className="p-3 bg-gray-800 rounded w-full" />
        <textarea name="purpose" value={form.purpose} onChange={handleChange} placeholder="Meal Purpose or Meeting Topic" rows={2} className="p-3 bg-gray-800 rounded w-full" />
        <label className="text-sm flex items-center space-x-2 text-gray-300">
          <input type="checkbox" name="deductible" checked={form.deductible} onChange={handleChange} />
          <span>Deductible for tax reporting</span>
        </label>
        <button type="submit" className="w-full bg-green-600 py-3 rounded font-semibold">📝 Log Business Meal</button>
      </form>
    </div>
  );
}

