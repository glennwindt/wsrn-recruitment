// src/components/OvertimeTracker.js

import React, { useState, useEffect } from "react";
import { getOvertimeRate } from "../utils/salary/RateEngine";

const OvertimeTracker = ({ shifts, baseRate }) => {
  const [overtimeSummary, setOvertimeSummary] = useState([]);

  useEffect(() => {
    const calculateOvertime = async () => {
      const summary = [];

      for (const shift of shifts) {
        const { date, hours } = shift;
        const rate = await getOvertimeRate(date);
        const adjustedPay = +(hours * baseRate * rate).toFixed(2);

        summary.push({
          date,
          hours,
          rate,
          adjustedPay,
          label:
            rate === 2.0
              ? "Holiday/Weekend"
              : rate === 1.25
              ? "Weekday Overtime"
              : "Standard",
        });
      }

      setOvertimeSummary(summary);
    };

    calculateOvertime();
  }, [shifts, baseRate]);

  return (
    <div className="overtime-tracker">
      <h3>Overtime Summary</h3>
      <table className="overtime-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Rate</th>
            <th>Adjusted Pay (€)</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {overtimeSummary.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.date}</td>
              <td>{entry.hours}</td>
              <td>{entry.rate}x</td>
              <td>{entry.adjustedPay}</td>
              <td>{entry.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OvertimeTracker;

