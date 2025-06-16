import React, { useState } from "react";
import LiveVideoInterviewTool from "../../components/LiveVideoInterviewTool";

export default function InterviewsScreen({ userRole }) {
  const [interviews, setInterviews] = useState([
    {
      id: "INT0001",
      applicantName: "John Doe",
      nationality: "Philippines",
      vesselType: "Container Ship",
      position: "Deck Officer",
      scheduledDate: new Date("2025-04-20T10:00:00"),
      mode: "Zoom",
      status: "Scheduled"
    },
    {
      id: "INT0002",
      applicantName: "Carlos Mendes",
      nationality: "Brazil",
      vesselType: "Oil Tanker",
      position: "Engine Room Rating",
      scheduledDate: new Date("2025-04-22T14:00:00"),
      mode: "Google Meet",
      status: "Completed"
    }
  ]);

  const formattedDate = (date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Interview Schedule</h2>

      {interviews.length > 0 ? (
        interviews.map((interview, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{interview.applicantName}</h3>
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                interview.status === "Scheduled" ? "bg-green-900/30 text-green-400" :
                interview.status === "Completed" ? "bg-blue-900/30 text-blue-400" :
                interview.status === "Missed" ? "bg-red-900/30 text-red-400" : "bg-gray-700 text-gray-400"
              }`}>
                {interview.status}
              </span>
            </div>
            <p><strong>Vessel:</strong> {interview.vesselType}</p>
            <p><strong>Position:</strong> {interview.position}</p>
            <p className="text-gray-400 mt-2">📅 Scheduled: {formattedDate(interview.scheduledDate)}</p>
            
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => alert(`Join call: ${interview.id}`)}
                disabled={interview.status !== "Scheduled"}
                className={`py-2 px-4 rounded ${
                  interview.status === "Scheduled" 
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" 
                    : "bg-gray-700 cursor-not-allowed opacity-60"
                }`}
              >
                🎥 Join Call
              </button>
              <button
                onClick={() => alert(`Details: ${interview.id}`)}
                className="bg-gray-700 py-2 px-4 rounded"
              >
                📄 Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-800 p-4 rounded text-center">
          <p className="text-gray-400">No upcoming interviews.</p>
        </div>
      )}
    </div>
  );
}