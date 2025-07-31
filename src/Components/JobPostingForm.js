import React, { useState } from "react";
import CountrySelector from "../components/CountrySelector";

export default function JobPostingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    vesselName: "",
    vesselType: "",
    position: "",
    experienceLevel: "",
    numberOfPositions: 1,
    onboardSchedule: "",
    nationalityPreference: "",
    salaryRange: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNationalitySelect = (country) => {
    setFormData(prev => ({ ...prev, nationalityPreference: country }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vesselName.trim()) newErrors.vesselName = "Vessel name is required";
    if (!formData.vesselType) newErrors.vesselType = "Vessel type must be selected";
    if (!formData.position) newErrors.position = "Position must be selected";
    if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required";
    if (!formData.onboardSchedule) newErrors.onboardSchedule = "Boarding schedule must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const vesselTypes = [
    "Oil / Gas Tanker",
    "Container Ship",
    "Cruise Ship",
    "Bulk Carrier",
    "Passenger Vessel"
  ];

  const schedules = ["4/4 Weeks", "3/1 Month", "6/3 Months", "9/3 Months"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
      {/* Vessel Name */}
      <div>
        <label className="block mb-2 font-medium">Vessel Name</label>
        <input
          type="text"
          name="vesselName"
          value={formData.vesselName}
          onChange={handleChange}
          placeholder="MV Ocean Star"
          className={`w-full p-3 bg-gray-700 rounded ${errors.vesselName ? "border border-red-500" : ""}`}
        />
        {errors.vesselName && <p className="text-red-400 text-sm mt-1">{errors.vesselName}</p>}
      </div>

      {/* Vessel Type */}
      <div>
        <label className="block mb-2 font-medium">Vessel Type</label>
        <select
          name="vesselType"
          value={formData.vesselType}
          onChange={handleChange}
          className={`w-full p-3 bg-gray-700 rounded ${errors.vesselType ? "border border-red-500" : ""}`}
        >
          <option value="">Select Vessel Type</option>
          {vesselTypes.map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>
        {errors.vesselType && <p className="text-red-400 text-sm mt-1">{errors.vesselType}</p>}
      </div>

      {/* Position */}
      <div>
        <label className="block mb-2 font-medium">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Deck Officer, Cook, AB Seaman, etc."
          className={`w-full p-3 bg-gray-700 rounded ${errors.position ? "border border-red-500" : ""}`}
        />
        {errors.position && <p className="text-red-400 text-sm mt-1">{errors.position}</p>}
      </div>

      {/* Experience Level */}
      <div>
        <label className="block mb-2 font-medium">Experience Level</label>
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className={`w-full p-3 bg-gray-700 rounded ${errors.experienceLevel ? "border border-red-500" : ""}`}
        >
          <option value="">Select Experience Level</option>
          <option value="Entry">Entry</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Certified">Certified</option>
        </select>
        {errors.experienceLevel && <p className="text-red-400 text-sm mt-1">{errors.experienceLevel}</p>}
      </div>

      {/* Boarding Schedule */}
      <div>
        <label className="block mb-2 font-medium">Onboard Schedule</label>
        <select
          name="onboardSchedule"
          value={formData.onboardSchedule}
          onChange={handleChange}
          className={`w-full p-3 bg-gray-700 rounded ${errors.onboardSchedule ? "border border-red-500" : ""}`}
        >
          <option value="">Select Schedule</option>
          {schedules.map((sched, i) => (
            <option key={i} value={sched}>{sched}</option>
          ))}
        </select>
        {errors.onboardSchedule && <p className="text-red-400 text-sm mt-1">{errors.onboardSchedule}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition"
      >
        🚢 Post Job for Vessel
      </button>
    </form>
  );
}