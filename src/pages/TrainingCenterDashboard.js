import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function TrainingCenterDashboard() {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
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

    setStudents([newStudent, ...students]);
    alert(`✅ ${newStudent.name} has been added to your class.`);

    setFormData({
      name: "",
      nationality: "",
      courseEnrolled: "",
      expectedCertificationDate: "",
      status: "In Progress"
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents(students.filter((s) => s.id !== id));
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
      <Helmet>
        <title>WSRN Training Dashboard | Maritime School Portal</title>
        <meta name="description" content="Register and manage seafarer trainees through WSRN's certified platform. Track certifications, placements, and school partnerships." />
      </Helmet>

      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">WSRN – Training Center Dashboard</h1>
        <p className="mt-2 text-gray-400">Submit and track seafarer students preparing for certification.</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="p-3 bg-gray-700 rounded" required />
            <select name="nationality" value={formData.nationality} onChange={handleChange} className="p-3 bg-gray-700 rounded" required>
              <option value="">Select Nationality</option>
              {["Portugal", "Philippines", "India", "Brazil", "Netherlands", "Indonesia", "Spain"].map((nation) => (
                <option key={nation}>{nation}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select name="courseEnrolled" value={formData.courseEnrolled} onChange={handleChange} className="p-3 bg-gray-700 rounded" required>
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input type="date" name="expectedCertificationDate" value={formData.expectedCertificationDate} onChange={handleChange} className="p-3 bg-gray-700 rounded" />
            <select name="status" value={formData.status} onChange={handleChange} className="p-3 bg-gray-700 rounded">
              <option>In Progress</option>
              <option>Completed</option>
              <option>Withdrawn</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded">
            🎓 Add Student to WSRN Network
          </button>
        </form>

        <section>
          <h3 className="text-xl font-semibold mb-4">Students Under Training ({students.length})</h3>

          {students.length > 0 ? (
            <table className="w-full table-auto border-collapse mb-6">
              <thead>
                <tr className="border-b border-gray-700">
                  <th>Name</th><th>Course</th><th>Enrollment Date</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td>{s.name}</td>
                    <td>{s.courseEnrolled}</td>
                    <td className="text-right text-gray-400">{s.enrollmentDate}</td>
                    <td className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        s.status === "Completed" ? "bg-green-900/30 text-green-400"
                        : s.status === "Withdrawn" ? "bg-red-900/30 text-red-400"
                        : "bg-yellow-900/30 text-yellow-400"
                      }`}>{s.status}</span>
                    </td>
                    <td className="text-right space-x-3">
                      <button className="text-blue-400 text-sm" onClick={() => alert(`Edit ${s.id}`)}>🖊 Edit</button>
                      <button className="text-red-400 text-sm" onClick={() => handleDelete(s.id)}>❌ Delete</button>
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

