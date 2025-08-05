// src/pages/SalaryCalculatorPage.jsx

import React from "react";
import { calculateSalary } from "../utils/salary/SalaryCalculator";

const SalaryCalculatorPage = () => {
  const sampleData = {
    baseSalary: 2200,
    hourlyRate: 12,
    fieldHours: 18,
    overtimeShifts: [
      { date: "2025-08-15", hours: 4 },
      { date: "2025-08-17", hours: 6 },
      { date: "2025-08-19", hours: 2 },
    ],
  };

  const result = calculateSalary(sampleData);

  return (
    <div>
      <h1>Salary Calculator</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default SalaryCalculatorPage;

