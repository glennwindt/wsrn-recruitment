import React from "react";

export default function AgencyCrewList({ crew }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Crew Members Placed</h2>
      
      {crew.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Nationality</th>
              <th className="text-left p-2">Vessel</th>
              <th className="text-left p-2">Onboard Date</th>
              <th className="text-right p-2">Visa Status</th>
            </tr>
          </thead>
          <tbody>
            {crew.map((member, index) => (
              <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                <td className="py-3">{member.name}</td>
                <td className="py-3">{member.nationality}</td>
                <td className="py-3">{member.vessel}</td>
                <td className="py-3">{member.onboardDate}</td>
                <td className="py-3 text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    member.visaStatus === "Approved" ? "bg-green-900/30 text-green-400" :
                    member.visaStatus === "In Review" ? "bg-yellow-900/30 text-yellow-400" :
                    "bg-red-900/30 text-red-400"
                  }`}>
                    {member.visaStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="italic text-gray-400">No crew members placed yet.</p>
      )}
    </div>
  );
}