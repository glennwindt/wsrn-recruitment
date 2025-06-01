import React, { useEffect } from "react";
import UrgencyAlertButton from "../components/UrgencyAlertButton";
import LiveVideoInterviewTool from "../components/LiveVideoInterviewTool";

export default function ApplicantScreen({ userRole }) {
  useEffect(() => {
    document.title = "WSRN - Applicant Screening";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold">Applicant Screening</h2>
        <p className="mt-2 text-gray-400">Match applicants to vessel positions</p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto space-y-8">
        <LiveVideoInterviewTool userRole={userRole} />
      </main>

      {/* Floating Alert Button */}
      <UrgencyAlertButton recipientType={userRole} role={userRole} />

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} WSRN – Built with ❤️ in Portugal</p>
      </footer>
    </div>
  );
}