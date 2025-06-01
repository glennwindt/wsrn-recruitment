import React from "react";

export default function MatchScreen({ userRole }) {
  const matches = [
    {
      id: "MATCH001",
      vesselType: "Container Ship",
      position: "Deck Officer",
      applicantName: "John Doe",
      nationality: "Philippines",
      experience: "Intermediate",
      score: 88,
      status: "Available"
    },
    {
      id: "MATCH002",
      vesselType: "Oil Tanker",
      position: "Engine Room Rating",
      applicantName: "Carlos Mendes",
      nationality: "Brazil",
      experience: "Entry-Level",
      score: 76,
      status: "Available"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Applicant Matching</h2>
      
      {matches.map((match, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{match.applicantName}</h3>
            <span className={`inline-block px-2 py-1 rounded text-xs ${
              match.status === "Available" ? "bg-green-900/30 text-green-400" :
              match.status === "Pending" ? "bg-yellow-900/30 text-yellow-400" : "bg-red-900/30 text-red-400"
            }`}>
              {match.status}
            </span>
          </div>
          <p><strong>Vessel:</strong> {match.vesselType}</p>
          <p><strong>Position:</strong> {match.position}</p>
          <p><strong>Nationality:</strong> {match.nationality}</p>
          <p><strong>Experience:</strong> {match.experience}</p>
          
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => alert(`Viewing ${match.id}`)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              🖊 Details
            </button>
            <button
              onClick={() => alert(`Apply to ${match.id}`)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
            >
              ✅ Apply
            </button>
          </div>
        </div>
      ))}

      {matches.length === 0 && (
        <div className="bg-gray-800 p-4 rounded text-center">
          <p className="italic text-gray-400">No current matches available.</p>
        </div>
      )}
    </div>
  );
}