import React, { useState } from "react";

export default function CrewMovementLog({ crewMember, staffOnly = true }) {
  const [movementLogs, setMovementLogs] = useState([
    {
      date: "2025-04-01",
      fromVessel: "MV Ocean Star",
      toVessel: "MV Blue Horizon",
      reason: "Scheduled rotation",
      approvedBy: "Glenn van Windt",
      status: "Approved"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMove, setNewMove] = useState({
    fromVessel: "",
    toVessel: "",
    reason: "",
    approvalNeeded: false
  });

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!newMove.fromVessel || !newMove.toVessel || !newMove.reason) {
      alert("Please fill in all transfer details.");
      return;
    }

    setMovementLogs(prev => [...prev, { ...newMove, status: "Pending Approval" }]);
    setNewMove({ fromVessel: "", toVessel: "", reason: "" });
    setShowModal(false);

    if (staffOnly) {
      alert(`🔔 New movement request submitted. Waiting for admin approval.`);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Crew Movement History</h3>

      {movementLogs.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">From Vessel</th>
              <th className="text-left p-2">To Vessel</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Reason</th>
              <th className="text-right p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {movementLogs.map((log, i) => (
              <tr key={i} className="hover:bg-gray-700 transition border-b border-gray-700">
                <td className="py-3">{log.fromVessel}</td>
                <td className="py-3">{log.toVessel}</td>
                <td className="py-3">{log.date}</td>
                <td className="py-3">{log.reason}</td>
                <td className="py-3 text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    log.status === "Approved" ? "bg-green-900/30 text-green-400" :
                    log.status === "Pending Approval" ? "bg-yellow-900/30 text-yellow-400" :
                    "bg-red-900/30 text-red-400"
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="italic text-gray-400">No movement records found.</p>
      )}

      {staffOnly && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded transition"
        >
          ➕ Record Vessel Transfer
        </button>
      )}

      {/* Modal for recording transfers */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-gray-800 p-6 rounded max-w-md w-full">
            <h3 className="text-lg font-semibold">Record Vessel Transfer</h3>
            <form onSubmit={handleTransfer} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm">From Vessel</label>
                <input
                  type="text"
                  value={newMove.fromVessel}
                  onChange={(e) => setNewMove({ ...newMove, fromVessel: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded"
                  placeholder="Current vessel name"
                />
              </div>
              <div>
                <label className="block text-sm">To Vessel</label>
                <input
                  type="text"
                  value={newMove.toVessel}
                  onChange={(e) => setNewMove({ ...newMove, toVessel: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded"
                  placeholder="New vessel name"
                />
              </div>
              <div>
                <label className="block text-sm">Reason for Transfer</label>
                <textarea
                  rows="3"
                  value={newMove.reason}
                  onChange={(e) => setNewMove({ ...newMove, reason: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded"
                  placeholder="Scheduled rotation, medical evacuation, etc."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Submit Transfer Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}