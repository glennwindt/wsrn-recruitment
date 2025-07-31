import React, { useState } from "react";

const SpiritualGoalTracker = ({ initialGoals = [] }) => {
  const [goals, setGoals] = useState(initialGoals);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const entry = {
      content: newGoal,
      achieved: false,
      dateSet: new Date().toISOString(),
    };
    setGoals([entry, ...goals]);
    setNewGoal("");
  };

  const toggleGoal = (index) => {
    const updated = [...goals];
    updated[index].achieved = !updated[index].achieved;
    setGoals(updated);
  };

  return (
    <div className="spiritual-goal-tracker">
      <h2>🎯 Spiritual Goal Tracker</h2>
      <p>Define your spiritual milestones and reflect on your growth throughout the training journey.</p>

      <input
        type="text"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        placeholder="e.g., Lead daily prayer group"
      />
      <button onClick={addGoal}>Add Goal</button>

      <ul className="goal-list">
        {goals.map((goal, idx) => (
          <li key={idx} className={goal.achieved ? "completed" : ""}>
            <span>{goal.content}</span>
            <button onClick={() => toggleGoal(idx)}>
              {goal.achieved ? "Undo" : "Mark Achieved"}
            </button>
            <small>Set on: {new Date(goal.dateSet).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpiritualGoalTracker;

