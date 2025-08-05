import React, { useState } from 'react';
import CrewHistorySearch from '../components/CrewHistorySearch';
import CrewArchiveViewer from '../components/CrewArchiveViewer';
import CrewStatusTracker from '../components/CrewStatusTracker';
import SalarySlipViewer from '../components/SalarySlipViewer';
import CrewTimeline from '../components/CrewTimeline';
import DocumentHistoryViewer from '../components/DocumentHistoryViewer';
import { Roles } from '../config/Roles'; // Role definitions
import CrewInsightsPanel from './CrewInsightsPanel'; // Modular AI panel

const CrewHistoryDashboard = ({ crewData, userRole }) => {
  const [selectedCrew, setSelectedCrew] = useState(null);

  const handleStatusChange = (crewId, statusUpdate) => {
    if (userRole !== Roles.OWNER && userRole !== Roles.STAFF) {
      alert('You do not have permission to change crew status.');
      return;
    }

    const updatedCrew = { ...selectedCrew };
    updatedCrew.statusHistory.push(statusUpdate);
    setSelectedCrew(updatedCrew);
  };

  return (
    <div className="crew-dashboard">
      <h2>Crew History Dashboard</h2>

      <CrewHistorySearch crewList={crewData} onSelectCrew={setSelectedCrew} />

      {selectedCrew && (
        <>
          <CrewArchiveViewer crewHistory={selectedCrew} />
          <CrewTimeline crewHistory={selectedCrew} />

          {(userRole === Roles.OWNER || userRole === Roles.STAFF) && (
            <CrewStatusTracker
              crewId={selectedCrew.crewId}
              currentStatus={selectedCrew.statusHistory.slice(-1)[0]?.status}
              onStatusChange={handleStatusChange}
            />
          )}

          {(userRole !== Roles.AGENCY) && (
            <SalarySlipViewer payrollHistory={selectedCrew.payrollHistory} />
          )}

          <DocumentHistoryViewer documentHistory={selectedCrew.documentHistory} />

          {/* AI Insights Section */}
          <CrewInsightsPanel crew={selectedCrew} />
        </>
      )}
    </div>
  );
};

export default CrewHistoryDashboard;

