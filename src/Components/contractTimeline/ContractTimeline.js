import React from 'react';
import dayjs from 'dayjs';
import './ContractTimeline.css';

const ContractTimeline = ({ startDate, rotation, documentExpiries }) => {
  const cycles = [];
  const maxCycles = 5;

  for (let i = 0; i < maxCycles; i++) {
    const onboard = dayjs(startDate).add(i * (rotation.on + rotation.off), 'month');
    const offboard = onboard.add(rotation.on, 'month');
    cycles.push({ onboard, offboard });
  }

  return (
    <div className="timeline">
      <h4>🚢 Rotation Timeline</h4>
      <ul className="timeline-list">
        {cycles.map((cycle, idx) => {
          const alerts = documentExpiries
            .filter(expiry => {
              const date = dayjs(expiry.date);
              return date.isAfter(cycle.onboard.subtract(60, 'day')) && date.isBefore(cycle.offboard);
            })
            .map(doc => doc.name);

          return (
            <li key={idx} className="timeline-block">
              <span>{cycle.onboard.format('MMM YYYY')} → {cycle.offboard.format('MMM YYYY')}</span>
              {alerts.length > 0 && (
                <div className="timeline-alerts">
                  ⚠️ Documents expiring: {alerts.join(', ')}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContractTimeline;

