import React from "react";
import { Helmet } from "react-helmet";
import DashboardSidebar from "../DashboardSidebar";
import "../../styles/dashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <Helmet>
        <title>WSRN Admin Dashboard</title>
        <meta name="description" content="Control panel for WSRN administrators. Manage users, verify agencies and shipping, access recruitment tools and compliance systems." />
      </Helmet>

      <DashboardSidebar userRole="admin" />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage users, verify listings, access recruitment and legal compliance systems.</p>
        </header>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">👥 User Management</h2>
            <ul className="feature-list">
              <li>View and manage seafarers</li>
              <li>Approve agency registrations</li>
              <li>Verify shipping company listings</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">📋 Recruitment Tools</h2>
            <ul className="feature-list">
              <li>AI-powered applicant matching</li>
              <li>Interview scheduling system</li>
              <li>Document verification center</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">⚖️ Payroll & Legal Compliance</h2>
            <ul className="feature-list">
              <li>NIF/NISS/Visa application tracking</li>
              <li>Segurança Social reporting</li>
              <li>AIMA compliance management</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">📣 Notifications & Messaging</h2>
            <ul className="feature-list">
              <li>Push via FCM</li>
              <li>Email/SMS alerts</li>
              <li>Certificate expiry reminders</li>
            </ul>
          </div>
        </section>

        <footer className="dashboard-footer">
          <p>&copy; {new Date().getFullYear()} WSRN – Administrative Excellence for Maritime Visionaries</p>
        </footer>
      </main>
    </div>
  );
}

