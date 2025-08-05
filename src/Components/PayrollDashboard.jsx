// src/components/PayrollDashboard.jsx

import React from "react";
import { calculateSalary } from "../utils/salary/SalaryCalculator";
import { getFieldWorkBonus } from "../utils/salary/RateEngine";
import OvertimeTracker from "./OvertimeTracker";
import MemoBoard from "./MemoBoard";
import styles from "./PayrollDashboard.module.css";

const PayrollDashboard = ({ employee }) => {
  const {
    name,
    baseSalary,
    overtimeShifts,
    fieldHours,
    hourlyRate,
  } = employee;

  const netSalary = calculateSalary(baseSalary);
  const fieldBonus = getFieldWorkBonus(fieldHours, hourlyRate);

  return (
    <div className={styles.payrollDashboard}>
      <h2>💼 Payroll Summary for {name}</h2>

      <div className={styles.salarySection}>
        <p><strong>Base Salary:</strong> €{baseSalary}</p>
        <p><strong>Net Salary (after tax):</strong> €{netSalary}</p>
        <p><strong>Field Work Bonus:</strong> €{fieldBonus}</p>
      </div>

      <div className={styles.overtimeTracker}>
        <OvertimeTracker shifts={overtimeShifts} baseRate={hourlyRate} />
      </div>

      <div className={styles.memoBoard}>
        <MemoBoard />
      </div>
    </div>
  );
};

export default PayrollDashboard;

