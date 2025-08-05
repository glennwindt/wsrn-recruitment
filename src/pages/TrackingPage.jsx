import React from "react";
import TaskDashboard from "../components/TaskDashboard"; // ✅ Correct component

export default function TrackingPage() {
  return (
    <div className="tracking-page">
      <TaskDashboard />
    </div>
  );
}

