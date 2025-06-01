import React, { useState } from "react";
import CountrySelector from "../components/CountrySelector";

export default function AIApplicantMatching({ agency }) {
  const [filters, setFilters] = useState({
    vesselType: "",
    position: "",
    experienceLevel: "",
    nationality: "",
    schedule: ""
  });

  // Sample applicants (in real app, this comes from Firebase)
  const sampleApplicants = [
    { 
      name: "John Doe", 
      nationality: "Philippines", 
      certifications: ["STCW", "GMDSS"], 
      boardingPreferences: ["Oil Tanker", "Container Ship"],
      onboardSchedule: "6/3 Months",
      dateAdded: "2024-01-15"
    },
    { 
      name: "Carlos Mendes", 
      nationality: "Brazil", 
      certifications: ["Basic Safety Training"], 
      boardingPreferences: ["Bulk Carrier"],
      onboardSchedule: "4/4 Weeks",
      dateAdded: "2024-06-01"
    },
    { 
      name: "Lucas van der Meer", 
      nationality: "Netherlands", 
      certifications: ["Medical Fitness", "STCW"], 
      boardingPreferences: ["Passenger Vessel"],
      onboardSchedule: "9/3 Months",
      dateAdded: "2025-01-10"
    }
  ];

  const [matchedCandidates, setMatchedCandidates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleNationalitySelect = (country) => {
    setFilters(prev => ({ ...prev, nationality: country }));
  };

  const calculatePriorityScore = (applicant) => {
    const today = new Date();
    const addedDate = new Date(applicant.dateAdded);
    const daysInDatabase = Math.floor((today - addedDate) / (1000 * 60 * 60 * 24));

    let score = 0;

    // Base score from other filters
    if (applicant.boardingPreferences.includes(filters.vesselType)) score += 20;
    if (applicant.certifications.some(cert => cert === filters.position)) score += 30;
    if (applicant.onboardSchedule === filters.schedule) score += 10;

    // Add bonus points based on time in database
    if (daysInDatabase > 90) score += 15;   // Bonus for being in database over 90 days
    if (daysInDatabase > 180) score += 20;  // Higher priority after 6 months

    return score;
  };

  const findMatches = () => {
    if (!filters.vesselType || !filters.position || !filters.experienceLevel) {
      alert("Please fill all required fields.");
      return;
    }

    // Apply filter + priority logic
    const filtered = [...sampleApplicants]
      .filter(applicant => {
        return (
          applicant.boardingPreferences.includes(filters.vesselType) &&
          applicant.certifications.some(cert => cert === filters.position) &&
          applicant.experienceLevel === filters.experienceLevel
        );
      })
      .map(applicant => ({
        ...applicant,
        priorityScore: calculatePriorityScore(applicant)
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore);

    setMatchedCandidates(filtered);
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow-lg space-y-6">
      <h2 className="text-xl font-bold">AI Applicant Matching</h2>

      {/* Filter Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-gray-700 p-4 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Vessel Type</label>
            <select
              name="vesselType"
              value={filters.vesselType}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Vessel Type</option>
              <option value="Oil Tanker">Oil / Gas Tanker</option>
              <option value="Container Ship">Container Ship</option>
              <option value="Cruise Ship">Cruise Ship</option>
              <option value="Bulk Carrier">Bulk Carrier</option>
              <option value="Passenger Vessel">Passenger Vessel</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">Position</label>
            <input
              type="text"
              name="position"
              value={filters.position}
              onChange={handleChange}
              placeholder="Deck Officer, AB Seaman, etc."
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm">Experience Level</label>
            <select
              name="experienceLevel"
              value={filters.experienceLevel}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">All Levels</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Certified">Certified</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">Nationality</label>
            <CountrySelector
              selectedCountry={filters.nationality}
              onCountrySelect={handleNationalitySelect}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Boarding Schedule</label>
            <select
              name="schedule"
              value={filters.schedule}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Schedule</option>
              <option value="4/4 Weeks">4 Weeks On / 4 Weeks Off</option>
              <option value="3/1 Month">3 Months On / 1 Month Off</option>
              <option value="6/3 Months">6 Months On / 3 Months Off</option>
              <option value="9/3 Months">9 Months On / 3 Months Off</option>
            </select>
          </div>
        </div>

        <button
          onClick={findMatches}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          🔍 Find Matches
        </button>
      </form>

      {/* Match Results */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Matched Candidates</h3>
        {matchedCandidates.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Nationality</th>
                <th className="text-left p-2">Position Match</th>
                <th className="text-left p-2">Priority Score</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matchedCandidates.map((match, index) => (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{match.name}</td>
                  <td className="py-3">{match.nationality}</td>
                  <td className="py-3">{match.certifications.join(", ")}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded ${
                      match.priorityScore >= 50 ? "bg-green-900/30 text-green-400" :
                      match.priorityScore >= 30 ? "bg-yellow-900/30 text-yellow-400" :
                      "bg-gray-700 text-gray-400"
                    }`}>
                      {match.priorityScore} pts
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Assign to Vessel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No matches found yet.</p>
        )}
      </section>
    </div>
  );
}