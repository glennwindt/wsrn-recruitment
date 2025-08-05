import React from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";

export default function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="owner-dashboard">
      <h1>🚀 WSRN Owner Dashboard</h1>
      <p>Welcome, Glenn. Your command center is ready.</p>

      <div className="dashboard-links">
        <button onClick={() => navigate("/admin/staff")}>👥 Staff Management</button>
        <button onClick={() => navigate("/admin/upgrade")}>🔧 Upgrade Center</button>
        <button onClick={() => navigate("/admin/copilot-lab")}>🧠 Copilot Lab</button>
        <button onClick={() => navigate("/admin/logs")}>📊 System Logs</button>
        <button onClick={() => navigate("/admin/devtools")}>🧪 Experimental Workspace</button>
      </div>
    </div>
  );
}

