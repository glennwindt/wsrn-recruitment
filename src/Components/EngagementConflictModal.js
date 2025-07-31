import React from "react";

const EngagementConflictModal = ({ visible, conflictInfo, onResolve, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="conflict-modal-overlay">
      <div className="conflict-modal-content">
        <h2>🚨 Engagement Conflict Detected</h2>

        <p>
          This crew member’s profile has one or more flagged conflicts or concerns:
        </p>

        <ul>
          {(conflictInfo || []).map((conflict, idx) => (
            <li key={idx}>{conflict}</li>
          ))}
        </ul>

        <div className="modal-actions">
          <button onClick={onResolve}>Override & Proceed</button>
          <button onClick={onCancel}>Review Later</button>
        </div>
      </div>
    </div>
  );
};

export default EngagementConflictModal;

