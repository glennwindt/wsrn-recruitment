// src/components/AgencyDashboard.jsx

import React from 'react';

const AgencyDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Agency Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Vessel Job Listings</h2>
          <ul className="list-disc ml-5">
            <li>Create job postings</li>
            <li>Define required positions</li>
            <li>Set salary ranges and vessel types</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Applicant Matching</h2>
          <ul className="list-disc ml-5">
            <li>Receive pre-filtered applicants</li>
            <li>Use AI-driven matching system</li>
            <li>Review top candidates instantly</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Documents & Certifications</h2>
          <ul className="list-disc ml-5">
            <li>Download links sent via email/SMS</li>
            <li>Verified passport, seaman book, certificates</li>
            <li>Secure access only after successful match</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Video Interview Tool</h2>
          <ul className="list-disc ml-5">
            <li>Schedule interviews via calendar</li>
            <li>Integrated video conferencing</li>
            <li>Automated appointment reminders</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;