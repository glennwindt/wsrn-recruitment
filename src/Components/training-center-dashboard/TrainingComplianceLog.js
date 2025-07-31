import React, { useState } from "react";

const TrainingComplianceLog = ({ students = [], trainingModules = [] }) => {
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  const complianceMap = selectedStudent?.compliance || {};

  return (
    <div className="training-compliance-log">
      <h2>📋 Training Compliance Log</h2>
      <p>Check if trainees have completed required modules and spiritual sessions.</p>

      <select
        value={selectedStudentId}
        onChange={(e) => setSelectedStudentId(e.target.value)}
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>

      {selectedStudent && (
        <div className="compliance-overview">
          <h4>{selectedStudent.name}'s Module Compliance</h4>
          <ul>
            {trainingModules.map((mod) => (
              <li key={mod.id}>
                {mod.name}: {complianceMap[mod.id] ? "✅ Completed" : "⏳ Pending"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrainingComplianceLog;

