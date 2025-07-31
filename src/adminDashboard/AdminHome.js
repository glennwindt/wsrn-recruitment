// src/adminDashboard/AdminHome.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const { user } = useAuth();

  if (user?.role !== "owner") {
    return <p>Access denied. This panel is for authorized admins only.</p>;
  }

  return (
    <div className="admin-home">
      <h2>🛠️ Admin Control Panel</h2>
      <p>Welcome, {user.displayName || "Admin"}!</p>

      <ul style={{ marginTop: "1rem" }}>
        <li>
          <Link to="/system">🩺 View System Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/tools">⚙️ Manage Tools & Flags</Link>
        </li>
        <li>
          <Link to="/admin/staff">👥 Authorize Technical Staff</Link>
        </li>
        <li>
          <Link to="/admin/logs">📜 View Access Logs</Link>
        </li>
      </ul>
    </div>
  );
}

