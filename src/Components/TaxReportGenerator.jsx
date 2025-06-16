import React, { useState } from "react";

export default function TaxReportGenerator({ userRole = "admin" }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [report, setReport] = useState(null);

  const [payrollExpenses, setPayrollExpenses] = useState([
    {
      empId: "EMP000001",
      name: "John Doe",
      nationality: "Philippines",
      grossSalary: 2500,
      taxDeductible: 2500,
      socialSecurity: 325,
      incomeTax: 375,
      netPayout: 1800,
      nif: "123456789",
      niss: "12345678901"
    },
    {
      empId: "EMP000002",
      name: "Carlos Mendes",
      nationality: "Brazil",
      grossSalary: 1500,
      taxDeductible: 1500,
      socialSecurity: 195,
      incomeTax: 225,
      netPayout: 1080,
      nif: "987654321",
      niss: "98765432109"
    }
  ]);

  const [officeExpenses, setOfficeExpenses] = useState([
    {
      item: "Laptop",
      supplier: "Amazon Portugal",
      category: "Electronics",
      amount: 950,
      invoiceRef: "EXP20250405-AMZN",
      date: "2025-04-05"
    },
    {
      item: "Printer Paper Ream",
      supplier: "Continente",
      category: "Stationery",
      amount: 25,
      invoiceRef: "REC20250410-CNT",
      date: "2025-04-10"
    }
  ]);

  const [revenue, setRevenue] = useState([
    {
      organization: "DSA Maritime Ltd.",
      amount: 1200,
      type: "Commission",
      invoiceRef: "INV0001",
      date: "2025-04-15"
    },
    {
      organization: "Ocean Star Shipping",
      amount: 2500,
      type: "Membership",
      invoiceRef: "MEMB0001",
      date: "2025-04-01"
    }
  ]);

  const generateReport = () => {
    const filteredPayroll = payrollExpenses.filter(p => p.nif === "123456789");
    const filteredOffice = officeExpenses.filter(o => o.date.startsWith(month));
    const filteredRevenue = revenue.filter(r => r.date.startsWith(month));

    const totalPayroll = filteredPayroll.reduce((sum, p) => sum + p.grossSalary, 0);
    const totalSocialSecurity = filteredPayroll.reduce((sum, p) => sum + p.socialSecurity, 0);
    const totalIncomeTax = filteredPayroll.reduce((sum, p) => sum + p.incomeTax, 0);
    const totalNetPayout = filteredPayroll.reduce((sum, p) => sum + p.netPayout, 0);

    const totalOffice = filteredOffice.reduce((sum, o) => sum + o.amount, 0);
    const totalRevenue = filteredRevenue.reduce((sum, r) => sum + r.amount, 0);

    const taxableBase = totalRevenue - (totalPayroll + totalOffice);

    setReport({
      month,
      payroll: {
        totalGross: totalPayroll,
        totalSS: totalSocialSecurity,
        totalIT: totalIncomeTax,
        totalNet: totalNetPayout
      },
      expenses: {
        officeSupplies: totalOffice
      },
      revenue: {
        total: totalRevenue
      },
      taxable: taxableBase
    });
  };

  const handleExport = () => {
    alert("📄 Exporting full tax report for submission to Finanças...");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Monthly Tax Report Generator</h2>

      {/* Month Selection */}
      <div className="flex justify-between items-center mb-8 bg-gray-700 p-4 rounded">
        <label className="font-medium">Select Month:</label>
        <div className="flex items-center space-x-4">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="p-3 bg-gray-800 rounded"
          />
          <button
            onClick={generateReport}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            📊 Generate Report
          </button>
          <button
            onClick={handleExport}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition"
          >
            📤 Export to PDF
          </button>
        </div>
      </div>

      {/* Summary Section */}
      {report && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-4">Revenue</h3>
              <ul className="space-y-2">
                <li><strong>Total Commission/Membership Income:</strong> €{report.revenue.total.toFixed(2)}</li>
              </ul>
            </div>

            <div className="bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-4">Expenses</h3>
              <ul className="space-y-2">
                <li><strong>Payroll Salaries:</strong> €{report.payroll.totalGross.toFixed(2)}</li>
                <li><strong>Office Supplies:</strong> €{report.expenses.officeSupplies.toFixed(2)}</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded mb-8">
            <h3 className="font-semibold mb-4">Taxable Base</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="mb-1">Total Income: €{report.revenue.total.toFixed(2)}</p>
                <p className="mb-1">Total Expenses: €{(report.payroll.totalGross + report.expenses.officeSupplies).toFixed(2)}</p>
                <p className="mt-2 font-bold">
                  Taxable Base: €{report.taxable.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleExport}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition"
              >
                📤 Export Full Report
              </button>
            </div>
          </div>

          {/* Payroll Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Payroll Breakdown</h3>
            <table className="w-full table-auto border-collapse mb-6">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2">Employee</th>
                  <th className="text-right p-2">Gross Salary</th>
                  <th className="text-right p-2">Social Security</th>
                  <th className="text-right p-2">Income Tax</th>
                  <th className="text-right p-2">Net Payout</th>
                </tr>
              </thead>
              <tbody>
                {payrollExpenses.map((entry, i) => (
                  <tr key={i} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3">{entry.name}</td>
                    <td className="py-3 text-right">€{entry.grossSalary.toFixed(2)}</td>
                    <td className="py-3 text-right">€{entry.socialSecurity.toFixed(2)}</td>
                    <td className="py-3 text-right">€{entry.incomeTax.toFixed(2)}</td>
                    <td className="py-3 text-right">€{entry.netPayout.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expense Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Office Supply Expenses</h3>
            <table className="w-full table-auto border-collapse mb-6">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2">Supplier</th>
                  <th className="text-right p-2">Amount</th>
                  <th className="text-right p-2">Category</th>
                  <th className="text-right p-2">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {officeExpenses.map((exp, i) => (
                  <tr key={i} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3">{exp.supplier}</td>
                    <td className="py-3 text-right">€{exp.amount.toFixed(2)}</td>
                    <td className="py-3 text-right">{exp.category}</td>
                    <td className="py-3 text-right">{exp.invoiceRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Revenue Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Commission & Membership Income</h3>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2">Organization</th>
                  <th className="text-right p-2">Amount</th>
                  <th className="text-right p-2">Type</th>
                  <th className="text-right p-2">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {revenue.map((rev, i) => (
                  <tr key={i} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3">{rev.organization}</td>
                    <td className="py-3 text-right">€{rev.amount.toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        rev.type === "Commission" ? "bg-green-900/30 text-green-400" :
                        rev.type === "Membership" ? "bg-blue-900/30 text-blue-400" : "bg-purple-900/30 text-purple-400"
                      }`}>
                        {rev.type}
                      </span>
                    </td>
                    <td className="py-3 text-right">{rev.invoiceRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!report && (
        <p className="italic text-gray-400 mt-6">Select a month and click "Generate Report"</p>
      )}
    </div>
  );
}