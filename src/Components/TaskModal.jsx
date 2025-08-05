// src/components/TaskModal.jsx
import React from "react";

export default function TaskModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Task Details</h3>
        <p><strong>Task:</strong> {task.task}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Assigned To:</strong> {task.assignedTo}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

