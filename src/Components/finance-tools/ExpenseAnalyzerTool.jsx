import React, { useState } from "react";
import {
  getExpensesByCategory,
  getMonthlySpend,
  getDeductibleTotals
} from "../../utils/CompanyLedger";

export default function ExpenseAnalyzerTool({ userRole = "admin" }) {
  const [expenses, setExpenses] = useState([
    {
      id: "EXP001",
      item: "Laptop",
      category: "Electronics",
      date: "2025-04-05",
      amount: 950,
      supplier: "Amazon Portugal",
      invoiceRef: "INV20250405-AMZN",
      paymentType: "Company Card",
      taxDeductible: true,
      cttTracking: "CTT123456789PT",
      status: "Delivered"
    },
    {
      id: "EXP002",
      item: "Printer Paper Ream (x5)",
      category: "Stationery",
      date: "2025-04-10",
      amount: 25,
      supplier: "Continente",
      invoiceRef: "REC20250410-CNT",
      paymentType: "Cash",
      taxDeductible: true,
      cttTracking: "",
      status: "Completed"
    }
  ]);

  const [suppliers, setSuppliers] = useState([
    "Amazon Portugal", "Continente", "MediaMarkt", "Worten",
    "Pingo Doce", "Mercadona", "Office Depot",
    "CTT Store", "NOS (Telecom)", "EDP (Utilities)"
  ]);

  const [formData, setFormData] = useState({
    item: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    supplier: "",
    invoiceRef: "",
    paymentType: "Company Card",
    taxDeductible: true,
    cttTracking: ""
  });

  const [newSupplier, setNewSupplier] = useState("");
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);

  const categoryTotals = getExpensesByCategory(expenses);
  const monthlyTotals = getMonthlySpend(expenses);
  const totalDeductible = getDeductibleTotals(expenses);
  const averageDeductiblePerMonth = (totalDeductible / 12).toFixed(2);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.item || !formData.amount || !formData.supplier) {
      alert("Please fill all required fields.");
      return;
    }

    const newExpense = {
      id: `EXP${String(expenses.length + 1).padStart(3, "0")}`,
      ...formData,
      status: formData.cttTracking ? "In Transit" : "Completed"
    };

    setExpenses([newExpense, ...expenses]);
    alert(`✅ ${newExpense.item} added to tax-deductible list.`);

    setFormData({
      item: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      supplier: "",
      invoiceRef: "",
      paymentType: "Company Card",
      taxDeductible: true,
      cttTracking: ""
    });
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Delete this expense record?")) {
      setExpenses(expenses.filter(p => p.id !== id));
    }
  };

  const handleAddSupplier = () => {
    if (!newSupplier.trim()) {
      alert("Enter a supplier name.");
      return;
    }
    if (suppliers.includes(newSupplier)) {
      alert(`${newSupplier} already exists.`);
      return;
    }
    setSuppliers([...suppliers, newSupplier]);
    alert(`✅ "${newSupplier}" added to supplier list.`);
    setNewSupplier("");
    setShowAddSupplierModal(false);
  };

  const handleDeleteSupplier = (name) => {
    if (window.confirm(`Remove "${name}" from the supplier list?`)) {
      setSuppliers(suppliers.filter(s => s !== name));
    }
  };

  const categories = [
    "Electronics", "Stationery", "Furniture", "Software / Licenses",
    "Shipping / Delivery", "Office Maintenance", "Utilities",
    "Training Materials", "Other"
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🌿 Expense Analyzer — Fonte Gaia Portal</h2>

      {/* Add New Purchase Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">📝 Log New Expense</h3>

        {/* Form Fields */}
        {/* ... [same form layout as previous version] ... */}

        {/* (Can reuse your existing form code here without needing change) */}
      </form>

      {/* Category Breakdown */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">🧮 Category Breakdown</h3>
        <ul className="text-sm space-y-2">
          {Object.entries(categoryTotals).map(([category, amount], i) => (
            <li key={i}>
              <span className="font-semibold">{category}:</span> €{amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      {/* Monthly Summary */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">📅 Monthly Expense Summary</h3>
        <ul className="text-sm space-y-2">
          {Object.entries(monthlyTotals).map(([month, amount], i) => (
            <li key={i}>
              <span className="font-semibold">{month}:</span> €{amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      {/* Deduction Totals */}
      <section className="mb-8">
        <div className="bg-gray-700 p-4 rounded flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total Tax-Deductible Expenses</p>
            <p className="text-xl font-bold mt-1">€{totalDeductible.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Average Monthly Deduction</p>
            <p className="text-lg mt-1">€{averageDeductiblePerMonth}</p>
          </div>
          <div>
            <button
              onClick={() => alert("📤 Exporting deductions to Finanças...")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
            >
              Export Summary
            </button>
          </div>
        </div>
      </section>

      {/* Expense Table and Supplier Manager */}
      {/* ✅ You can reuse your previous table rendering code and supplier modal here exactly as-is */}

    </div>
  );
}

