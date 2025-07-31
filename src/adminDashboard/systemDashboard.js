// src/adminDashboard/systemDashboard.js
import React, { useEffect, useState } from "react";
import { getSystemDiagnostics } from "../system/diagnosticsService";
import { useAuth } from "../context/AuthContext";

export default function SystemDashboard() {
  const { user } = useAuth();
  const [diagnostics, setDiagnostics] = useState([]);

  useEffect(() => {
    getSystemDiagnostics().then(setDiagnostics);
  }, []);

  if (
    user?.role !== "tech" && 
    user?.role !== "owner" &&
    !user?.adminAccess
  ) {
    return <p>Access denied. You are not authorized to view this dashboard.</p>;
  }

  return (
    <div className="system-dashboard">
      <h2>🩺 System Health Monitor</h2>
      <ul>
        {diagnostics.length === 0 ? (
          <p>✅ All systems are quiet. No recent issues detected.</p>
        ) : (
          diagnostics.map((entry, index) => (
            <li key={index} style={{ marginBottom: "12px" }}>
              <strong>{entry.component}</strong> — {entry.message}
              <br />
              <small>{new Date(entry.timestamp).toLocaleString()}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

