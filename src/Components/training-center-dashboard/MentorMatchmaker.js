import React, { useState } from "react";

const MentorMatchmaker = ({ mentors = [], students = [] }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [matchedMentor, setMatchedMentor] = useState(null);

  const matchMentor = () => {
    if (!selectedStudent) return;
    const student = students.find((s) => s.id === selectedStudent);
    const compatibleMentor = mentors.find(
      (mentor) =>
        mentor.specialty === student.goal &&
        mentor.available
    );
    setMatchedMentor(compatibleMentor || null);
  };

  return (
    <div className="mentor-matchmaker">
      <h2>🧩 Mentor Matchmaker</h2>
      <p>Match trainees with mentors who share spiritual and professional interests.</p>

      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name} ({student.goal})
          </option>
        ))}
      </select>
      <button onClick={matchMentor}>Find Mentor</button>

      {matchedMentor ? (
        <div className="match-result">
          <h4>Matched Mentor:</h4>
          <p>{matchedMentor.name} — {matchedMentor.specialty}</p>
        </div>
      ) : (
        <p>No mentor matched. Try adjusting criteria.</p>
      )}
    </div>
  );
};

export default MentorMatchmaker;

