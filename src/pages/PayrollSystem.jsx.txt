import React, { useState } from "react";

export default function PayrollSystem() {
  const [formData, setFormData] = useState({
    seafarerName: "",
    nationality: "",
    vesselName: "",
    vesselType: "",
    position: "",
    contractType: "6/3",
    onboardDate: "",
    offboardDate: "",
    baseSalary: "",
    allowances: "",
    deductions: "",
    netSalary: "",
    paymentStatus: "Pending",
    nifNumber: "",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateNetSalary = () => {
    const base = parseFloat(formData.baseSalary || 0);
    const allow = parseFloat(formData.allowances || 0);
    const deduct = parseFloat(formData.deductions || 0);
    const total = (base + allow) - deduct;

    setFormData({ ...formData, netSalary: isNaN(total) ? "" : total.toFixed(2) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payroll Record Submitted:", formData);
    alert("Payroll record saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="bg-gray-800 p-6 shadow-md rounded-lg max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-bold">Payroll & Commission Management</h2>
        <p className="mt-2 text-gray-300">
          Manage salaries, commissions, and legal compliance under Portuguese law and EU inland waterways.
        </p>
      </header>

      {/* Payroll Form */}
      <main className="max-w-5xl mx-auto space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">

          {/* Seafarer Info */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Seafarer Full Name</label>
              <input
                type="text"
                name="seafarerName"
                value={formData.seafarerName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Nationality</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Country</option>
                <option value="Portugal">Portugal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Germany">Germany</option>
                <option value="Belgium">Belgium</option>
                <option value="France">France</option>
                <option value="Philippines">Philippines</option>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Curaçao">Curaçao</option>
              </select>
            </div>
          </section>

          {/* Vessel Info */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium">Vessel Name</label>
              <input
                type="text"
                name="vesselName"
                value={formData.vesselName}
                onChange={handleChange}
                placeholder="Vessel Name"
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Vessel Type</label>
              <select
                name="vesselType"
                value={formData.vesselType}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              >
                <option value="">Select Vessel</option>
                <option value="Oil Tanker">Oil / Gas Tanker</option>
                <option value="Container Ship">Container Ship</option>
                <option value="Cruise Ship">Cruise Ship</option>
                <option value="Bulk Carrier">Bulk Carrier</option>
                <option value="Passenger Vessel">Passenger Vessel</option>
                <navy disabled>—— Inland Waterways ——</navy>
                <option value="Barge">Barge</option>
                <option value="Push Boat">Push Boat</option>
                <option value="River Ferry">River Ferry</option>
                <option value="Cargo Barge">Cargo Barge</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Deck Cadet, Engineer, etc."
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              />
            </div>
          </section>

          {/* Contract Type Selection */}
          <div>
            <label className="block mb-2 font-medium">Contract Type</label>
            <select
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            >
              <option value="">Select Contract Type</option>
              <optgroup label="International Deep Sea">
                <option value="6/3">6 Months On / 3 Off</option>
                <option value="9/3">9 Months On / 3 Off</option>
                <option value="Permanent">Permanent – Domestic Passenger/Ferry</option>
              </optgroup>
              <optgroup label="EU Inland Waterways">
                <option value="3/1">3 Months On / 1 Month Off</option>
                <option value="4/4">4 Weeks Freelance</option>
              </optgroup>
            </select>
            <p className="mt-2 text-sm text-gray-400">
              Select appropriate schedule based on vessel region.
            </p>
          </div>

          {/* Onboard Dates */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Onboard Date</label>
              <input
                type="date"
                name="onboardDate"
                value={formData.onboardDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Offboard Date</label>
              <input
                type="date"
                name="offboardDate"
                value={formData.offboardDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              />
            </div>
          </section>

          {/* Salary Fields */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 font-medium">Base Salary (€)</label>
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
                placeholder="e.g. 1200"
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Allowances (€)</label>
              <input
                type="number"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                placeholder="e.g. 200"
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Deductions (€)</label>
              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                placeholder="e.g. 150"
                className="w-full p-3 bg-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Net Salary (€)</label>
              <input
                type="text"
                name="netSalary"
                value={formData.netSalary || "Calculated"}
                readOnly
                className="w-full p-3 bg-gray-700 rounded focus:outline-none text-green-400 font-semibold"
              />
            </div>
          </section>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={calculateNetSalary}
            className="bg-yellow-600 hover:bg-yellow-700 py-2 px-6 rounded transition"
          >
            💰 Calculate Net Salary
          </button>

          {/* NIF Number */}
          <div>
            <label className="block mb-2 font-medium">NIF Number</label>
            <input
              type="text"
              name="nifNumber"
              value={formData.nifNumber}
              onChange={handleChange}
              placeholder="NIF or Tax Identification"
              className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="block mb-2 font-medium">Payment Status</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Processed">📨 Processed</option>
              <option value="Paid">💸 Paid</option>
              <option value="Overdue">🔴 Overdue</option>
            </select>
          </div>

          {/* Notes Section */}
          <div>
            <label className="block mb-2 font-medium">Notes / Comments</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Any internal comments or instructions..."
              className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold transition duration-200"
          >
            Save Payroll Record
          </button>
        </form>

        {/* Financial Compliance Section */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h3 className="text-xl font-semibold mb-4">Legal Compliance & Integration</h3>

          <p className="text-gray-300">
            All payroll records are automatically linked to:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Finanças:</strong> Monthly tax submission</li>
            <li><strong>Segurança Social:</strong> Social security payments</li>
            <li><strong>SEF:</strong> Work permit tracking</li>
            <li><strong>NIF:</strong> Tax identification verification</li>
            <li><strong>NISS:</strong> Social security number assignment</li>
          </ul>

          <p className="text-sm text-gray-400 mt-4 italic">
            *Automated reports generated monthly and submitted to relevant authorities.
          </p>
        </section>

        {/* Back to Dashboard */}
        <div className="text-center mt-10">
          <a href="/dashboard" className="text-blue-400 hover:underline text-lg">
            ← Back to Admin Dashboard
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-12 text-center">
        <p>&copy; {new Date().getFullYear()} WSRN - Built with ❤️ in Portugal</p>
        <p className="mt-2 text-sm">For global maritime staffing and legal compliance</p>
      </footer>
    </div>
  );
}