import React, { useState } from "react";
import ConfirmActionModal from "./ConfirmActionModal";

export default function EmployeeIDGenerator({ onDelete }) {
  const [entityType, setEntityType] = useState("seafarer");
  const [newEntityName, setNewEntityName] = useState("");
  const [applicantList, setApplicantList] = useState([
    { tempId: "APP000001", name: "John Doe", status: "Pending" },
    { tempId: "APP000002", name: "Carlos Mendes", status: "Pending" }
  ]);

  const [employeeList, setEmployeeList] = useState([]);

  const entityTypePrefix = {
    seafarer: "APP",
    agency: "AGT",
    shippingCompany: "SCOMP",
    trainingCenter: "TRG"
  };

  const getNextTempId = () => {
    const count = applicantList.length;
    return `${entityTypePrefix[entityType]}${String(count + 1).padStart(6, "0")}`;
  };

  const handleGenerate = () => {
    if (!newEntityName.trim()) {
      alert("Please enter a full name or company name.");
      return;
    }

    const newApplicant = {
      tempId: getNextTempId(),
      name: newEntityName,
      status: "Pending",
      dateAdded: new Date().toISOString().split("T")[0]
    };

    setApplicantList([...applicantList, newApplicant]);
    setNewEntityName("");
  };

  const handleAssignToPayroll = (applicant) => {
    const nextEmpNum = employeeList.length + 1;
    const empId = `EMP${String(nextEmpNum).padStart(6, "0")}`;

    const newEmployee = {
      ...applicant,
      empId,
      assignedDate: new Date().toISOString().split("T")[0],
      status: "Active"
    };

    setEmployeeList(prev => [...prev, newEmployee]);
    setApplicantList(prev => prev.filter(a => a.tempId !== applicant.tempId));
  };

  const handleDelete = (applicant) => {
    onDelete?.(applicant.name);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Applicant & Employee ID Management</h2>
      <p className="text-gray-400">Track applicants with temporary APP IDs and assign EMP IDs only when placed under WSRN payroll.</p>

      {/* Form Section */}
      <div className="bg-gray-700 p-6 rounded-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="font-medium">Select Type:</label>
          <select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="md:col-span-3 p-3 bg-gray-800 rounded"
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
            className="md:col-span-3 p-3 bg-gray-800 rounded"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            ➕ Add New Applicant
          </button>
        </div>
      </div>

      {/* Applicant Pool */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Applicant Pool (Temporary IDs)</h3>
        <table className="w-full table-auto border-collapse bg-gray-700 rounded text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-3 text-left">Temp ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicantList.map((app, index) => (
              <tr key={index} className="hover:bg-gray-600 transition">
                <td className="p-3">{app.tempId}</td>
                <td className="p-3">{app.name}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded text-xs">
                    {app.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => handleAssignToPayroll(app)}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Assign EMP ID
                  </button>
                  <button
                    onClick={() => handleDelete(app)}
                    className="text-red-500 hover:text-red-400 text-sm ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
          >
            ➕ Add New Applicant
          </button>
        </div>
      </section>

      {/* Employees Under Payroll */}
      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Employees Under WSRN Payroll</h3>
        {employeeList.length > 0 ? (
          <table className="w-full table-auto border-collapse bg-gray-700 rounded text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-3 text-left">EMP ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Assigned On</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-600 transition">
                  <td className="p-3 font-mono">{emp.empId}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3 text-gray-400">{emp.assignedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No employees currently under WSRN payroll.</p>
        )}
      </section>
    </div>
  );
}