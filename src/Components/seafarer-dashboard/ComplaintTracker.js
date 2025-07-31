import React, { useEffect, useState } from "react";

const ComplaintTracker = ({ complaintsData = [] }) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sort complaints by newest first
    const sorted = [...complaintsData].sort((a, b) =>
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    setSortedData(sorted);
  }, [complaintsData]);

  return (
    <div className="wsrn-complaint-tracker">
      <h2>🛡️ Complaint Tracker</h2>

      {sortedData.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Details</th>
              <th>Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.category}</td>
                <td>{entry.details}</td>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${entry.status || "pending"}`}>
                    {entry.status || "Pending"}
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

export default ComplaintTracker;

