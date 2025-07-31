import React, { useState } from "react";

export default function UrgencyAlertButton({ recipientType = "agency", role = "admin" }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    urgentLevel: "High",
    recipient: "",
    sound: "default.mp3"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.message || !formData.recipient) {
      alert("Please fill all required fields.");
      return;
    }

    const newAlert = {
      id: `URG${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      ...formData,
      date: new Date().toISOString(),
      read: false
    };

    // In real app, this would send via Firebase Cloud Messaging
    console.log("🔔 Sending alert:", newAlert);

    // Play urgency sound
    playSound(formData.sound);

    alert(`🚨 Urgency alert sent to ${formData.recipient}`);

    // Clear form
    setFormData({
      title: "",
      message: "",
      urgentLevel: "High",
      recipient: "",
      sound: "default.mp3"
    });
    setShowModal(false);
  };

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <>
      {/* Alert Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-50 animate-pulse"
        aria-label="Send Urgency Alert"
      >
        <span className="text-xl">🚨</span>
      </button>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl">
            <h3 className="text-xl font-semibold mb-4">🚨 Send Urgency Alert</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Visa Expiring | Crew Movement Detected"
                  className="w-full p-3 bg-gray-700 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Recipient</label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  placeholder="Agency / Shipping Company / Staff"
                  className="w-full p-3 bg-gray-700 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the urgency..."
                  className="w-full p-3 bg-gray-700 rounded"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Severity Level</label>
                  <select
                    name="urgentLevel"
                    value={formData.urgentLevel}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">🔥 Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Custom Ringtone</label>
                  <select
                    name="sound"
                    value={formData.sound}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 rounded"
                  >
                    <option value="default.mp3">🔔 Standard Alarm</option>
                    <option value="critical.mp3">🚨 High Priority</option>
                    <option value="custom.mp3">🎵 Custom Upload</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                >
                  🔔 Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}