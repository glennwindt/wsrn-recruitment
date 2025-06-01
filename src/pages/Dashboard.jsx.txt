// src/pages/Dashboard.jsx
import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="bg-gray-800 p-6 shadow-md rounded-lg max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">WSRN - Admin Dashboard</h1>
        <p className="mt-2 text-gray-300">Manage applicants, agencies, legal processing, AI matches</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">

        {/* Section: User Overview */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-300">
            View and manage all registered seafarers, agencies, and shipping companies.
          </p>
          <br />
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition">
            Manage Users
          </button>
        </section>

        {/* Section: AI Matching Engine */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">AI Applicant Matching</h2>
          <p className="text-gray-300">
            Match certified seafarers with agency and shipping company listings using vessel preference, experience level, and certification filters.
          </p>
          <br />
          <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded transition">
            Start Matching
          </button>
        </section>

        {/* Section: Legal Processing */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Legal Application Tracking</h2>
          <p className="text-gray-300">
            Track Visa, NIF, SEF, and work permit applications for foreign seafarers under Portuguese payroll.
          </p>
          <br />
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded transition">
            Process Applications
          </button>
        </section>

        {/* Section: Payroll & Commission */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Payroll & Commission System</h2>
          <p className="text-gray-300">
            Integrated bookkeeping linked to Finanças tax and Segurança Social. Support both commission-based and membership models.
          </p>
          <br />
          <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded transition">
            Manage Payments
          </button>
        </section>

        {/* Back to Homepage Button */}
        <div className="text-center mt-10">
          <button 
            onClick={() => window.location.href = "/"} 
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded transition"
          >
            ← Back to Homepage
          </button>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6 mt-12 text-center">
        <p>&copy; {new Date().getFullYear()} WSRN - Built with ❤️ in Portugal</p>
      </footer>
    </div>
  );
}