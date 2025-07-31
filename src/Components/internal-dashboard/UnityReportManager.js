import React, { useState } from "react";

const UnityReportManager = ({ initialReports = [] }) => {
  const [reports, setReports] = useState(initialReports);
  const [newReport, setNewReport] = useState("");

  const handleAdd = () => {
    if (!newReport.trim()) return;
    const report = {
      content: newReport,
      date: new Date().toISOString(),
      entities: ["Fleet", "Agency", "Training Center"], // Example tags
    };
    setReports([report, ...reports]);
    setNewReport("");
  };

  return (
    <div className="unity-report-manager">
      <h2>📘 Unity Report Manager</h2>
      <p>
        Document cross-entity collaborations, shared initiatives, and unity-building efforts across WSRN. This module celebrates teamwork and collective impact.
      </p>

      <textarea
        value={newReport}
        onChange={(e) => setNewReport(e.target.value)}
        placeholder="Describe a collaborative effort or unity initiative..."
        rows={3}
      />
      <button onClick={handleAdd}>Add Report</button>

      <ul className="unity-reports">
        {reports.map((entry, idx) => (
          <li key={idx}>
            <span className="report-date">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <p>{entry.content}</p>
            {entry.entities && (
              <small>Entities Involved: {entry.entities.join(", ")}</small>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnityReportManager;

