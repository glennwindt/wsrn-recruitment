import React, { useState } from "react";

export default function IDGenerator() {
  const [entityType, setEntityType] = useState("seafarer");
  const [newEntityName, setNewEntityName] = useState("");
  const [idList, setIdList] = useState({
    seafarer: [],
    agency: [],
    shippingCompany: [],
    trainingCenter: []
  });

  const entityTypePrefix = {
    seafarer: "APP",
    agency: "AGT",
    shippingCompany: "SCOMP",
    trainingCenter: "TRG"
  };

  const getNextId = () => {
    const count = idList[entityType].length;
    return String(count + 1).padStart(6, "0"); // APP000001
  };

  const handleGenerate = () => {
    if (!newEntityName.trim()) {
      alert("Please enter a full name or company name.");
      return;
    }

    const nextNum = getNextId();
    const newTempId = `${entityTypePrefix[entityType]}${nextNum}`;

    setIdList((prev) => ({
      ...prev,
      [entityType]: [
        ...prev[entityType],
        {
          tempId: newTempId,
          name: newEntityName,
          status: "Pending",
          dateGenerated: new Date().toISOString().split("T")[0]
        }
      ]
    }));

    setNewEntityName("");
  };

  const handleAssignToPayroll = (applicant) => {
    const empCount = idList.seafarer.length;
    const empId = `EMP${String(empCount + 1).padStart(6, "0")}`;

    const updatedApplicants = idList.seafarer.map(a =>
      a.tempId === applicant.tempId ? { ...a, empId, status: "Active" } : a
    );

    setIdList(prev => ({
      ...prev,
      seafarer: updatedApplicants
    }));
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete ${id}? This action cannot be undone.`)) {
      setIdList(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.tempId !== id)
      }));
    }
  };

  const currentList = idList[entityType];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="bg-gray-800 p-6 shadow-md rounded-lg max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-bold">Employee / Entity ID Generator</h2>
        <p className="mt-2 text-gray-300">
          Track all applicants with temporary APP IDs. Assign EMP IDs only when placed under WSRN payroll.
        </p>
      </header>

      {/* Form Section */}
      <main className="max-w-5xl mx-auto space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="font-medium">Select Type:</label>
          <select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="md:col-span-3 p-3 bg-gray-700 rounded"
          >
            <option value="seafarer">Seafarer (APP)</option>
            <option value="agency">Agency (AGT)</option>
            <option value="shippingCompany">Shipping Company (SCOMP)</option>
            <option value="trainingCenter">Training Center (TRG)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="font-medium">Entity Name:</label>
          <input
            type="text"
            value={newEntityName}
            onChange={(e) => setNewEntityName(e.target.value)}
            placeholder="Full Name / Company Name"
            className="md:col-span-3 p-3 bg-gray-700 rounded"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            ➕ Generate Temporary ID
          </button>
        </div>

        {/* Applicant List */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Generated {entityType.charAt(0).toUpperCase() + entityType.slice(1)} IDs
          </h3>

          {currentList.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-2">Temporary ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentList.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="p-2">{item.tempId}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        item.status === "Active" ? "bg-green-400" :
                        item.status === "In Review" ? "bg-yellow-400" : "bg-red-400"
                      }`}></span>
                      {item.status || "Pending"}
                    </td>
                    <td className="p-2 text-right space-x-3">
                      {entityType === "seafarer" && !item.empId && (
                        <button
                          onClick={() => handleAssignToPayroll(item)}
                          className="text-green-400 hover:text-green-300 text-sm"
                        >
                          Assign EMP ID
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(entityType, item.tempId)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="italic text-gray-400 mt-4">No records found yet.</p>
          )}
        </section>

        {/* Employee List */}
        {entityType === "seafarer" && (
          <section className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Employees Under WSRN Payroll</h3>
            {idList.seafarer.filter(s => s.empId).length > 0 ? (
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-2">EMP ID</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Date Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {idList.seafarer
                    .filter(s => s.empId)
                    .map((item, index) => (
                      <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                        <td className="p-2">{item.empId}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-gray-400">{item.dateGenerated}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="italic text-gray-400">No employees currently under WSRN payroll.</p>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-10 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} WSRN - Built with ❤️ in Portugal</p>
        <p className="mt-2 text-sm">For global maritime staffing and legal compliance</p>
      </footer>
    </div>
  );
}