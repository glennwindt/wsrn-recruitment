import React from "react";

const FlagStateCompliance = ({ vessels = [] }) => {
  return (
    <div className="flag-state-compliance">
      <h2>🏴‍☠️ Flag State Compliance</h2>
      <p>
        Track vessel compliance with flag state regulations, inspection schedules, and certification status. Stay ahead of audits and ensure seaworthiness.
      </p>

      {vessels.length === 0 ? (
        <p>No vessel data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vessel Name</th>
              <th>Flag State</th>
              <th>Last Inspection</th>
              <th>Next Due</th>
              <th>Compliance Status</th>
            </tr>
          </thead>
          <tbody>
            {vessels.map((vessel, idx) => (
              <tr key={idx}>
                <td>{vessel.name}</td>
                <td>{vessel.flag}</td>
                <td>{new Date(vessel.lastInspection).toLocaleDateString()}</td>
                <td>{new Date(vessel.nextInspection).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${vessel.status || "pending"}`}>
                    {vessel.status || "Pending"}
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

export default FlagStateCompliance;

