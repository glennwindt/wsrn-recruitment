import React from "react";

const EthicsAuditLog = ({ logs = [] }) => {
  return (
    <div className="ethics-audit-log">
      <h2>🕊️ Ethics Audit Log</h2>
      <p>Track ethics-related events across the WSRN system. This log supports transparency, accountability, and restorative action.</p>

      {logs.length === 0 ? (
        <p>No ethics events recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Entity</th>
              <th>Issue</th>
              <th>Resolution</th>
              <th>Reviewed By</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry, idx) => (
              <tr key={idx}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.entity}</td>
                <td>{entry.issue}</td>
                <td>{entry.resolution || "Pending"}</td>
                <td>{entry.reviewer || "Unassigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EthicsAuditLog;

