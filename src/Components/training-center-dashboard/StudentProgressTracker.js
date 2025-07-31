import React, { useState } from "react";

const StudentProgressTracker = ({ students = [] }) => {
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [feedback, setFeedback] = useState("");

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="student-progress-tracker">
      <h2>📈 Student Progress Tracker</h2>
      <p>Monitor and encourage each trainee’s spiritual maturity, training involvement, and contributions.</p>

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
        <div className="progress-card">
          <h4>{selectedStudent.name}'s Progress Overview</h4>
          <ul>
            <li>Spiritual Growth: {selectedStudent.spiritualScore}/10</li>
            <li>Training Completion: {selectedStudent.trainingCompleted ? "✅" : "⏳"}</li>
            <li>Community Participation: {selectedStudent.communityPoints} pts</li>
          </ul>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide encouragement or constructive feedback..."
          />
          <button onClick={() => alert(`Saved feedback for ${selectedStudent.name}`)}>
            Save Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProgressTracker;

