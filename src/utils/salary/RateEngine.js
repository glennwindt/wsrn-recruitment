// src/utils/salary/RateEngine.js

import { isHoliday } from '../portugueseHolidays.js'; // ⬅️ updated path

export function getPortugueseTaxRate(grossSalary) {
  // Simplified progressive tax brackets (2025)
  if (grossSalary <= 710) return grossSalary * 0.145;
  if (grossSalary <= 1000) return grossSalary * 0.175;
  if (grossSalary <= 1500) return grossSalary * 0.20;
  if (grossSalary <= 2500) return grossSalary * 0.28;
  if (grossSalary <= 4000) return grossSalary * 0.37;
  return grossSalary * 0.48;
}

export async function getOvertimeRate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday

  if (await isHoliday(dateStr)) return 2.0;
  if (day === 0 || day === 6) return 2.0; // Weekend
  return 1.25; // Weekday first hour, handled in SalaryCalculator
}

export function getFieldWorkBonus(hours, baseRate) {
  const bonusRate = 0.15; // 15% bonus for field work
  return +(hours * baseRate * bonusRate).toFixed(2);
}

