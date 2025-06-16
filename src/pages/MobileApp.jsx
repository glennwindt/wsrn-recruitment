import React, { useState, useEffect } from "react";
import HomeScreen from "../components/mobile/HomeScreen";
import MatchScreen from "../components/mobile/MatchScreen";
import InterviewsScreen from "../components/mobile/InterviewsScreen";
import ProfileScreen from "../components/mobile/ProfileScreen";

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated user login check
  useEffect(() => {
    const simulateLoginCheck = async () => {
      // In real app, this would be Firebase auth
      const role = await checkUserRole();
      setUserRole(role);
      setLoading(false);
    };

    simulateLoginCheck();
  }, []);

  const checkUserRole = () => {
    // Simulated roles: admin, agency, shipping_company, seafarer
    return "seafarer"; // You'd fetch this from Firebase Auth in production
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading mobile app...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-bold">WSRN Mobile</h1>
        <div className="flex items-center space-x-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs ${
            userRole === "admin" ? "bg-blue-900/30 text-blue-400" :
            userRole === "agency" ? "bg-green-900/30 text-green-400" :
            userRole === "shipping_company" ? "bg-purple-900/30 text-purple-400" : "bg-yellow-900/30 text-yellow-400"
          }`}>
            {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
          </span>
          <button
            onClick={() => alert("Logging out...")}
            className="text-sm text-red-500 hover:text-red-400"
          >
            🔐 Log Out
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-gray-800 p-2 flex justify-around border-t border-gray-700">
        <button
          onClick={() => setActiveTab("home")}
          className={`px-2 py-1 text-center ${
            activeTab === "home" ? "text-blue-400" : "text-gray-400"
          }`}
        >
          🏠 Home
        </button>
        <button
          onClick={() => setActiveTab("match")}
          className={`px-2 py-1 text-center ${
            activeTab === "match" ? "text-blue-400" : "text-gray-400"
          }`}
        >
          🎯 Match
        </button>
        <button
          onClick={() => setActiveTab("interviews")}
          className={`px-2 py-1 text-center ${
            activeTab === "interviews" ? "text-blue-400" : "text-gray-400"
          }`}
        >
          🎥 Interviews
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-2 py-1 text-center ${
            activeTab === "profile" ? "text-blue-400" : "text-gray-400"
          }`}
        >
          👤 Profile
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 bg-gray-900">
        {activeTab === "home" && <HomeScreen userRole={userRole} />}
        {activeTab === "match" && <MatchScreen userRole={userRole} />}
        {activeTab === "interviews" && <InterviewsScreen userRole={userRole} />}
        {activeTab === "profile" && <ProfileScreen userRole={userRole} />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-3 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} WSRN – Built with ❤️ in Portugal</p>
        <p className="mt-1">Private Access for Staff, Agencies, Shipping Companies, and Crew Members</p>
      </footer>
    </div>
  );
}