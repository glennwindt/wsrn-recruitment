import React from "react";

const CrewRetentionLog = ({ retentionData = [] }) => {
  return (
    <div className="crew-retention-log">
      <h2>📈 Crew Retention Log</h2>
      <p>
        Track crew tenure, re-engagement rates, and retention strategies across your fleet. Use this log to identify patterns and improve crew loyalty.
      </p>

      {retentionData.length === 0 ? (
        <p>No retention data available yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Seafarer Name</th>
              <th>Vessel</th>
              <th>Position</th>
              <th>First Joined</th>
              <th>Last Contract</th>
              <th>Retention Status</th>
            </tr>
          </thead>
          <tbody>
            {retentionData.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.name}</td>
                <td>{entry.vessel}</td>
                <td>{entry.position}</td>
                <td>{new Date(entry.firstJoined).toLocaleDateString()}</td>
                <td>{new Date(entry.lastContract).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${entry.status || "active"}`}>
                    {entry.status || "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrewRetentionLog;

