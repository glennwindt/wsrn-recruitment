import React from "react";

const DashboardStatisticsEngine = ({ stats = {} }) => {
  const {
    totalPlacements = 0,
    activeAgencies = 0,
    complianceRate = 0,
    blessingsLogged = 0,
    ethicsFlags = 0,
    prayerCircles = 0,
  } = stats;

  return (
    <div className="dashboard-statistics-engine">
      <h2>📊 Internal Performance Overview</h2>
      <p>System-wide metrics across all WSRN entities. Updated daily.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalPlacements}</h3>
          <p>Total Crew Placements</p>
        </div>
        <div className="stat-card">
          <h3>{activeAgencies}</h3>
          <p>Active Partner Agencies</p>
        </div>
        <div className="stat-card">
          <h3>{complianceRate}%</h3>
          <p>Compliance Completion Rate</p>
        </div>
        <div className="stat-card">
          <h3>{blessingsLogged}</h3>
          <p>Blessings Logged</p>
        </div>
        <div className="stat-card">
          <h3>{ethicsFlags}</h3>
          <p>Ethics Flags Raised</p>
        </div>
        <div className="stat-card">
          <h3>{prayerCircles}</h3>
          <p>Fleet Prayer Circles</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatisticsEngine;

