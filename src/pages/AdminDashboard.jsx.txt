import React, { useState } from "react";
import CTTTrackingWidget from "../components/CTTTrackingWidget";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("ctt");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">WSRN – Administrative Tools</h1>
        <p className="mt-2 text-gray-400">Manage recruitment, legal processing, and payroll</p>
      </header>

      {/* Tab Navigation */}
      <nav className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("ctt")}
          className={`px-4 py-2 rounded transition ${
            activeTab === "ctt" ? "bg-blue-700" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          📦 CTT Tracking
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto">
        {activeTab === "ctt" && <CTTTrackingWidget />}
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} WSRN – Built with ❤️ in Portugal</p>
        <p className="mt-2 text-sm">For global maritime staffing and legal compliance</p>
      </footer>
    </div>
  );
}