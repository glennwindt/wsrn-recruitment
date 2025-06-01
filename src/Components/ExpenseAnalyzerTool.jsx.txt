import React, { useState } from "react";

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
    "Amazon Portugal",
    "Continente",
    "MediaMarkt",
    "Worten",
    "Pingo Doce",
    "Mercadona",
    "Office Depot",
    "CTT Store",
    "NOS (Telecom)",
    "EDP (Utilities)"
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
    
    // Clear form after submission
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
    if (window.confirm("Are you sure you want to delete this expense record?")) {
      setExpenses(expenses.filter(p => p.id !== id));
    }
  };

  const handleAddSupplier = () => {
    if (!newSupplier.trim()) {
      alert("Please enter a supplier name.");
      return;
    }

    if (suppliers.includes(newSupplier)) {
      alert(`${newSupplier} already exists.`);
      return;
    }

    setSuppliers([...suppliers, newSupplier]);
    alert(`✅ Supplier "${newSupplier}" has been added.`);
    setNewSupplier("");
    setShowAddSupplierModal(false);
  };

  const handleDeleteSupplier = (supplierName) => {
    if (window.confirm(`Are you sure you want to remove "${supplierName}" from the supplier list?`)) {
      setSuppliers(suppliers.filter(s => s !== supplierName));
    }
  };

  const categories = [
    "Electronics",
    "Stationery",
    "Furniture",
    "Software / Licenses",
    "Shipping / Delivery",
    "Office Maintenance",
    "Utilities",
    "Training Materials",
    "Other"
  ];

  const totalDeductible = expenses
    .filter(e => e.taxDeductible)
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const averageDeductiblePerMonth = (totalDeductible / 12).toFixed(2); // Annual assumption

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI-Powered Expense Analyzer</h2>

      {/* Add New Purchase */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Add New Office Purchase</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Item Name</label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              placeholder="E.g., Laptop, Printer Ink, Files"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Purchase Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
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
              placeholder="E.g., 120.50"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Supplier</label>
            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier, i) => (
                <option key={i} value={supplier}>{supplier}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Invoice Reference</label>
            <input
              type="text"
              name="invoiceRef"
              value={formData.invoiceRef}
              onChange={handleChange}
              placeholder="INV20250405-AMZN"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Payment Type</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="Company Card">Company Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="PayPal">PayPal</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">CTT / Delivery Tracking</label>
            <input
              type="text"
              name="cttTracking"
              value={formData.cttTracking}
              onChange={handleChange}
              placeholder="CTT123456789PT"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="taxDeductible"
              checked={formData.taxDeductible}
              onChange={handleChange}
              className="mr-2"
            />
            Mark as Tax-Deductible
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          🧾 Analyze & Add to Bookkeeping
        </button>
      </form>

      {/* Manage Suppliers Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold mb-4">Manage Expense Organizations</h3>
          <button
            onClick={() => setShowAddSupplierModal(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
          >
            ➕ Add New Supplier
          </button>
        </div>

        {suppliers.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Supplier</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{supplier}</td>
                  <td className="py-3 text-right space-x-3">
                    <button
                      onClick={() => handleDeleteSupplier(supplier)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No suppliers defined yet.</p>
        )}
      </section>

      {/* Summary of Deductibles */}
      <section className="mb-8">
        <div className="bg-gray-700 p-4 rounded flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total Tax-Deductible Office Expenses</p>
            <p className="text-xl font-bold mt-1">€{totalDeductible.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Monthly Average Deduction</p>
            <p className="text-lg mt-1">€{averageDeductiblePerMonth}</p>
          </div>
          <div>
            <button
              onClick={() => alert("Exporting tax-deductible list...")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
            >
              📤 Export for Finanças
            </button>
          </div>
        </div>
      </section>

      {/* Expense List */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Office Expenses ({expenses.length})</h3>

        {expenses.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Item</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-right p-2">Tax Deductible</th>
                <th className="text-right p-2">Tracking Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => {
                const expenseDate = new Date(expense.date);
                const formattedDate = expenseDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });

                return (
                  <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3 text-gray-400">{formattedDate}</td>
                    <td className="py-3">{expense.item}</td>
                    <td className="py-3 text-right">€{parseFloat(expense.amount).toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        expense.taxDeductible ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                      }`}>
                        {expense.taxDeductible ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {expense.cttTracking && (
                        <a href={`https://www.ctt.pt/en/tracking/?trackingCode= ${expense.cttTracking}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300 text-sm">
                          📦 View CTT Status
                        </a>
                      )}
                      {!expense.cttTracking && (
                        <span className="text-gray-500 text-sm">No tracking available</span>
                      )}
                    </td>
                    <td className="py-3 text-right space-x-3">
                      <button
                        onClick={() => alert(`Edit ${expense.id}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        🖊 Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No office purchases recorded yet.</p>
        )}
      </section>

      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Supplier</h3>
            <input
              type="text"
              value={newSupplier}
              onChange={(e) => setNewSupplier(e.target.value)}
              placeholder="E.g., Amazon Portugal, MediaMarkt, CTT Store"
              className="w-full p-3 bg-gray-700 rounded mb-4"
            />
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setShowAddSupplierModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSupplier}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
              >
                Save Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}