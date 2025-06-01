import React, { useState } from "react";

export default function VideoInterviewTool({ userRole = "admin" }) {
  const [interviews, setInterviews] = useState([
    {
      id: "INT0001",
      applicantName: "John Doe",
      nationality: "Philippines",
      vesselType: "Container Ship",
      position: "Deck Officer",
      scheduledDate: "2025-04-20T10:00:00",
      mode: "Zoom",
      status: "Scheduled",
      notes: "STCW and GMDSS verified"
    },
    {
      id: "INT0002",
      applicantName: "Carlos Mendes",
      nationality: "Brazil",
      vesselType: "Oil Tanker",
      position: "Engine Room Rating",
      scheduledDate: "2025-04-22T14:00:00",
      mode: "Google Meet",
      status: "Pending",
      notes: "Waiting for availability"
    }
  ]);

  const [formData, setFormData] = useState({
    applicantName: "",
    nationality: "",
    vesselType: "",
    position: "",
    date: "",
    time: "10:00",
    mode: "Zoom",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.applicantName || !formData.vesselType || !formData.position || !formData.date) {
      alert("Please fill all required fields.");
      return;
    }

    const newInterview = {
      id: `INT${String(interviews.length + 1).padStart(4, "0")}`,
      ...formData,
      scheduledDate: `${formData.date}T${formData.time}:00`,
      status: "Scheduled"
    };

    setInterviews([...interviews, newInterview]);
    alert(`✅ Interview ${newInterview.id} has been scheduled.`);
    
    // Clear form after submission
    setFormData({
      applicantName: "",
      nationality: "",
      vesselType: "",
      position: "",
      date: "",
      time: "10:00",
      mode: "Zoom",
      notes: ""
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      setInterviews(interviews.filter(i => i.id !== id));
    }
  };

  const handleSendInvite = (interview) => {
    alert(`📧 Invite sent to ${interview.applicantName} for interview on ${interview.scheduledDate}`);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Video Interview Tool</h2>
      
      {/* Form to schedule new interview */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
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
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Nationality</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 rounded"
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
            <select
              name="vesselType"
              value={formData.vesselType}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Vessel</option>
              <option value="Oil Tanker">Oil / Gas Tanker</option>
              <option value="Container Ship">Container Ship</option>
              <option value="Cruise Ship">Cruise Ship</option>
              <option value="Bulk Carrier">Bulk Carrier</option>
              <option value="Passenger Vessel">Passenger Vessel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Deck Officer, AB Seaman, etc."
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Interview Mode</label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="Zoom">Zoom</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="Google Meet">Google Meet</option>
              <option value="In Person">In Person</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Interview Date</label>
            <input
              type="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Notes / Instructions</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any instructions for the applicant..."
            className="w-full p-3 bg-gray-800 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          📅 Schedule Interview
        </button>
      </form>

      {/* List of Scheduled Interviews */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Scheduled Interviews ({interviews.length})</h3>
        
        {interviews.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Applicant</th>
                <th className="text-left p-2">Vessel / Position</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview, index) => {
                const date = new Date(interview.scheduledDate);
                const formattedDate = date.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });

                return (
                  <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3">{interview.applicantName}</td>
                    <td className="py-3">{interview.vesselType} – {interview.position}</td>
                    <td className="py-3 text-gray-400">{formattedDate}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        interview.status === "Scheduled" ? "bg-green-900/30 text-green-400" :
                        interview.status === "Completed" ? "bg-blue-900/30 text-blue-400" :
                        interview.status === "Missed" ? "bg-red-900/30 text-red-400" :
                        "bg-yellow-900/30 text-yellow-400"
                      }`}>
                        {interview.status}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-3">
                      <button
                        onClick={() => handleSendInvite(interview)}
                        className="text-green-400 hover:text-green-300 text-sm"
                      >
                        📧 Send Invite
                      </button>
                      <button
                        onClick={() => alert(`Edit Interview ${interview.id}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        🖊 Edit
                      </button>
                      <button
                        onClick={() => handleDelete(interview.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No interviews scheduled yet.</p>
        )}
      </section>
    </div>
  );
}