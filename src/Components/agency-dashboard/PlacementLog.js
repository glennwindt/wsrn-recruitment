import React from "react";

const PlacementLog = ({ placements = [] }) => {
  return (
    <div className="placement-log">
      <h2>📋 Crew Placement Log</h2>
      <p>Review all successful crew assignments managed by your agency.</p>

      {placements.length === 0 ? (
        <p>No placements recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Seafarer Name</th>
              <th>Vessel</th>
              <th>Position</th>
              <th>Placement Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.name}</td>
                <td>{entry.vessel}</td>
                <td>{entry.position}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
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

export default PlacementLog;

