import React, { useState, useEffect } from "react";

export default function UrgencyNotificationSystem({ userRole = "admin" }) {
  const [urgentNotifications, setUrgentNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipient: "",
    urgentLevel: "High",
    sound: "alarm.mp3"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newNote = {
      id: `URG${urgentNotifications.length + 1}`,
      ...formData,
      date: new Date().toISOString(),
      read: false
    };

    setUrgentNotifications([newNote, ...urgentNotifications]);
    triggerMobileAlert(newNote);

    alert(`🚨 Urgency Alert Sent to ${newNote.recipient}`);
    setFormData({
      title: "",
      message: "",
      recipient: "",
      urgentLevel: "High",
      sound: "alarm.mp3"
    });
  };

  const triggerMobileAlert = (note) => {
    console.log("Triggering mobile alert:", note);
    // In real app, send via Firebase Cloud Messaging or Twilio
    playAlarmSound(note.sound);
  };

  const playAlarmSound = (sound) => {
    const audio = new Audio(sound); // You would upload actual .mp3 files later
    audio.play();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Urgency Alert System</h2>

      {/* Send New Urgency Alert */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Send Urgency Alert</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Visa Expiring | Payroll Issue | Crew Movement Detected"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Recipient</label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="glenn@wsrn.com, agency@shipping.pt"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Message</label>
          <textarea
            rows="3"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe the urgency..."
            className="w-full p-3 bg-gray-800 rounded"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-sm mb-2">Urgency Level</label>
            <select
              name="urgentLevel"
              value={formData.urgentLevel}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Custom Sound</label>
            <select
              name="sound"
              value={formData.sound}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="alarm.mp3">🚨 Standard Alarm</option>
              <option value="warning.mp3">⚠️ Warning Tone</option>
              <option value="custom.mp3">🎵 Custom Upload</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition"
            >
              🔔 Send Urgency Alert
            </button>
          </div>
        </div>
      </form>

      {/* Urgency History */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Urgency Alerts ({urgentNotifications.length})</h3>

        {urgentNotifications.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Recipient</th>
                <th className="text-right p-2">Severity</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urgentNotifications.map((note, index) => {
                const noteDate = new Date(note.date);
                const formattedDate = noteDate.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });

                return (
                  <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3 text-gray-400">{formattedDate}</td>
                    <td className="py-3 font-medium">{note.title}</td>
                    <td className="py-3 text-sm">{note.recipient}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        note.urgentLevel === "Low" ? "bg-gray-700 text-gray-300" :
                        note.urgentLevel === "Medium" ? "bg-yellow-900/30 text-yellow-400" :
                        note.urgentLevel === "High" ? "bg-orange-900/30 text-orange-400" :
                        note.urgentLevel === "Critical" ? "bg-red-900/30 text-red-400" : "bg-gray-700 text-gray-400"
                      }`}>
                        {note.urgentLevel}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-3">
                      <button
                        onClick={() => alert(`Re-sending to ${note.recipient}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        🔄 Re-send
                      </button>
                      <button
                        onClick={() => alert(`Mark as Resolved: ${note.title}`)}
                        className="text-green-400 hover:text-green-300 text-sm"
                      >
                        ✅ Resolve
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No urgent alerts sent yet.</p>
        )}
      </section>

      {/* Modal for Critical Alerts */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full animate-pulse">
            <h3 className="text-lg font-semibold text-red-400">🚨 Critical Alert</h3>
            <p className="mt-2">There is a critical issue requiring immediate attention:</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><strong>Title:</strong> {formData.title}</li>
              <li><strong>Recipient:</strong> {formData.recipient}</li>
              <li><strong>Message:</strong> {formData.message}</li>
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}