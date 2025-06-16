import React, { useState } from "react";

export default function TrainingCenterIntegration({ userRole = "admin" }) {
  const [trainingCenters, setTrainingCenters] = useState([
    {
      id: "TRG001",
      name: "Maritime School of Lisbon",
      country: "Portugal",
      city: "Lisbon",
      website: "https://maritimeschool.pt ",
      courses: ["Basic Safety", "STCW", "Medical Fitness"],
      partnershipType: "Referral"
    },
    {
      basicInfo: "",
      id: "TRG002",
      name: "Global Seafarer Training Center",
      country: "Philippines",
      city: "Manila",
      website: "https://globalseafarer.ph ",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const course = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        courses: [...prev.courses, course]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        courses: prev.courses.filter(c => c !== course)
      }));
    }
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
    
    // Clear form after submission
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
    if (window.confirm("Are you sure you want to remove this training center?")) {
      setTrainingCenters(trainingCenters.filter(t => t.id !== id));
    }
  };

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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Maritime Training Center Integration</h2>

      {/* Add New Training Center */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Add New Training Center</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Center Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g., Global Seafarer Training Center"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Location</label>
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
        </div>

        <div>
          <label className="block text-sm mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com "
            required
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>

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

        <div>
          <label className="block text-sm mb-2">Partnership Type</label>
          <select
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
          >
            <option value="Referral">Referral Only</option>
            <option value="Commission">Commission-based</option>
            <option value="Favor">Favor-for-Favor</option>
            <option value="Sponsored">Sponsored Placement</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
        >
          🚢 Submit Training Center
        </button>
      </form>

      {/* Training Centers List */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Approved Training Centers ({trainingCenters.length})</h3>

        {trainingCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingCenters.map((center, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition">
                <h4 className="font-semibold">{center.name}</h4>
                <p className="text-sm text-gray-400">{center.city}, {center.country}</p>
                <a href={center.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                  Visit Website
                </a>
                <ul className="mt-4 text-sm list-disc pl-5 space-y-1">
                  {center.courses.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
                <span className={`inline-block mt-4 px-2 py-1 rounded text-xs ${
                  center.partnershipType === "Referral" ? "bg-green-900/30 text-green-400" :
                  center.partnershipType === "Commission" ? "bg-blue-900/30 text-blue-400" : 
                  center.partnershipType === "Sponsored" ? "bg-purple-900/30 text-purple-400" : "bg-yellow-900/30 text-yellow-400"
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