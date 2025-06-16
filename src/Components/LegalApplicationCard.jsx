import React from "react";

export default function LegalApplicationCard({ application, onDelete }) {
  const appDate = new Date(application.submissionDate);
  const formattedDate = appDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{application.applicantName}</h3>
        <span className={`inline-block px-2 py-1 rounded text-xs ${
          application.status === "Approved" ? "bg-green-900/30 text-green-400" :
          application.status === "Submitted to AIMA" ? "bg-blue-900/30 text-blue-400" :
          application.status === "In Review" ? "bg-yellow-900/30 text-yellow-400" :
          "bg-red-900/30 text-red-400"
        }`}>
          {application.status}
        </span>
      </div>

      <div className="mt-3 text-sm">
        <p><strong>Vessel:</strong> {application.vesselType}</p>
        <p><strong>Position:</strong> {application.position}</p>
        <p><strong>NIF Status:</strong> {application.nifStatus}</p>
        <p><strong>NISS Status:</strong> {application.nissStatus}</p>
        <p className="text-gray-400 mt-2">Submitted: {formattedDate}</p>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={() => alert(`Edit ${application.id}`)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          🖊 Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          ❌ Delete
        </button>
      </div>
    </div>
  );
}