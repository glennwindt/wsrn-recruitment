import React, { useState } from "react";

export default function LiveCttTracking({ userRole = "admin" }) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      alert("Please enter a valid tracking number.");
      return;
    }

    setLoading(true);

    // Simulated API response - in real app, this would call CTT's official API
    setTimeout(() => {
      setTrackingData({
        trackingNumber,
        status: "In Transit",
        currentLocation: "CTT Lisbon Sorting Center",
        estimatedDelivery: "2025-04-30",
        history: [
          { date: "2025-04-25", time: "10:30", location: "Order Shipped – Amazon Portugal", status: "Shipment Initiated" },
          { date: "2025-04-26", time: "14:15", location: "CTT Porto Hub", status: "Arrived at Distribution Center" },
          { date: "2025-04-27", time: "09:45", location: "Lisbon Delivery Office", status: "Out for Delivery" }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setTrackingNumber("");
    setTrackingData(null);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Live CTT Tracking</h2>

      {/* Tracking Input */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="font-medium">Enter Tracking Number:</label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="CTT123456789PT"
            className="md:col-span-2 p-3 bg-gray-800 rounded"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleTrack}
            disabled={!trackingNumber || loading}
            className={`px-6 py-2 rounded font-semibold ${
              !trackingNumber || loading ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "🔄 Loading..." : "🔍 Track Package"}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 rounded font-semibold bg-red-600 hover:bg-red-700"
          >
            ❌ Clear
          </button>
        </div>
      </form>

      {/* Tracking Results */}
      {trackingData && (
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Tracking Status: {trackingData.status}</h3>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <p><strong>Current Location:</strong> {trackingData.currentLocation}</p>
            <p className="mt-2"><strong>Estimated Delivery:</strong> {trackingData.estimatedDelivery}</p>
          </div>

          <h4 className="font-semibold mb-4">Status History</h4>
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">Location</th>
                <th className="text-right p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {trackingData.history.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{entry.date}</td>
                  <td className="py-3">{entry.time}</td>
                  <td className="py-3 text-sm">{entry.location}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      entry.status === "Delivered" ? "bg-green-900/30 text-green-400" :
                      entry.status.includes("Delivery") ? "bg-yellow-900/30 text-yellow-400" :
                      "bg-blue-900/30 text-blue-400"
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {!trackingData && (
        <p className="italic text-gray-400 mt-4">Enter a CTT tracking number to check delivery status.</p>
      )}
    </div>
  );
}