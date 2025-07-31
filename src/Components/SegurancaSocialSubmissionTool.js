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
      status: "Submitted",
    },
    {
      empId: "EMP000002",
      name: "Carlos Mendes",
      nif: "987654321",
      niss: "98765432109",
      grossSalary: 1500,
      contribution: 195,
      dueDate: "2025-04-10",
      status: "Pending",
    },
  ]);

  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    nif: "",
    niss: "",
    grossSalary: "",
    contribution: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { empId, name, nif, niss, grossSalary } = formData;
    if (!empId || !name || !nif || !niss || !grossSalary) {
      alert("Please fill all required fields.");
      return;
    }

    const contribution = (parseFloat(grossSalary) * 0.13).toFixed(2);
    const newEntry = { ...formData, contribution };
    setEntries((prev) => [...prev, newEntry]);

    alert(`✅ SS contribution for ${newEntry.name} has been created.`);
    setFormData({
      empId: "",
      name: "",
      nif: "",
      niss: "",
      grossSalary: "",
      contribution: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    });
  };

  const handleDelete = (empId) => {
    if (window.confirm("Are you sure you want to delete this Segurança Social entry?")) {
      setEntries((prev) => prev.filter((e) => e.empId !== empId));
    }
  };

  const markAsPaid = (empId) => {
    setEntries((prev) =>
      prev.map((e) => (e.empId === empId ? { ...e, status: "Paid" } : e))
    );
  };

  const totalDue = entries
    .filter((e) => e.status !== "Paid")
    .reduce((sum, e) => sum + parseFloat(e.contribution), 0);

  const totalPaid = entries
    .filter((e) => e.status === "Paid")
    .reduce((sum, e) => sum + parseFloat(e.contribution), 0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6">Segurança Social Submission Tool</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Submit Social Security Contribution</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="empId" value={formData.empId} onChange={handleChange} placeholder="Employee ID" className="w-full p-3 bg-gray-800 rounded" required />
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 bg-gray-800 rounded" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="nif" value={formData.nif} onChange={handleChange} placeholder="NIF" className="w-full p-3 bg-gray-800 rounded" required />
          <input name="niss" value={formData.niss} onChange={handleChange} placeholder="NISS" className="w-full p-3 bg-gray-800 rounded" required />
          <input name="grossSalary" value={formData.grossSalary} onChange={handleChange} placeholder="Gross Salary (€)" type="number" className="w-full p-3 bg-gray-800 rounded" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="dueDate" value={formData.dueDate} onChange={handleChange} type="date" className="w-full p-3 bg-gray-800 rounded" />
          <input
            readOnly
            placeholder="Contribution Amount (13%)"
            value={formData.grossSalary ? (parseFloat(formData.grossSalary) * 0.13).toFixed(2) : ""}
            className="w-full p-3 bg-gray-800 rounded cursor-not-allowed"
          />
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition">
          🧾 Submit to Segurança Social
        </button>
      </form>

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

      <section>
        <h3 className="text-xl font-semibold mb-4">Social Security Submissions</h3>

        {entries.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6 text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Employee</th>
                <th className="p-2">NISS</th>
                <th className="p-2 text-right">Gross Salary</th>
                <th className="p-2 text-right">Contribution (13%)</th>
                <th className="p-2 text-right">Status</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.empId} className="hover:bg-gray-700 transition">
                  <td className="p-3">{entry.name}</td>
                  <td className="p-3">{entry.niss}</td>
                  <td className="p-3 text-right">€{parseFloat(entry.grossSalary).toFixed(2)}</td>
                  <td className="p-3 text-right">€{parseFloat(entry.contribution).toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        entry.status === "Submitted"
                          ? "bg-green-900/30 text-green-400"
                          : entry.status === "Pending"
                          ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button onClick={() => markAsPaid(entry.empId)} className="text-green-400 hover:text-green-300 text-sm">✅ Mark as Paid</button>
                    <button onClick={() => handleDelete(entry.empId)} className="text-red-400 hover:text-red-300 text-sm">❌ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No Segurança Social entries found.</p>
        )}
      </section>
    </div>
  );
}

