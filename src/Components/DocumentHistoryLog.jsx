import React, { useState } from "react";

export default function DocumentHistoryLog() {
  const [historyFilter, setHistoryFilter] = useState("all");
  const [historyData, setHistoryData] = useState([
    {
      id: "EMP000123",
      name: "John Doe",
      nationality: "Philippines",
      position: "Deck Cadet",
      vesselType: "Container Ship",
      endDate: "2024-10-15",
      reason: "Retirement",
      actionBy: "Glenn van Windt",
      status: "retired",
      notes: "Completed 20 years at sea. Retired voluntarily."
    },
    {
      id: "EMP000124",
      name: "Carlos Mendes",
      nationality: "Brazil",
      position: "Engine Room Rating",
      vesselType: "Oil Tanker",
      endDate: "2024-11-01",
      reason: "Resigned",
      actionBy: "Agency - DSA Maritime",
      status: "resigned",
      notes: "Personal reasons. No disciplinary record."
    },
    {
      id: "EMP000125",
      name: "Lucas van der Meer",
      nationality: "Netherlands",
      position: "Trainee Engineer",
      vesselType: "Cruise Ship",
      endDate: "2024-12-12",
      reason: "Negligence",
      actionBy: "Shipping Company - VSCH0000001",
      status: "terminated",
      notes: "Failed to follow safety protocol. Repeated violations."
    },
    {
      id: "EMP000126",
      name: "Amit Sharma",
      nationality: "India",
      position: "AB Seaman",
      vesselType: "Bulk Carrier",
      endDate: "2025-01-20",
      reason: "Incompetency",
      actionBy: "Agency - Ocean Crew Ltd.",
      status: "terminated",
      notes: "Failed onboard evaluations. Could not meet certification requirements."
    }
  ]);

  const handleFilterChange = (e) => {
    setHistoryFilter(e.target.value);
  };

  const filteredHistory = historyFilter === "all"
    ? historyData
    : historyData.filter(item => item.status === historyFilter);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Seafarer History & Status Log</h2>

      {/* Filter Options */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="font-medium">Filter by Status:</label>
        <select
          value={historyFilter}
          onChange={handleFilterChange}
          className="p-2 bg-gray-700 rounded text-white"
        >
          <option value="all">All Records</option>
          <option value="retired">Retired</option>
          <option value="resigned">Resigned</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-900 rounded text-sm">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Employee ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Nationality</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Vessel Type</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Action By</th>
              <th className="p-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredHistory.map((record, index) => (
              <tr key={index} className="hover:bg-gray-700 transition">
                <td className="p-3">{record.id}</td>
                <td className="p-3">{record.name}</td>
                <td className="p-3">{record.nationality}</td>
                <td className="p-3">{record.position}</td>
                <td className="p-3">{record.vesselType}</td>
                <td className="p-3">{record.endDate}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${
                    record.status === "retired" ? "bg-blue-900/30 text-blue-400" :
                    record.status === "resigned" ? "bg-yellow-900/30 text-yellow-400" :
                    record.status === "terminated" ? "bg-red-900/30 text-red-400" :
                    "bg-gray-700 text-gray-300"
                  }`}>
                    {record.reason}
                  </span>
                </td>
                <td className="p-3">{record.actionBy}</td>
                <td className="p-3 italic text-gray-400">{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 italic">No historical records found.</p>
        </div>
      )}

      {/* Back to Dashboard */}
      <div className="mt-8 text-right">
        <a href="/dashboard" className="text-blue-400 hover:underline text-sm">
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}