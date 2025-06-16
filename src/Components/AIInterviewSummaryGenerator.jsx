import React, { useState } from "react";

export default function AIInterviewSummaryGenerator({ interviewData }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = () => {
    if (!interviewData || !interviewData.transcript) {
      alert("No transcript available. Please provide an interview record.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const generatedSummary = `
        🔍 AI-Generated Interview Summary

        Applicant: ${interviewData.applicantName || "John Doe"}
        Nationality: ${interviewData.nationality || "Philippines"}
        Vessel: ${interviewData.vesselType || "Container Ship"} – ${interviewData.position || "Deck Officer"}
        Key Skills Identified: ${interviewData.certifications?.join(", ") || "STCW, GMDSS"}
        Boarding Preferences: ${interviewData.boardingPreferences?.join(", ") || "Container Ship, Passenger Vessel"}
        Experience Level: ${interviewData.experienceLevel || "Intermediate"}
        
        Final Recommendation:
        ${interviewData.recommendation || "Proceed to next stage."}
      `;

      setSummary(generatedSummary);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI Interview Summary Generator</h2>

      <div className="bg-gray-700 p-4 rounded mb-6">
        <h3 className="font-semibold mb-4">Interview Details</h3>
        <div className="space-y-2">
          <p><strong>Applicant:</strong> John Doe</p>
          <p><strong>Vessel:</strong> Container Ship – Deck Officer</p>
          <p><strong>Certifications:</strong> STCW, Medical Fitness</p>
          <p><strong>Boarding Preference:</strong> Container Ship, Passenger Vessel</p>
          <p><strong>Experience:</strong> Intermediate</p>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateSummary}
        disabled={loading}
        className={`mb-6 px-6 py-2 rounded font-semibold transition ${
          loading ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "🧠 Generating..." : "🧠 Generate AI Summary"}
      </button>

      {/* Summary Output */}
      {summary && (
        <div className="bg-gray-700 p-4 rounded mb-6 whitespace-pre-line">
          <h4 className="font-semibold mb-2">Generated Summary</h4>
          <pre className="text-sm text-gray-300">{summary}</pre>
        </div>
      )}

      {/* Notes Section */}
      <section className="mt-6">
        <h3 className="text-lg font-medium mb-4">Add Manual Notes</h3>
        <textarea
          rows="6"
          placeholder="Add additional observations here..."
          className="w-full p-3 bg-gray-700 rounded mb-4"
        ></textarea>
        <button
          type="button"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
        >
          📝 Save Notes
        </button>
      </section>
    </div>
  );
}