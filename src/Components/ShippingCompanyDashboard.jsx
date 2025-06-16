// src/components/ShippingCompanyDashboard.jsx

import React from 'react';

const ShippingCompanyDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">Shipping Company Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Vessel Registration</h2>
          <ul className="list-disc ml-5">
            <li>Register all vessels with details</li>
            <li>Vessel name, type, length, weight</li>
            <li>Update fleet information anytime</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Applicant Matching</h2>
          <ul className="list-disc ml-5">
            <li>Matched to applicants via AI logic</li>
            <li>Only certified applicants shown</li>
            <li>Direct contact after mutual approval</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Commission / Membership Model</h2>
          <ul className="list-disc ml-5">
            <li>Choose between model based on usage</li>
            <li>Clear invoicing dashboard</li>
            <li>Automatic payment processing</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Legal Compliance System</h2>
          <ul className="list-disc ml-5">
            <li>Apply for Visa, NIF, NISS, AIMA</li>
            <li>Integrated with Portuguese authorities</li>
            <li>Automated status updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingCompanyDashboard;