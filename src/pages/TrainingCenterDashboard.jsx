import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function TrainingCenterDashboard({ userRole = "training_center" }) {
  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "John Doe",
      nationality: "Philippines",
      courseEnrolled: "Basic Safety",
      enrollmentDate: new Date().toISOString().split("T")[0],
      expectedCertificationDate: "2025-06-30",
      status: "In Progress"
    },
    {
      id: "STU002",
      name: "Carlos Mendes",
      nationality: "Brazil",
      courseEnrolled: "GMDSS",
      enrollmentDate: "2025-04-10",
      expectedCertificationDate: "2025-07-15",
      status: "Pending"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    courseEnrolled: "",
    expectedCertificationDate: "",
    status: "In Progress"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.nationality || !formData.courseEnrolled) {
      alert("Please fill all required fields.");
      return;
    }

    const newStudent = {
      id: `STU${String(students.length + 1).padStart(3, "0")}`,
      ...formData,
      enrollmentDate: new Date().toISOString().split("T")[0]
    };

    try {
      await addDoc(collection(db, "training-students"), newStudent);
      setStudents([newStudent, ...students]);
      alert(`✅ ${newStudent.name} has been added to your class.`);
    } catch (err) {
      console.error("❌ Failed to save student:", err);
      alert("⚠️ There was an error saving this student.");
    }

    // Reset form after submission
    setFormData({
      name: "",
      nationality: "",
      courseEnrolled: "",
      expectedCertificationDate: "",
      status: "In Progress"
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this student from your list?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const courses = [
    "Basic Safety",
    "STCW",
    "Medical Fitness",
    "GMDSS",
    "Cargo Handling",
    "Engine Rating",
    "Bridge Watchkeeping",
    "River Navigation",
    "Inland Vessel Certification"
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">WSRN – Training Center Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Submit and track seafarer students preparing for certification.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {/* Add New Student */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Nationality</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded"
              >
                <option value="">Select Nationality</option>
                <option value="Portugal">Portugal</option>
                <option value="Philippines">Philippines</option>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Spain">Spain</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2">Course Enrolled</label>
              <select
                name="courseEnrolled"
                value={formData.courseEnrolled}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded"
              >
                <option value="">Select Course</option>
                {courses.map((course, i) => (
                  <option key={i} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Expected Certification Date</label>
              <input
                type="date"
                name="expectedCertificationDate"
                value={formData.expectedCertificationDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Current Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
          >
            🎓 Add Student to WSRN Network
          </button>
        </form>

        {/* List of Students */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Students Under Training ({students.length})</h3>

          {students.length > 0 ? (
            <table className="w-full table-auto border-collapse mb-6">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Course</th>
                  <th className="text-right p-2">Enrollment Date</th>
                  <th className="text-right p-2">Status</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3">{student.name}</td>
                    <td className="py-3">{student.courseEnrolled}</td>
                    <td className="py-3 text-right text-gray-400">{student.enrollmentDate}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        student.status === "In Progress" ? "bg-yellow-900/30 text-yellow-400" :
                        student.status === "Completed" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-3">
                      <button
                        onClick={() => alert(`Edit ${student.id}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        🖊 Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="italic text-gray-400">No students currently enrolled.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500 max-w-6xl mx-auto">
        <p>&copy; {new Date().getFullYear()} WSRN – Built with ❤️ in Portugal</p>
        <p className="mt-2 text-sm">For global maritime staffing and legal compliance</p>
      </footer>
    </div>
  );
}