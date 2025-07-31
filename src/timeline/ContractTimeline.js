// src/timeline/ContractTimeline.js

import React from 'react';
import './ContractTimeline.css';

const phases = [
  { title: 'Signed', date: '2025-07-01', color: '#4caf50' },
  { title: 'Training Start', date: '2025-07-10', color: '#2196f3' },
  { title: 'Deployment', date: '2025-08-01', color: '#ff9800' },
  { title: 'Renewal Due', date: '2025-12-01', color: '#f44336' }
];

function ContractTimeline() {
  return (
    <div className="contract-timeline">
      <h2>🗓️ Contract Timeline</h2>
      <ul>
        {phases.map((phase, index) => (
          <li key={index} className="timeline-phase">
            <span className="phase-indicator" style={{ backgroundColor: phase.color }}></span>
            <div className="phase-details">
              <strong>{phase.title}</strong>
              <span>{new Date(phase.date).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContractTimeline;

