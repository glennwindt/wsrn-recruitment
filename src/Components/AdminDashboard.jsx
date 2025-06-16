// src/components/AdminDashboard.jsx

import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <ul className="list-disc ml-5">
            <li>View and manage seafarers</li>
            <li>Approve agency registrations</li>
            <li>Verify shipping company listings</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Recruitment Tools</h2>
          <ul className="list-disc ml-5">
            <li>AI-powered applicant matching</li>
            <li>Interview scheduling system</li>
            <li>Document verification center</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Payroll & Legal Compliance</h2>
          <ul className="list-disc ml-5">
            <li>NIF/NISS/Visa application tracking</li>
            <li>Segurança Social reporting</li>
            <li>AIMA compliance management</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Notifications & Messaging</h2>
          <ul className="list-disc ml-5">
            <li>Push notifications via FCM</li>
            <li>Email/SMS alerts</li>
            <li>Certificate expiry reminders</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;