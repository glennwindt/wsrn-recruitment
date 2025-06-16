import React, { useState } from "react";

export default function SegurancaSocialSubmissionTool({ userRole = "admin" }) {
  const [entries, setEntries] = useState([
    {
      empId: "EMP000001",
      name: "John Doe",
      nif: "123456789",
      niss: "12345678901",
      grossSalary: 2500,
      contribution: 325,
      dueDate: "2025-04-10",
      status: "Submitted"
    },
    {
      empId: "EMP000002",
      name: "Carlos Mendes",
      nif: "987654321",
      niss: "98765432109",
      grossSalary: 1500,
      contribution: 195,
      dueDate: "2025-04-10",
      status: "Pending"
    }
  ]);

  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    nif: "",
    niss: "",
    grossSalary: "",
    contribution: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "Pending"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.empId || !formData.name || !formData.nif || !formData.niss) {
      alert("Please fill all required fields.");
      return;
    }

    const newEntry = {
      ...formData,
      contribution: (formData.grossSalary * 0.13).toFixed(2) // Standard 13% rate
    };

    setEntries([...entries, newEntry]);
    alert(`✅ SS contribution for ${newEntry.name} has been created.`);
    
    // Reset form
    setFormData({
      empId: "",
      name: "",
      nif: "",
      niss: "",
      grossSalary: "",
      contribution: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Pending"
    });
  };

  const handleDelete = (empId) => {
    if (window.confirm("Are you sure you want to delete this Segurança Social entry?")) {
      setEntries(entries.filter(e => e.empId !== empId));
    }
  };

  const totalDue = entries
    .filter(e => e.status !== "Paid")
    .reduce((sum, e) => sum + parseFloat(e.contribution), 0);

  const totalPaid = entries
    .filter(e => e.status === "Paid")
    .reduce((sum, e) => sum + parseFloat(e.contribution), 0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Segurança Social Submission Tool</h2>

      {/* Form to add new SS contribution */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Submit Social Security Contribution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Employee ID</label>
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              placeholder="EMP000001"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">NIF Number</label>
            <input
              type="text"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              placeholder="123456789"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">NISS Number</label>
            <input
              type="text"
              name="niss"
              value={formData.niss}
              onChange={handleChange}
              placeholder="12345678901"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Gross Salary (€)</label>
            <input
              type="number"
              name="grossSalary"
              value={formData.grossSalary}
              onChange={handleChange}
              placeholder="2500"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Contribution Amount (13%)</label>
            <input
              type="text"
              name="contribution"
              value={formData.contribution || `${(formData.grossSalary * 0.13).toFixed(2)`}
              readOnly
              className="w-full p-3 bg-gray-800 rounded cursor-not-allowed"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          🧾 Submit to Segurança Social
        </button>
      </form>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-700 p-4 rounded">
          <h4 className="font-semibold mb-2">Total Due</h4>
          <p className="text-xl font-bold">€{totalDue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h4 className="font-semibold mb-2">Total Paid</h4>
          <p className="text-xl font-bold">€{totalPaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Entries Table */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Social Security Submissions</h3>

        {entries.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Employee</th>
                <th className="text-left p-2">NISS</th>
                <th className="text-right p-2">Gross Salary</th>
                <th className="text-right p-2">Contribution (13%)</th>
                <th className="text-right p-2">Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{entry.name}</td>
                  <td className="py-3">{entry.niss}</td>
                  <td className="py-3 text-right">€{parseFloat(entry.grossSalary).toFixed(2)}</td>
                  <td className="py-3 text-right">€{parseFloat(entry.contribution).toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      entry.status === "Submitted" ? "bg-green-900/30 text-green-400" :
                      entry.status === "Pending" ? "bg-yellow-900/30 text-yellow-400" : "bg-red-900/30 text-red-400"
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-3">
                    <button
                      onClick={() => alert(`Mark ${entry.empId} as Paid`)}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      ✅ Mark as Paid
                    </button>
                    <button
                      onClick={() => handleDelete(entry.empId)}
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
          <p className="italic text-gray-400 mt-4">No social security records submitted yet.</p>
        )}
      </section>
    </div>
  );
}