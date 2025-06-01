import React from "react";

export default function InvoiceGenerator({ invoices, agencyName }) {
  const totalCommission = invoices.reduce((sum, inv) => sum + parseFloat(inv.wsrnCommission), 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Commission Invoices – {agencyName}</h2>

      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-2">Invoice ID</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Crew Member</th>
            <th className="text-left p-2">Gross Salary</th>
            <th className="text-left p-2">WSRN Commission</th>
            <th className="text-left p-2">Status</th>
            <th className="text-right p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, index) => (
            <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
              <td className="py-3">{inv.id}</td>
              <td className="py-3">{inv.date}</td>
              <td className="py-3">{inv.crewMember}</td>
              <td className="py-3">€{inv.grossSalary}</td>
              <td className="py-3">€{inv.wsrnCommission}</td>
              <td className="py-3">
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  inv.status === "Paid" ? "bg-green-900/30 text-green-400" :
                  inv.status === "Pending" ? "bg-yellow-900/30 text-yellow-400" :
                  "bg-red-900/30 text-red-400"
                }`}>
                  {inv.status}
                </span>
              </td>
              <td className="py-3 text-right">
                <button className="text-blue-400 hover:text-blue-300 text-sm">Download PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Commission Due:</p>
          <p className="text-xl font-bold">€{totalCommission.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}