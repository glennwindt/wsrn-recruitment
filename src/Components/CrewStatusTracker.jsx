import React, { useState } from 'react';

const CrewStatusTracker = ({ crewId, currentStatus, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    const statusUpdate = {
      status: newStatus,
      changedBy: 'admin', // Replace with logged-in user
      changedAt: new Date(),
      reason,
    };

    onStatusChange(crewId, statusUpdate);
    setNewStatus('');
    setReason('');
  };

  return (
    <div className="status-tracker">
      <h3>Status Tracker</h3>
      <p>Current Status: <strong>{currentStatus}</strong></p>

      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
        <option value="">Select new status</option>
        <option value="Active">Active</option>
        <option value="Retired">Retired</option>
        <option value="Resigned">Resigned</option>
        <option value="Fired">Fired</option>
      </select>

      <input
        type="text"
        placeholder="Reason for change"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button onClick={handleSubmit}>Update Status</button>
    </div>
  );
};

export default CrewStatusTracker;

