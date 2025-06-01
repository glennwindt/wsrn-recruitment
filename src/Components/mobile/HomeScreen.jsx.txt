import React from "react";

export default function HomeScreen({ userRole }) {
  return (
    <div className="space-y-6">
      <section className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Welcome to WSRN</h2>
        <p className="text-gray-300">
          Worldwide Seafarers Recruitment Network is a platform rooted in integrity, purpose, and service.
        </p>
      </section>

      <section className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="font-medium mb-2">Your Role:</h3>
        <p className={`capitalize inline-block px-3 py-1 rounded text-sm ${
          userRole === "admin" ? "bg-blue-900/30 text-blue-400" :
          userRole === "agency" ? "bg-green-900/30 text-green-400" :
          userRole === "shipping_company" ? "bg-purple-900/30 text-purple-400" : "bg-yellow-900/30 text-yellow-400"
        }`}>
          {userRole || "Guest"}
        </p>
      </section>

      <section className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="font-medium mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition">
            🎥 Join Interview
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition">
            📋 View Matches
          </button>
          <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded transition">
            📝 Update Profile
          </button>
        </div>
      </section>
    </div>
  );
}