import React from "react";
import { ledger } from "../../utils/CompanyLedger";
import { formatCurrency } from "../../utils/CompanyUtils";
import "../../styles/dashboard.css";
 // ✅ Ensures styling is applied

export default function Dashboard() {
  const summary = ledger.getSummary();

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h1>📊 WSRN Financial Overview</h1>
      </div>

      <div className="dashboard-card">
        <h3 className="section-title">Income</h3>
        <p>Total Income: {formatCurrency(summary.totalIncome)}</p>
      </div>

      <div className="dashboard-card">
        <h3 className="section-title">Expenses</h3>
        <p>Total Expenses: {formatCurrency(summary.totalExpenses)}</p>
      </div>

      <div className="dashboard-card">
        <h3 className="section-title">Net Balance</h3>
        <p
          style={{
            color:
              parseFloat(summary.balance) >= 0 ? "#28a745" : "#c0392b",
            fontWeight: "bold",
          }}
        >
          {formatCurrency(summary.balance)}
        </p>
      </div>

      <div className="dashboard-footer">
        <p>Synced from meals, excursions, and ledger entries.</p>
      </div>
    </div>
  );
}

