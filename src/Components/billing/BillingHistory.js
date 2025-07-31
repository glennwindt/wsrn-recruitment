import React, { useState } from "react";
import InvoiceGenerator from "./InvoiceGenerator";

export default function BillingHistory({ invoices, agencyName }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredInvoices =
    statusFilter === "All"
      ? invoices
      : invoices.filter((inv) => inv.status === statusFilter);

  const totalInvoices = invoices.length;
  const totalCommission = invoices.reduce((sum, inv) => sum + parseFloat(inv.wsrnCommission), 0);

  const statusOptions = ["All", "Paid", "Pending", "Overdue"];

  return (
    <div className="billing-history-container">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">📋 Billing History – {agencyName}</h2>
        <p className="text-sm text-gray-400">
          A complete record of invoices issued to your agency, including payment statuses.
        </p>
      </header>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="text-sm mr-2">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-800 text-white text-sm p-2 rounded"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Invoice Table */}
      <InvoiceGenerator invoices={filteredInvoices} agencyName={agencyName} />

      {/* Summary Footer */}
      <footer className="mt-8 text-right text-sm text-gray-400">
        <p>Total Invoices Issued: <strong>{totalInvoices}</strong></p>
        <p>Total Commission Invoiced: <strong>€{totalCommission.toFixed(2)}</strong></p>
      </footer>
    </div>
  );
}
