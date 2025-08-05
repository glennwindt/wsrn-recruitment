import React from 'react';
import './SalarySummaryWidget.css'; // optional styling
import { calculateSalary } from '../../utils/salary/SalaryCalculator';
import { getBaseSalary } from '../../utils/salary/salaryData';
import './SalarySummaryWidget.css';

const SalarySummaryWidget = ({ employee }) => {
  const baseSalary = getBaseSalary(employee.vesselType, employee.role);
  const salaryDetails = calculateSalary({
    grossSalary: baseSalary,
    overtimeHours: employee.overtimeHours,
    fieldBonus: employee.fieldBonus,
  });

  return (
    <div className="salary-summary-widget">
      <h3>💼 Salary Summary</h3>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Vessel:</strong> {employee.vesselType}</p>
      <p><strong>Role:</strong> {employee.role}</p>

      <hr />

      <p><strong>Gross Salary:</strong> €{salaryDetails.grossSalary}</p>
      <p><strong>Social Security:</strong> €{salaryDetails.segurancaSocial}</p>
      <p><strong>Income Tax:</strong> €{salaryDetails.incomeTax}</p>
      <p><strong>Meal Allowance:</strong> €{salaryDetails.mealAllowance}</p>
      <p><strong>Overtime Pay:</strong> €{salaryDetails.overtimePay}</p>
      <p><strong>Field Bonus:</strong> €{salaryDetails.fieldBonus}</p>

      <hr />

      <p><strong>Net Salary:</strong> €{salaryDetails.netSalary}</p>
      <p><strong>Employer Cost:</strong> €{salaryDetails.employerCost}</p>
    </div>
  );
};

export default SalarySummaryWidget;

