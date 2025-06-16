import React, { useState } from "react";

export default function CTTTrackingWidget({ userRole = "admin" }) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      alert("Please enter a valid CTT tracking number.");
      return;
    }

    // Simulated API call to CTT tracking system
    setLoading(true);

    setTimeout(() => {
      const mockResponse = {
        trackingNumber,
        status: "Delivered",
        updates: [
          {
            date: "2025-04-18T14:30:00Z",
            location: "Lisbon Distribution Center",
            description: "Package delivered"
          },
          {
            date: "2025-04-17T09:15:00Z",
            location: "Porto Sorting Facility",
            description: "In transit"
          },
          {
            date: "2025-04-16T11:45:00Z",
            location: "Amadora Post Office",
            description: "Package dispatched"
          }
        ]
      };

      setTrackingData(mockResponse);
      setLoading(false);
    }, 1500);
  };

  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">CTT Tracking System</h2>

      {/* Tracking Input */}
      <div className="flex flex-col md:flex-row gap-4 bg-gray-700 p-4 rounded mb-6">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter CTT tracking number (e.g., CTT123456789PT)"
          className="w-full p-3 bg-gray-800 rounded"
        />
        <button
          onClick={handleTrack}
          disabled={loading}
          className={`px-4 py-3 bg-blue-600 hover:bg-blue-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Loading..." : "🔍 Track Package"}
        </button>
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="bg-gray-700 p-4 rounded space-y-4">
          <h3 className="font-semibold">Tracking Updates for: {trackingData.trackingNumber}</h3>
          <ul className="space-y-4">
            {trackingData.updates.map((update, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm text-gray-400">{formattedDate(update.date)}</p>
                <p><strong>{update.description}</strong></p>
                <p className="text-sm mt-1">{update.location}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>For official documents, certificates, and legal application materials sent via CTT.</p>
      </footer>
    </div>
  );
}