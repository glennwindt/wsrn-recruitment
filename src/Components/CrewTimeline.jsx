import React from 'react';

const CrewTimeline = ({ crewHistory }) => {
  // Combine all events into a single timeline array
  const timelineEvents = [];

  crewHistory.statusHistory.forEach((entry) => {
    timelineEvents.push({
      type: 'Status',
      label: `${entry.status} (${entry.reason})`,
      date: new Date(entry.changedAt),
    });
  });

  crewHistory.agencyHistory.forEach((entry) => {
    timelineEvents.push({
      type: 'Agency',
      label: `Joined ${entry.agencyName}`,
      date: new Date(entry.startDate),
    });
    if (entry.endDate) {
      timelineEvents.push({
        type: 'Agency',
        label: `Left ${entry.agencyName}`,
        date: new Date(entry.endDate),
      });
    }
  });

  crewHistory.shippingHistory.forEach((entry) => {
    timelineEvents.push({
      type: 'Shipping',
      label: `Assigned to ${entry.vesselName} as ${entry.rank}`,
      date: new Date(entry.startDate),
    });
    if (entry.endDate) {
      timelineEvents.push({
        type: 'Shipping',
        label: `Left ${entry.vesselName}`,
        date: new Date(entry.endDate),
      });
    }
  });

  // Sort by date
  timelineEvents.sort((a, b) => a.date - b.date);

  return (
    <div className="crew-timeline">
      <h4>Employment Timeline</h4>
      <ul>
        {timelineEvents.map((event, index) => (
          <li key={index}>
            <strong>{event.date.toLocaleDateString()}</strong> — [{event.type}] {event.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrewTimeline;

