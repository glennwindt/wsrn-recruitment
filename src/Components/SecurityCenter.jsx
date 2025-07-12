import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../../styles/dashboard.css";

// 🔐 Simulated breach data (replace with dynamic API later)
const breachEvents = [
  { id: 1, timestamp: "2025-07-10 13:32", type: "Unauthorized login attempt", account: "agency@wsrn.pt", severity: "medium" },
  { id: 2, timestamp: "2025-07-10 14:21", type: "Document tampering alert", account: "shipco@wsrn.pt", severity: "high" },
];

export default function SecurityCenter() {
  const [breachAlert, setBreachAlert] = useState(false);

  useEffect(() => {
    if (breachEvents.length > 0) {
      setBreachAlert(true);
      // Optional: Trigger sound or animation here if needed
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>WSRN Security Center</title>
        <meta name="description" content="Real-time system security alerts, breach logs and audit insights for platform administrators." />
      </Helmet>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>🛡️ Security Center</h1>
          <p>Monitor breaches, suspicious activity, and system integrity across all WSRN roles.</p>
        </header>

        {/* 🔔 Breach Alert Banner */}
        {breachAlert && (
          <section className="dashboard-card">
            <h3 className="section-title">🚨 Active Security Alerts</h3>
            <p className="alert-badge">
              ⚠️ {breachEvents.length} potential breach{breachEvents.length > 1 ? "es" : ""} detected. Immediate review recommended.
            </p>
          </section>
        )}

        {/* 📊 Breach Event Table */}
        <section className="dashboard-card">
          <h3 className="section-title">📋 Breach Logs</h3>
          <table style={{ width: "100%", fontSize: "0.95rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#eee" }}>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Timestamp</th>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Type</th>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Account</th>
                <th style={{ padding: "0.5rem", textAlign: "left" }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {breachEvents.map((event) => (
                <tr key={event.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "0.5rem" }}>{event.timestamp}</td>
                  <td style={{ padding: "0.5rem" }}>{event.type}</td>
                  <td style={{ padding: "0.5rem" }}>{event.account}</td>
                  <td style={{ padding: "0.5rem", color: event.severity === "high" ? "#d9534f" : "#f0ad4e" }}>
                    {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="dashboard-footer">
          <p>&copy; {new Date().getFullYear()} WSRN – Securing the Maritime Network with Trust & Technology</p>
        </footer>
      </main>
    </div>
  );
}

