import React from 'react';

const CrewArchiveViewer = ({ crewHistory }) => {
  return (
    <div className="archive-viewer">
      <h3>Crew Archive: {crewHistory.fullName}</h3>

      <section>
        <h4>Status History</h4>
        <ul>
          {crewHistory.statusHistory.map((entry, index) => (
            <li key={index}>
              {entry.status} — {new Date(entry.changedAt).toLocaleDateString()} by {entry.changedBy} ({entry.reason})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Agency History</h4>
        <ul>
          {crewHistory.agencyHistory.map((entry, index) => (
            <li key={index}>
              {entry.agencyName} ({entry.startDate} to {entry.endDate})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Shipping History</h4>
        <ul>
          {crewHistory.shippingHistory.map((entry, index) => (
            <li key={index}>
              {entry.vesselName} - {entry.rank} ({entry.startDate} to {entry.endDate})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Payroll History</h4>
        <ul>
          {crewHistory.payrollHistory.map((entry, index) => (
            <li key={index}>
              {entry.period}: €{entry.salary} (Deductions: €{entry.deductions}, Bonuses: €{entry.bonuses}) — Paid on {new Date(entry.paidOn).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CrewArchiveViewer;

