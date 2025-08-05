// src/utils/salary/SalaryCalculator.js

import baseSalaries from './salaryData.js';
import { getPortugueseTaxRate } from './RateEngine.js';
import { isHoliday } from '../portugueseHolidays.js'; // ⬅️ updated path

const SS_EMPLOYEE_RATE = 0.11;
const SS_EMPLOYER_RATE = 0.2375;
const MEAL_ALLOWANCE_DAILY = 5.2;
const WORK_DAYS_PER_MONTH = 22;

export function calculateSalary({ grossSalary, netTarget, overtimeHours = 0, fieldBonus = 0 }) {
  const salary = { ...baseSalaries };

  salary.grossSalary = grossSalary || reverseCalculateGross(netTarget);
  salary.segurancaSocial = +(salary.grossSalary * SS_EMPLOYEE_RATE).toFixed(2);
  salary.mealAllowance = +(MEAL_ALLOWANCE_DAILY * WORK_DAYS_PER_MONTH).toFixed(2);

  salary.incomeTax = +(getPortugueseTaxRate(salary.grossSalary)).toFixed(2);
  salary.overtimePay = +(calculateOvertime(salary.grossSalary, overtimeHours)).toFixed(2);
  salary.fieldBonus = +fieldBonus;

  salary.netSalary = +(
    salary.grossSalary -
    salary.segurancaSocial -
    salary.incomeTax +
    salary.overtimePay +
    salary.fieldBonus
  ).toFixed(2);

  salary.employerCost = +(
    salary.grossSalary * (1 + SS_EMPLOYER_RATE) +
    salary.mealAllowance +
    salary.overtimePay +
    salary.fieldBonus
  ).toFixed(2);

  return salary;
}

function reverseCalculateGross(netTarget) {
  const estimatedGross = netTarget / 0.75;
  return +estimatedGross.toFixed(2);
}

function calculateOvertime(baseSalary, hours) {
  const hourlyRate = baseSalary / (WORK_DAYS_PER_MONTH * 8);
  let overtimePay = 0;

  for (let i = 1; i <= hours; i++) {
    if (i === 1) overtimePay += hourlyRate * 1.25;
    else overtimePay += hourlyRate * 1.5;
  }

  return overtimePay;
}

