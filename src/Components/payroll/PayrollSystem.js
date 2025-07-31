import React, { useState } from "react";

export default function PayrollSystem({ userRole = "admin" }) {
  const [employees, setEmployees] = useState([
    {
      empId: "EMP000001",
      name: "John Doe",
      nationality: "Philippines",
      position: "Deck Officer",
      vesselType: "Container Ship",
      onboardSchedule: "6/3 Months",
      baseSalary: 2500,
      allowances: 300,
      deductions: 200,
      netSalary: 2600,
      nifStatus: "Assigned",
      nissStatus: "Active"
    },
    {
      empId: "EMP000002",
      name: "Carlos Mendes",
      nationality: "Brazil",
      position: "Engine Room Rating",
      vesselType: "Oil Tanker",
      onboardSchedule: "4/4 Weeks",
      baseSalary: 1500,
      allowances: 200,
      deductions: 100,
      netSalary: 1600,
      nifStatus: "Pending",
      nissStatus: "In Review"
    }
  ]);

  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    nationality: "",
    position: "",
    vesselType: "",
    onboardSchedule: "",
    baseSalary: "",
    allowances: "",
    deductions: "",
    nifNumber: "",
    nissNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.empId || !formData.name || !formData.position || !formData.vesselType) {
      alert("Please fill all required fields.");
      return;
    }

    const newEmployee = {
      ...formData,
      netSalary: parseFloat(formData.baseSalary || 0) + 
                 parseFloat(formData.allowances || 0) - 
                 parseFloat(formData.deductions || 0),
      nifStatus: formData.nifNumber ? "Assigned" : "Not Started",
      nissStatus: formData.nissNumber ? "Active" : "Not Started"
    };

    setEmployees([...employees, newEmployee]);
    alert(`✅ Employee ${newEmployee.name} has been added to payroll.`);
    
    // Clear form after submission
    setFormData({
      empId: "",
      name: "",
      nationality: "",
      position: "",
      vesselType: "",
      onboardSchedule: "",
      baseSalary: "",
      allowances: "",
      deductions: "",
      nifNumber: "",
      nissNumber: ""
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this employee from payroll?")) {
      setEmployees(employees.filter(e => e.empId !== id));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Portuguese Payroll System</h2>

      {/* Add New Employee */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Add New Employee to Payroll</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">EMP ID</label>
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
            <label className="block text-sm mb-2">Nationality</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Nationality</option>
              <option value="Portugal">Portugal</option>
              <option value="Philippines">Philippines</option>
              <option value="India">India</option>
              <option value="Brazil">Brazil</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Spain">Spain</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Deck Officer, AB Seaman, etc."
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Vessel Type</label>
            <input
              type="text"
              name="vesselType"
              value={formData.vesselType}
              onChange={handleChange}
              placeholder="Container Ship, Oil Tanker, etc."
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-2">Onboard Schedule</label>
            <select
              name="onboardSchedule"
              value={formData.onboardSchedule}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Schedule</option>
              <option value="4/4 Weeks">4 Weeks On / 4 Weeks Off</option>
              <option value="3/1 Month">3 Months On / 1 Month Off (EU Inland)</option>
              <option value="6/3 Months">6 Months On / 3 Months Off</option>
              <option value="9/3 Months">9 Months On / 3 Months Off</option>
              <option value="Permanent">Permanent – Domestic Vessels</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Base Salary (€)</label>
            <input
              type="number"
              name="baseSalary"
              value={formData.baseSalary}
              onChange={handleChange}
              placeholder="2500"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Allowances (€)</label>
            <input
              type="number"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              placeholder="300"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Deductions (€)</label>
            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              placeholder="200"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">NIF Number</label>
            <input
              type="text"
              name="nifNumber"
              value={formData.nifNumber}
              onChange={handleChange}
              placeholder="123456789"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">NISS Number</label>
            <input
              type="text"
              name="nissNumber"
              value={formData.nissNumber}
              onChange={handleChange}
              placeholder="12345678901"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          💳 Add to Payroll
        </button>
      </form>

      {/* Employee List */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Seafarers Under WSRN Payroll ({employees.length})</h3>

        {employees.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">EMP ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Vessel / Position</th>
                <th className="text-right p-2">Net Salary (€)</th>
                <th className="text-right p-2">NIF Status</th>
                <th className="text-right p-2">NISS Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{employee.empId}</td>
                  <td className="py-3">{employee.name}</td>
                  <td className="py-3">{employee.vesselType} – {employee.position}</td>
                  <td className="py-3 text-right">{employee.netSalary.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      employee.nifStatus === "Assigned" ? "bg-green-900/30 text-green-400" :
                      employee.nifStatus === "In Review" ? "bg-yellow-900/30 text-yellow-400" : "bg-red-900/30 text-red-400"
                    }`}>
                      {employee.nifStatus || "Not Started"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      employee.nissStatus === "Active" ? "bg-green-900/30 text-green-400" :
                      employee.nissStatus === "Suspended" ? "bg-red-900/30 text-red-400" : "bg-yellow-900/30 text-yellow-400"
                    }`}>
                      {employee.nissStatus || "Not Started"}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-3">
                    <button
                      onClick={() => alert(`Edit ${employee.empId}`)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      🖊 Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.empId)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ❌ Delete
                    </button>
                    <button
                      onClick={() => alert(`Generate Salary Slip for ${employee.name}`)}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      📄 Generate Slip
                    </button>
                  </td>
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