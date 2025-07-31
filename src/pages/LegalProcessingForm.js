import React, { useState, useEffect } from "react";
import LegalApplicationCard from "../components/LegalApplicationCard";

export default function LegalProcessingPage() {
  const [applications, setApplications] = useState([
    {
      id: "APP001",
      applicantName: "John Doe",
      nationality: "Philippines",
      vesselType: "Container Ship",
      position: "Deck Officer",
      nifStatus: "Assigned",
      nissStatus: "Active",
      aimApplicationId: "AIMA20250418-JD",
      submissionDate: "2025-04-18T10:30:00Z",
      status: "Submitted to AIMA"
    },
    {
      id: "APP002",
      applicantName: "Carlos Mendes",
      nationality: "Brazil",
      vesselType: "Oil Tanker",
      position: "Engine Room Rating",
      nifStatus: "Pending",
      nissStatus: "In Review",
      aimApplicationId: "",
      submissionDate: "",
      status: "In Progress"
    }
  ]);

  const [formData, setFormData] = useState({
    applicantName: "",
    nationality: "",
    vesselType: "",
    position: "",
    visaType: "Work Permit",
    nifNumber: "",
    nissNumber: "",
    aimApplicationId: "",
    submissionDate: new Date().toISOString().split("T")[0],
    status: "In Review"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.applicantName || !formData.nationality || !formData.vesselType || !formData.position) {
      alert("Please fill all required fields.");
      return;
    }

    const newApplication = {
      id: `APP${String(applications.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "Submitted to AIMA"
    };

    setApplications([newApplication, ...applications]);
    alert(`✅ Application ${newApplication.id} submitted to AIMA.`);
    
    // Clear form after submission
    setFormData({
      applicantName: "",
      nationality: "",
      vesselType: "",
      position: "",
      visaType: "Work Permit",
      nifNumber: "",
      nissNumber: "",
      aimApplicationId: "",
      submissionDate: new Date().toISOString().split("T")[0],
      status: "In Review"
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this legal application?")) {
      setApplications(applications.filter(a => a.id !== id));
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Legal Processing Portal</h1>
        <p className="mt-2 text-gray-400">Apply for NIF, NISS, Visa, Work Permit, AIMA submissions.</p>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        {/* Add New Legal Application */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold mb-4">New Legal Application</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Applicant Name</label>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                placeholder="Full Name"
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
              <label className="block text-sm mb-2">Vessel Type</label>
              <input
                type="text"
                name="vesselType"
                value={formData.vesselType}
                onChange={handleChange}
                placeholder="Container Ship, Oil Tanker..."
                required
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Deck Officer, Engine Room Rating"
                required
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Visa / Work Permit Type</label>
              <select
                name="visaType"
                value={formData.visaType}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded"
              >
                <option value="Work Permit">Work Permit</option>
                <option value="Residency Visa">Residency Visa</option>
                <option value="Temporary Work Authorization">Temporary Work Authorization</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-2">NIF Number</label>
              <input
                type="text"
                name="nifNumber"
                value={formData.nifNumber}
                onChange={handleChange}
                placeholder="123456789"
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">NISS Number</label>
              <input
                type="text"
                name="nissNumber"
                value={formData.nissNumber}
                onChange={handleChange}
                placeholder="12345678901"
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">AIMA Application ID</label>
              <input
                type="text"
                name="aimApplicationId"
                value={formData.aimApplicationId}
                onChange={handleChange}
                placeholder="APP000001"
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Submission Date</label>
              <input
                type="date"
                name="submissionDate"
                min={today}
                value={formData.submissionDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Current Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded"
            >
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Pending Documentation">Pending Documentation</option>
              <option value="Submitted to AIMA">Submitted to AIMA</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
          >
            📝 Submit Application
          </button>
        </form>

        {/* List of Applications */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Submitted Applications ({applications.length})</h2>

          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app, index) => (
                <LegalApplicationCard key={index} application={app} onDelete={() => handleDelete(app.id)} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded text-center">
              <p className="text-gray-400 italic">No applications submitted yet.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500 max-w-5xl mx-auto">
        <p>&copy; {new Date().getFullYear()} WSRN – Built with ❤️ in Portugal</p>
        <p className="mt-2 text-sm">For global maritime staffing and legal compliance</p>
      </footer>
    </div>
  );
}