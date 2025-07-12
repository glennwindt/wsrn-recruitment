// src/components/seafarer-application-form/SeafarerApplicationForm.jsx

import React, { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import EmergencyContact from './EmergencyContact';
import ExperienceLevelSelector from './ExperienceLevelSelector';
import LocationPreferences from './LocationPreferences';
import DocumentUploader from './DocumentUploader';

// CORRECTED: Changed the component name from kebab-case (with hyphens) to PascalCase.
// JavaScript variable names and React component names cannot contain hyphens.
const SeafarerApplicationForm = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">Seafarer Application Form</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <PersonalDetails />
        <EmergencyContact />
        ExperienceLevelSelector />
        <LocationPreferences />
        <DocumentUploader />

        <div className="mt-6 flex justify-end">
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

// CORRECTED: Export the component with its proper PascalCase name.
export default SeafarerApplicationForm;
