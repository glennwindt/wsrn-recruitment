import React from "react";
import { ledger } from "../finance-tools/CompanyLedger";
import { formatCurrency } from "../../utils/CompanyUtils";

export default function Dashboard() {
  const summary = ledger.getSummary();

  return (
    <div className="bg-gray-900 p-6 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📊 WSRN Finance Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Total Income</h3>
          <p className="text-green-300 text-xl font-mono">{formatCurrency(summary.totalIncome)}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Total Expenses</h3>
          <p className="text-red-300 text-xl font-mono">{formatCurrency(summary.totalExpenses)}</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Net Balance</h3>
          <p className={`text-xl font-mono ${
            parseFloat(summary.balance) >= 0 ? "text-green-400" : "text-red-400"
          }`}>
            {formatCurrency(summary.balance)}
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-400 italic">
        All figures reflect synced entries from loans, meetings, meals, excursions, and income sources.
      </div>
    </div>
  );
}

