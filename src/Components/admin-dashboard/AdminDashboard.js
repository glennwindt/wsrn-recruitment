// src/pages/AdminDashboard.js

import React from "react";
import LiveVideoInterview from "../components/LiveVideoInterview.js"; // ✅ Correct ESModule import

export default function AdminDashboard() {
  const sampleInterview = {
    applicantName: "John Doe",
    vesselType: "Container Ship",
    position: "Deck Officer",
    scheduledDate: "2025-04-20T10:00:00",
    link: "https://zoom.us/my/company.interview.room?pwd=SECURE123",
    status: "Scheduled"
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">WSRN – Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Manage recruitment, legal processing, and payroll
        </p>
      </header>

      <main>
        <LiveVideoInterview interview={sampleInterview} />
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} WSRN - Built with ❤️ in Portugal</p>
      </footer>
    </div>
  );
}

