import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar";
import "../../styles/dashboard.css";

export default function SeafarerDashboard() {
  return (
    <div className="dashboard-container">
      <Helmet>
        <title>WSRN Seafarer Dashboard</title>
        <meta
          name="description"
          content="Access your job matches, social security options, training reminders, and document upload portal with WSRN’s seafarer dashboard."
        />
      </Helmet>

      {/* Sidebar Navigation */}
      <DashboardSidebar userRole="seafarer" />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome to Your Seafarer Dashboard</h1>
          <p>
            View your career tools, legal settings, and training progress inside
            the WSRN network.
          </p>
        </header>

        {/* 📊 Analytics Summary */}
        <section className="dashboard-card">
          <h3 className="section-title">📊 Your Activity Summary</h3>
          <ul className="feature-list">
            <li>
              <strong>Matched Jobs:</strong> 14 available opportunities
            </li>
            <li>
              <strong>Training Alerts:</strong> 2 courses expiring soon
            </li>
            <li>
              <strong>Social Security:</strong> Opt-in enabled
            </li>
          </ul>
        </section>

        {/* Overview Section */}
        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">🧭 Job Matches</h2>
            <p className="card-paragraph">
              View opportunities matched by AI based on your rank and
              availability.
            </p>
            <Link to="/dashboard/jobs" className="card-link">
              View Matches →
            </Link>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">📚 Training Status</h2>
            <p className="card-paragraph">
              See refresher courses due or eligibility for advanced
              certification.
            </p>
            <Link to="/dashboard/training" className="card-link">
              View Training →
            </Link>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">⚖️ Social Security Options</h2>
            <p className="card-paragraph">
              Opt into voluntary Portuguese pension contributions (optional).
            </p>
            <Link to="/dashboard/seafarer/social-security" className="card-link">
              Configure Now →
            </Link>
          </div>
        </section>

        {/* 📁 Document Upload Section */}
        <section className="dashboard-card">
          <h3 className="section-title">📁 Document Center</h3>
          <p className="card-paragraph">
            Upload scanned copies of your STCW, medical fitness, ID and
            vaccination card.
          </p>
          <button className="dashboard-button">Upload Documents</button>
        </section>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>
            &copy; {new Date().getFullYear()} WSRN – Built for Seafarers, By
            Maritime Visionaries
          </p>
        </footer>
      </main>
    </div>
  );
}

