import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function TrainingCenterIntegration() {
  const [trainingCenters, setTrainingCenters] = useState([
    {
      id: "TRG001",
      name: "Maritime School of Lisbon",
      country: "Portugal",
      city: "Lisbon",
      website: "https://maritimeschool.pt",
      courses: ["Basic Safety", "STCW", "Medical Fitness"],
      partnershipType: "Referral"
    },
    {
      id: "TRG002",
      name: "Global Seafarer Training Center",
      country: "Philippines",
      city: "Manila",
      website: "https://globalseafarer.ph",
      courses: ["GMDSS", "Cargo Handling", "Deck Officer Training"],
      partnershipType: "Commission"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    website: "",
    courses: [],
    partnershipType: "Referral"
  });

  const availableCourses = [
    "Basic Safety",
    "STCW",
    "Medical Fitness",
    "GMDSS",
    "Cargo Handling",
    "Engine Rating",
    "Bridge Watchkeeping",
    "River Navigation",
    "Inland Vessel Certification"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const course = e.target.value;
    const isChecked = e.target.checked;

    setFormData(prev => ({
      ...prev,
      courses: isChecked
        ? [...prev.courses, course]
        : prev.courses.filter(c => c !== course)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.country || !formData.city || !formData.website) {
      alert("Please fill all required fields.");
      return;
    }

    const newCenter = {
      id: `TRG${String(trainingCenters.length + 1).padStart(3, "0")}`,
      ...formData
    };

    setTrainingCenters([newCenter, ...trainingCenters]);
    alert(`✅ ${newCenter.name} has been added to WSRN Training Network.`);

    setFormData({
      name: "",
      country: "",
      city: "",
      website: "",
      courses: [],
      partnershipType: "Referral"
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this center?")) {
      setTrainingCenters(trainingCenters.filter(tc => tc.id !== id));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <Helmet>
        <title>WSRN Training Centers | Admin Integration Panel</title>
        <meta name="description" content="Manage maritime training institutions inside WSRN. Onboard new schools, view course offerings, and track partnership models." />
      </Helmet>

      <h2 className="text-2xl font-bold mb-6">Maritime Training Center Integration</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-700 p-6 rounded-lg mb-10">
        <h3 className="font-semibold mb-4">Add New Training Center</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Center Name"
            required
            className="p-3 bg-gray-800 rounded"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="p-3 bg-gray-800 rounded"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
          required
          className="w-full p-3 bg-gray-800 rounded"
        />

        <div>
          <label className="block text-sm mb-2">Available Courses</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
            {availableCourses.map((course, i) => (
              <label key={i} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={course}
                  checked={formData.courses.includes(course)}
                  onChange={handleCourseChange}
                  className="mr-2"
                />
                {course}
              </label>
            ))}
          </div>
        </div>

        <select
          name="partnershipType"
          value={formData.partnershipType}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 rounded"
        >
          <option value="Referral">Referral</option>
          <option value="Commission">Commission-based</option>
          <option value="Sponsored">Sponsored</option>
          <option value="Favor">Favor-for-Favor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
        >
          🚢 Submit Training Center
        </button>
      </form>

      <section>
        <h3 className="text-xl font-semibold mb-6">Registered Training Centers ({trainingCenters.length})</h3>

        {trainingCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingCenters.map((center, index) => (
              <div key={index} className="bg-gray-700 p-5 rounded-lg hover:bg-gray-600 transition">
                <h4 className="font-semibold mb-1">{center.name}</h4>
                <p className="text-sm text-gray-400 mb-1">{center.city}, {center.country}</p>
                <a href={center.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                  Visit Website
                </a>
                <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
                  {center.courses.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
                <span className={`mt-4 inline-block px-2 py-1 rounded text-xs ${
                  center.partnershipType === "Referral" ? "bg-green-900/30 text-green-400"
                  : center.partnershipType === "Commission" ? "bg-blue-900/30 text-blue-400"
                  : center.partnershipType === "Sponsored" ? "bg-purple-900/30 text-purple-400"
                  : "bg-yellow-900/30 text-yellow-400"
                }`}>
                  {center.partnershipType} Partnership
                </span>
                <button
                  onClick={() => handleDelete(center.id)}
                  className="mt-4 text-red-400 hover:text-red-300 text-sm"
                >
                  ❌ Remove Center
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-gray-400 mt-4">No training centers listed yet.</p>
        )}
      </section>
    </div>
  );
}

