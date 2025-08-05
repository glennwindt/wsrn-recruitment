import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import TaskTable from "./TaskTable";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskModal";
import "../styles/taskDashboard.css";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "wsrnTasks"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleSelectTask = task => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <main className="task-dashboard">
      {/* ✅ Reintroduced centered title */}
      <h1 className="dashboard-title">📋 Task Tracking Dashboard</h1>

      <section className="task-form-section">
        <TaskForm setTasks={setTasks} />
      </section>
      <section className="task-table-section">
        <TaskTable tasks={tasks} onSelectTask={handleSelectTask} />
      </section>
      {showModal && (
        <TaskModal
          task={selectedTask}
          onClose={() => setShowModal(false)}
          setTasks={setTasks}
        />
      )}
    </main>
  );
}

