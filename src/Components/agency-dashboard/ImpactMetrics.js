import React from "react";

const ImpactMetrics = ({ data = {} }) => {
  const {
    placements = 0,
    blessingsShared = 0,
    safetyWorkshops = 0,
    ethicsTrainingCompleted = 0,
    prayersLogged = 0,
  } = data;

  return (
    <div className="impact-metrics">
      <h2>🌍 Agency Impact Metrics</h2>
      <p>Celebrate the measurable outcomes of your agency’s efforts across both practical and spiritual dimensions.</p>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>{placements}</h3>
          <p>Seafarers Successfully Placed</p>
        </div>
        <div className="metric-card">
          <h3>{blessingsShared}</h3>
          <p>Blessings Shared via Platform</p>
        </div>
        <div className="metric-card">
          <h3>{safetyWorkshops}</h3>
          <p>Safety Workshops Conducted</p>
        </div>
        <div className="metric-card">
          <h3>{ethicsTrainingCompleted}</h3>
          <p>Ethics Training Completions</p>
        </div>
        <div className="metric-card">
          <h3>{prayersLogged}</h3>
          <p>Prayers Logged Across Fleet</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;

