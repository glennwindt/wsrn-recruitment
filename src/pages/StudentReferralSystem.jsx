import React, { useState } from "react";
import TrainingCenterIntegration from "../components/TrainingCenterIntegration";

export default function StudentReferralSystem() {
  const [student, setStudent] = useState({
    name: "",
    nationality: "",
    currentLocation: "",
    desiredVesselType: "",
    desiredPosition: ""
  });

  const [matchedCenters, setMatchedCenters] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleFindCenters = () => {
    if (!student.nationality || !student.currentLocation || !student.desiredVesselType) {
      alert("Please enter your nationality, location, and vessel preference.");
      return;
    }

    const fakeMatches = [
      {
        name: "Maritime School of Lisbon",
        country: "Portugal",
        city: "Lisbon",
        courses: ["Basic Safety", "STCW", "Medical Fitness"],
        distance: "15 km",
        recommended: true
      },
      {
        name: "Portuguese Nautical Institute",
        country: "Portugal",
        city: "Porto",
        courses: ["GMDSS", "Cargo Handling", "Deck Officer Training"],
        distance: "220 km",
        recommended: false
      },
      {
        name: "Global Seafarer Training Center",
        country: "Philippines",
        city: "Manila",
        courses: ["STCW", "Medical Fitness", "Engine Rating"],
        distance: "10,500 km",
        recommended: false
      }
    ].filter(match => match.country === student.nationality || match.recommended);

    setMatchedCenters(fakeMatches);
    alert(`🔍 Found ${fakeMatches.length} training center(s) near you.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">WSRN – Training Referral System</h1>
        <p className="mt-2 text-gray-400">
          Find maritime training centers based on your location and career goals.
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        {/* Student Form */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Nationality</label>
              <select
                name="nationality"
                value={student.nationality}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded"
              >
                <option value="">Select Nationality</option>
                <option value="Portugal">Portugal</option>
                <option value="Philippines">Philippines</option>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Spain">Spain</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm mb-2">Current Location</label>
              <input
                type="text"
                name="currentLocation"
                value={student.currentLocation}
                onChange={handleChange}
                placeholder="E.g., Lisbon, Manila, Rotterdam"
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Desired Position</label>
              <input
                type="text"
                name="desiredPosition"
                value={student.desiredPosition}
                onChange={handleChange}
                placeholder="Deck Officer, Engine Room Rating..."
                className="w-full p-3 bg-gray-700 rounded"
              />
            </div>
          </div>

          <button
            onClick={handleFindCenters}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
          >
            🔍 Find Nearby Training Centers
          </button>
        </section>

        {/* Matched Centers */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Recommended Training Centers</h3>

          {matchedCenters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedCenters.map((center, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h4 className="font-medium">{center.name}</h4>
                  <p className="text-sm text-gray-400">{center.city}, {center.country}</p>
                  <p className="text-sm mt-2">Distance: <strong>{center.distance}</strong></p>
                  
                  <ul className="mt-4 text-sm list-disc pl-5">
                    {center.courses.map((course, i) => (
                      <li key={i}>{course}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() => alert(`🔗 Referring ${student.name} to ${center.name}`)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-sm transition"
                  >
                    📋 Refer Me to This Center
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="text-gray-400 italic">Enter your details above to find training centers.</p>
            </div>
          )}
        </section>

        {/* Training Center Management (Admin Only) */}
        {["admin", "staff"].includes(userRole) && (
          <TrainingCenterIntegration userRole={userRole} />
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} WSRN – Built with ❤️ in Portugal</p>
        </footer>
      </main>
    </div>
  );
}