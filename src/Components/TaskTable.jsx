// src/components/TaskTable.jsx
import React from "react";

export default function TaskTable({ tasks, onSelectTask }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Task</th>
          <th>Status</th>
          <th>Assigned To</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id} onClick={() => onSelectTask(task)}>
            <td>{task.rank}</td>
            <td>{task.task}</td>
            <td className={`status-${task.status}`}>{task.status}</td>
            <td>{task.assignedTo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

