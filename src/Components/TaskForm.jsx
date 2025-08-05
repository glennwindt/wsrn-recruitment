// src/components/TaskForm.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function TaskForm({ setTasks }) {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!taskName) return;

    const newTask = {
      rank: 99,
      task: taskName,
      status: "pending",
      assignedTo: "Glenn",
    };

    await addDoc(collection(db, "wsrnTasks"), newTask);
    setTasks(prev => [...prev, newTask]);
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task name"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

