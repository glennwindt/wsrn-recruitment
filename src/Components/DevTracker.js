import React, { useEffect, useState } from "react";
import {
  fetchProgressData,
  toggleTaskStatus
} from "../services/progressService";

export default function DevTracker() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);

  useEffect(() => {
    fetchProgressData().then(setTasks);
  }, []);

  const totalPoints = tasks.reduce((sum, task) => sum + task.weight, 0);
  const earnedPoints = tasks.reduce(
    (sum, task) => sum + (task.status === "✅" ? task.weight : 0),
    0
  );
  const scorePercent = totalPoints
    ? Math.round((earnedPoints / totalPoints) * 100)
    : 0;

  const filteredTasks = filterStatus
    ? tasks.filter(task => task.status === filterStatus)
    : tasks;

  function handleStatusToggle(id, currentStatus) {
    const options = ["✅", "⏳", "❌"];
    const next = prompt(`Current status: ${currentStatus}\nEnter new status (✅ ⏳ ❌):`);

    if (options.includes(next)) {
      toggleTaskStatus(id, next).then(() =>
        fetchProgressData().then(setTasks)
      );
    } else {
      alert("❌ Invalid input. Use: ✅, ⏳, or ❌.");
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "✅": return "green";
      case "⏳": return "orange";
      case "❌": return "red";
      default: return "gray";
    }
  }

  return (
    <div className="dev-tracker">
      <h2>🧭 WSRN Build Progress: {scorePercent}%</h2>

      <div className="filter-buttons" style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilterStatus(null)}>All</button>{" "}
        <button onClick={() => setFilterStatus("✅")}>Complete ✅</button>{" "}
        <button onClick={() => setFilterStatus("⏳")}>In Progress ⏳</button>{" "}
        <button onClick={() => setFilterStatus("❌")}>Incomplete ❌</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <strong
              onClick={() => handleStatusToggle(task.id, task.status)}
              style={{
                cursor: "pointer",
                marginRight: "8px",
                color: getStatusColor(task.status),
                fontWeight: "bold"
              }}
              title={`Click to change status from ${task.status}`}
            >
              {task.status}
            </strong>
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

