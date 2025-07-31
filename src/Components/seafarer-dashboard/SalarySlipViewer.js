import React, { useEffect, useState } from 'react';
import { getSalarySlips } from '../../services/payrollAPI';

export default function SalarySlipViewer({ wsrnId }) {
  const [slips, setSlips] = useState([]);

  useEffect(() => {
    getSalarySlips(wsrnId).then(setSlips);
  }, [wsrnId]);

  return (
    <div className="salary-slip-panel">
      <h3>💼 Salary History</h3>
      <ul>
        {slips.map(slip => (
          <li key={slip.month}>
            {slip.month} {slip.year} — <a href={slip.url} target="_blank">Download PDF</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

