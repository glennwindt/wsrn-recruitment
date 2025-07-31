// src/components/seafarer-application-form/SeafarerApplicationForm.js

import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import EmergencyContact from "./EmergencyContact";
import ExperienceLevelSelector from "./ExperienceLevelSelector";
import LocationPreferences from "./LocationPreferences";
import DocumentUploader from "./DocumentUploader";
import VesselDropdown from "../../utils/VesselDropdown";
import "../../utils/VesselDropdown.css";

export default function SeafarerApplicationForm() {
  const [formData, setFormData] = useState({
    vesselCategory: "",
    boardingPreferences: [],
    // Add other form states if needed later
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    alert("Application sent successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">
        Seafarer Application Form
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <PersonalDetails />
        <EmergencyContact />
        <ExperienceLevelSelector />
        <LocationPreferences />
        <DocumentUploader />

        <div>
          <label className="block font-medium mb-2">
            Vessel Type & Subtype
          </label>
          <VesselDropdown
            onSelect={(type, subtype) => {
              setFormData((prev) => ({
                ...prev,
                vesselCategory: type,
                boardingPreferences: subtype ? [subtype] : []
              }));
            }}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

