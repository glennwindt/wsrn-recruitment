import React, { useState } from "react";

export default function LegalTrackingSystem({ applicant }) {
  const [autoMode, setAutoMode] = useState(true);
  const [status, setStatus] = useState({
    sef: "Submitted",
    aima: "In Review",
    nif: "Assigned",
    niss: "Active",
    workPermit: "Approved",
    visaExpiry: "2026-09-15"
  });

  const [notificationSent, setNotificationSent] = useState(false);

  // Simulated status options
  const statusOptions = [
    "Not Started", "Submitted", "In Review", "Approved", "Rejected", "Renewal Due", "Citizen Card Applied"
  ];

  const handleStatusChange = (field, value) => {
    if (!autoMode) {
      // Manual override allowed
      setStatus(prev => ({ ...prev, [field]: value }));
    }
  };

  const checkVisaExpiry = () => {
    const visaDate = new Date(status.visaExpiry);
    const now = new Date();
    const daysLeft = Math.floor((visaDate - now) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 60 && !notificationSent) {
      setNotificationSent(true);
      alert(`⚠️ Visa for ${applicant.name} expires soon on ${visaDate.toLocaleDateString()}. Notifications have been sent.`);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Legal Application Tracking</h2>
      <p className="text-gray-400">
        Monitoring visa, NIF, NISS, SEF, and AIMA progress for seafarer: <strong>{applicant.name}</strong>
      </p>

      {/* Auto/Manual Toggle */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-700 rounded">
        <label className="font-medium">Automation Mode:</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAutoMode(true)}
            className={`px-4 py-2 rounded ${autoMode ? "bg-blue-700" : "bg-gray-700 hover:bg-gray-600"} transition`}
          >
            🔁 Automatic Processing
          </button>
          <button
            onClick={() => setAutoMode(false)}
            className={`px-4 py-2 rounded ${!autoMode ? "bg-purple-700" : "bg-gray-700 hover:bg-gray-600"} transition`}
          >
            🛠 Manual Override
          </button>
        </div>
      </div>

      {/* Status Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="font-medium">SEF Work Permit</label>
          <select
            value={status.sef}
            onChange={(e) => handleStatusChange("sef", e.target.value)}
            disabled={autoMode}
            className={`p-3 rounded ${autoMode ? "bg-gray-700 opacity-70 cursor-not-allowed" : "bg-gray-600"}`}
          >
            {statusOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
          <small className="text-gray-400">Only editable in Manual Mode</small>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="font-medium">AIMA Authorization</label>
          <select
            value={status.aima}
            onChange={(e) => handleStatusChange("aima", e.target.value)}
            disabled={autoMode}
            className={`p-3 rounded ${autoMode ? "bg-gray-700 opacity-70 cursor-not-allowed" : "bg-gray-600"}`}
          >
            {statusOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
          <small className="text-gray-400">Only editable in Manual Mode</small>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="font-medium">NIF Status</label>
          <select
            value={status.nif}
            onChange={(e) => handleStatusChange("nif", e.target.value)}
            disabled={autoMode}
            className={`p-3 rounded ${autoMode ? "bg-gray-700 opacity-70 cursor-not-allowed" : "bg-gray-600"}`}
          >
            {statusOptions.filter(opt => ["Not Started", "Generated", "Assigned"].includes(opt))}
            <option value="Not Started">🧭 Not Started</option>
            <option value="Generated">🎫 Generated</option>
            <option value="Assigned">✅ Assigned</option>
          </select>
          <small className="text-gray-400">Only editable in Manual Mode</small>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="font-medium">NISS Status</label>
          <select
            value={status.niss}
            onChange={(e) => handleStatusChange("niss", e.target.value)}
            disabled={autoMode}
            className={`p-3 rounded ${autoMode ? "bg-gray-700 opacity-70 cursor-not-allowed" : "bg-gray-600"}`}
          >
            <option value="Not Started">🧭 Not Started</option>
            <option value="Generated">🎫 Generated</option>
            <option value="Active">✅ Active</option>
            <option value="Suspended">🚫 Suspended</option>
          </select>
          <small className="text-gray-400">Only editable in Manual Mode</small>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="font-medium">Work Permit Status</label>
          <select
            value={status.workPermit}
            onChange={(e) => handleStatusChange("workPermit", e.target.value)}
            disabled={autoMode}
            className={`p-3 rounded ${autoMode ? "bg-gray-700 opacity-70 cursor-not-allowed" : "bg-gray-600"}`}
          >
            <option value="Pending">⏳ Pending</option>
            <option value="Approved">✅ Approved</option>
            <option value="Expired">🔴 Expired</option>
            <option value="Renewal Applied">🔄 Renewal Applied</option>
          </select>
          <small className="text-gray-400">Only editable in Manual Mode</small>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="font-medium">Visa Expiration Date</label>
          <input
            type="date"
            value={status.visaExpiry}
            onChange={(e) => handleStatusChange("visaExpiry", e.target.value)}
            disabled={autoMode}
            className={`p-3 rounded ${autoMode ? "bg-gray-700 opacity-70 cursor-not-allowed" : "bg-gray-600"}`}
          />
          <small className="text-gray-400">Editable only in Manual Mode</small>
        </div>
      </div>

      {/* Notification Banner */}
      {notificationSent && (
        <div className="mt-6 p-4 bg-yellow-900/30 border-l-4 border-yellow-500 rounded text-sm">
          <p className="font-semibold text-yellow-400">🔔 Reminder Sent</p>
          <p className="mt-1">
            Visa for <strong>{applicant.name}</strong> is expiring soon.
            Notifications have been sent to:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-300">
            <li>Seafarer: {applicant.email}</li>
            <li>Agency: {applicant.agencyEmail || "agency@shipping.com"}</li>
            <li>WSRN Admin: glenn@wsrn.com</li>
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={checkVisaExpiry}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded transition"
        >
          ⏳ Check Visa Status
        </button>
        <button
          type="button"
          onClick={() => alert("Application saved manually")}
          disabled={!autoMode}
          className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition ${!autoMode ? "opacity-100" : "opacity-70 cursor-not-allowed"}`}
        >
          💾 Save Changes (Manual Only)
        </button>
      </div>
    </div>
  );
}