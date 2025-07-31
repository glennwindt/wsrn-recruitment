import React, { useState } from "react";

export default function MiscExpenseLedger() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    description: "",
    date: "",
    category: "",
    amount: "",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([form, ...expenses]);
    alert("💸 Misc expense recorded.");
    setForm({ description: "", date: "", category: "", amount: "", notes: "" });
  };

  const handleDelete = (idx) => {
    if (window.confirm("Delete this expense entry?")) {
      setExpenses(expenses.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">💸 Miscellaneous Expense Ledger</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-6">
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Expense Description" required className="p-3 bg-gray-800 rounded w-full" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 bg-gray-800 rounded w-full" />
        <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category or Type" className="p-3 bg-gray-800 rounded w-full" />
        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount (€)" className="p-3 bg-gray-800 rounded w-full" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" className="p-3 bg-gray-800 rounded w-full" rows={3} />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold transition">
          Save Expense
        </button>
      </form>

      <section>
        <h3 className="text-xl font-semibold mb-4">Logged Expenses ({expenses.length})</h3>
        {expenses.length === 0 ? (
          <p className="italic text-gray-400">No miscellaneous expenses yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Description</th>
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={i} className="hover:bg-gray-700 transition">
                  <td className="py-3">{e.date}</td>
                  <td className="py-3">{e.description}</td>
                  <td className="py-3">{e.category}</td>
                  <td className="py-3 text-right">€{parseFloat(e.amount).toFixed(2)}</td>
                  <td className="py-3 text-right space-x-2">
                    <button onClick={() => handleDelete(i)} className="text-red-400 hover:text-red-300 text-sm">❌</button>
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

