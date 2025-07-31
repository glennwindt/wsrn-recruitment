// [existing imports]
import React, { useState } from "react";

export default function LoanTrackerModule() {
  const [loans, setLoans] = useState([]);
  const [formData, setFormData] = useState({
    lender: "", amount: "", startDate: new Date().toISOString().split("T")[0],
    termMonths: "", interestRate: "", deductible: true, notes: ""
  });

  const formatCurrency = (val) => `€${parseFloat(val || 0).toFixed(2)}`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const calculateMonthlyPayment = (p, r, m) => {
    if (r === 0) return p / m;
    const rate = r / 100 / 12;
    return (p * rate) / (1 - Math.pow(1 + rate, -m));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const p = parseFloat(formData.amount);
    const r = parseFloat(formData.interestRate);
    const m = parseInt(formData.termMonths);

    const monthly = calculateMonthlyPayment(p, r, m);
    const totalRepayment = monthly * m;

    const newLoan = {
      id: `LOAN${String(loans.length + 1).padStart(3, "0")}`,
      ...formData,
      principal: p,
      monthly: monthly.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
      paidSoFar: 0,
      balance: totalRepayment.toFixed(2),
      status: "Active"
    };

    setLoans([newLoan, ...loans]);
    alert(`✅ Loan from ${newLoan.lender} recorded.`);
    setFormData({
      lender: "", amount: "", startDate: new Date().toISOString().split("T")[0],
      termMonths: "", interestRate: "", deductible: true, notes: ""
    });
  };

  const handlePayment = (id, amt) => {
    setLoans(loans.map(l => {
      if (l.id !== id) return l;
      const paid = parseFloat(l.paidSoFar) + parseFloat(amt);
      const balance = parseFloat(l.totalRepayment) - paid;
      return {
        ...l,
        paidSoFar: paid.toFixed(2),
        balance: balance.toFixed(2),
        status: balance <= 0 ? "Paid Off" : "Active"
      };
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this loan?")) {
      setLoans(loans.filter(l => l.id !== id));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">💰 Loan Tracker</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded mb-8">
        {/* form fields */}
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="lender" value={formData.lender} onChange={handleChange} placeholder="Lender" className="p-3 bg-gray-800 rounded" />
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount (€)" className="p-3 bg-gray-800 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="p-3 bg-gray-800 rounded" />
          <input type="number" name="termMonths" value={formData.termMonths} onChange={handleChange} placeholder="Term (Months)" className="p-3 bg-gray-800 rounded" />
          <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} placeholder="Rate (%)" className="p-3 bg-gray-800 rounded" />
        </div>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes..." rows={2} className="p-3 bg-gray-800 rounded w-full" />
        <label className="text-sm flex items-center space-x-2 text-gray-300">
          <input type="checkbox" name="deductible" checked={formData.deductible} onChange={handleChange} />
          <span>Deductible loan</span>
        </label>
        <button type="submit" className="w-full bg-green-600 py-3 rounded font-semibold">💾 Save Loan</button>
      </form>

      {/* loan table */}
      {loans.length > 0 && (
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th>Lender</th><th>Start</th><th className="text-right">Amount</th><th className="text-right">Monthly</th><th className="text-right">Balance</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l, i) => (
              <tr key={i} className="hover:bg-gray-700 border-b border-gray-700">
                <td>{l.lender}</td>
                <td>{l.startDate}</td>
                <td className="text-right">{formatCurrency(l.amount)}</td>
                <td className="text-right">{formatCurrency(l.monthly)}</td>
                <td className="text-right">{formatCurrency(l.balance)}</td>
                <td className="text-right text-yellow-400">{l.status}</td>
                <td className="text-right space-x-2">
                  <button onClick={() => {
                    const amt = prompt("Enter payment amount (€):");
                    if (amt) handlePayment(l.id, amt);
                  }} className="text-blue-400 hover:text-blue-300 text-sm">💳</button>
                  <button onClick={() => handleDelete(l.id)} className="text-red-400 hover:text-red-300 text-sm">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

