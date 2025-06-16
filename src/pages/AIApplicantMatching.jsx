import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export default function AIApplicantMatching() {
  const [filters, setFilters] = useState({
    vesselType: "",
    experienceLevel: "",
    certification: "",
    schedule: "",
    nationality: ""
  });

  const [matches, setMatches] = useState([]);

  const vesselTypes = [
    "Oil / Gas Tanker", "Container Ship", "Cruise Ship",
    "Bulk Carrier", "Passenger Vessel", "Naval Ship",
    "Ro-Ro", "Reefer", "Dredger", "Tug"
  ];

  const experienceLevels = ["Entry", "Intermediate", "Certified"];
  const schedules = ["6/3", "9/3", "4/4", "5/2", "Custom"];
  const nationalities = ["Portugal", "Netherlands", "Curaçao", "USA", "UK"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const findMatches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "seafarers"));
      const allSeafarers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const matched = allSeafarers.filter(seafarer =>
        (filters.vesselType === "" || seafarer.boardingPreferences.includes(filters.vesselType)) &&
        (filters.experienceLevel === "" || seafarer.experienceLevel === filters.experienceLevel) &&
        (filters.certification === "" || seafarer.certifications.includes(filters.certification)) &&
        (filters.schedule === "" || seafarer.boardingSchedule === filters.schedule) &&
        (filters.nationality === "" || seafarer.nationality === filters.nationality)
      );

      setMatches(matched);
    } catch (error) {
      console.error("Error fetching seafarers:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="bg-gray-800 p-6 shadow-md rounded-lg max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">AI Applicant Matching</h1>
        <p className="mt-2 text-gray-300">
          Match seafarers with shipping companies and agencies based on vessel type, experience level, certification, and onboard schedule.
        </p>
      </header>

      {/* Filters */}
      <main className="max-w-5xl mx-auto space-y-8">
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Match Criteria</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Vessel Type</label>
                <select
                  name="vesselType"
                  value={filters.vesselType}
                  onChange={handleFilterChange}
                  className="w-full p-3 bg-gray-700 rounded"
                >
                  <option value="">Select Vessel Type</option>
                  {vesselTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Experience Level</label>
                <select
                  name="experienceLevel"
                  value={filters.experienceLevel}
                  onChange={handleFilterChange}
                  className="w-full p-3 bg-gray-700 rounded"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map((level, index) => (
                    <option key={index} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Certification</label>
                <input
                  type="text"
                  name="certification"
                  value={filters.certification}
                  onChange={handleFilterChange}
                  placeholder="STCW, GMDSS, Medical Fitness, etc."
                  className="w-full p-3 bg-gray-700 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Onboard Schedule</label>
                <select
                  name="schedule"
                  value={filters.schedule}
                  onChange={handleFilterChange}
                  className="w-full p-3 bg-gray-700 rounded"
                >
                  <option value="">All Schedules</option>
                  {schedules.map((sched, index) => (
                    <option key={index} value={sched}>{sched}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Nationality</label>
                <select
                  name="nationality"
                  value={filters.nationality}
                  onChange={handleFilterChange}
                  className="w-full p-3 bg-gray-700 rounded"
                >
                  <option value="">All Nationalities</option>
                  {nationalities.map((nation, index) => (
                    <option key={index} value={nation}>{nation}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={findMatches}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded transition"
            >
              Find Matches
            </button>
          </form>
        </section>

        {/* Results */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Matched Seafarers ({matches.length})</h2>

          {matches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((seafarer, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-xl">{seafarer.firstName} {seafarer.lastName}</h3>
                  <p className="text-sm mt-1 text-gray-400">ID: {seafarer.id}</p>

                  <div className="mt-4 space-y-2">
                    <p><span className="font-medium">Nationality:</span> {seafarer.nationality}</p>
                    <p><span className="font-medium">Experience:</span> {seafarer.experienceLevel}</p>
                    <p><span className="font-medium">Certifications:</span> {seafarer.certifications.join(", ")}</p>
                    <p><span className="font-medium">Boarding Preferences:</span> {seafarer.boardingPreferences.join(", ")}</p>
                    <p><span className="font-medium">Available:</span> {seafarer.boardingSchedule}</p>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition">
                      View Profile
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">
                      Schedule Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No matches found yet. Refine your filters above.</p>
          )}
        </section>

        {/* Back to Dashboard */}
        <div className="text-center mt-10">
          <a href="/dashboard" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded transition inline-block">
            ← Back to Dashboard
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-12 text-center">
        <p>&copy; {new Date().getFullYear()} WSRN - Built with ❤️ in Portugal</p>
      </footer>
    </div>
  );
}