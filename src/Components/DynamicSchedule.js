import React, { useState } from "react";

export default function DynamicSchedule({ onChange }) {
  const [regionType, setRegionType] = useState("");
  const [country, setCountry] = useState("");
  const [scheduleOptions, setScheduleOptions] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");

  // Schedule rules by region type
  const scheduleRules = {
    domestic: [
      "4/4 Weeks (Freelance)",
      "6/3 Months",
      "9/3 Months",
      "Permanent (Full-Time)"
    ],
    euInlandWaterways: [
      "4/4 Weeks (Freelance)",
      "3/1 Month On/Off",
      "6/3 Months Contract",
      "9/3 Months Contract"
    ],
    international: [
      "6/3 Months Contract",
      "9/3 Months Contract",
      "Permanent – Passenger Ships/Ferries"
    ]
  };

  // List of countries (you can expand this list)
  const countryList = [
    "Portugal", "Netherlands", "Germany", "Belgium", "France", "Spain",
    "Philippines", "Indonesia", "Malaysia", "Canada", "USA", "Brazil",
    "Australia", "Japan", "South Korea", "India", "China"
  ];

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegionType(selectedRegion);

    // Update available schedules
    if (scheduleRules[selectedRegion]) {
      setScheduleOptions(scheduleRules[selectedRegion]);
    } else {
      setScheduleOptions([]);
    }

    setSelectedSchedule("");
    onChange?.(selectedRegion, "");
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setCountry(value);
    onChange?.(regionType, selectedSchedule, value);
  };

  const handleScheduleChange = (e) => {
    const value = e.target.value;
    setSelectedSchedule(value);
    onChange?.(regionType, value, country);
  };

  return (
    <div className="space-y-6">
      {/* Region Selection */}
      <div>
        <label className="block mb-2 font-medium">Region Type</label>
        <select
          value={regionType}
          onChange={handleRegionChange}
          className="w-full p-3 bg-gray-700 rounded text-white"
        >
          <option value="">-- Select Region --</option>
          <option value="domestic">Domestic (Local Operations)</option>
          <option value="euInlandWaterways">EU Inland Waterways</option>
          <option value="international">International Seafaring</option>
        </select>
      </div>

      {/* Country Selector (for Domestic and EU) */}
      {(regionType === "domestic" || regionType === "euInlandWaterways") && (
        <div>
          <label className="block mb-2 font-medium">Select Country</label>
          <select
            value={country}
            onChange={handleCountryChange}
            className="w-full p-3 bg-gray-700 rounded text-white"
          >
            <option value="">-- Select Country --</option>
            {countryList.map((countryName, index) => (
              <option key={index} value={countryName}>{countryName}</option>
            ))}
          </select>
        </div>
      )}

      {/* Dynamically Show Schedule Options */}
      {regionType && (
        <div>
          <label className="block mb-2 font-medium">Onboard Schedule Preference</label>
          <select
            value={selectedSchedule}
            onChange={handleScheduleChange}
            className="w-full p-3 bg-gray-700 rounded text-white"
            disabled={!scheduleOptions.length}
          >
            <option value="">-- Choose Schedule --</option>
            {scheduleOptions.map((sched, index) => (
              <option key={index} value={sched}>{sched}</option>
            ))}
          </select>
        </div>
      )}

      {/* Display Selected Values */}
      {selectedSchedule && (
        <p className="text-blue-400 mt-2">
          Selected Schedule: <strong>{selectedSchedule}</strong> for <strong>{country || "International"} {regionType === "domestic" ? "(Domestic)" : ""}</strong>
        </p>
      )}
    </div>
  );
}