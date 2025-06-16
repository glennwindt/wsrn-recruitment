import React, { useState } from "react";

export default function LiveVideoInterview({ interview }) {
  const [showCall, setShowCall] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const handleJoinCall = () => {
    if (!interview.link) {
      alert("No video call link available yet. Please check back soon.");
      return;
    }

    setInProgress(true);
    setShowCall(true);
    setVideoUrl(interview.link);
  };

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end this interview?")) {
      setShowCall(false);
      setInProgress(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Live Interview Room</h2>

      {/* Interview Details */}
      <div className="bg-gray-700 p-4 rounded mb-6">
        <p><strong>Applicant:</strong> {interview.applicantName}</p>
        <p><strong>Vessel:</strong> {interview.vesselType} – {interview.position}</p>
        <p><strong>Scheduled:</strong> {new Date(interview.scheduledDate).toLocaleString()}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 inline-block px-2 py-1 rounded text-xs ${
            interview.status === "Scheduled" ? "bg-yellow-900/30 text-yellow-400" :
            interview.status === "Completed" ? "bg-green-900/30 text-green-400" :
            interview.status === "Missed" ? "bg-red-900/30 text-red-400" : "bg-blue-900/30 text-blue-400"
          }`}>
            {interview.status}
          </span>
        </p>
      </div>

      {/* Video Call Section */}
      {!showCall ? (
        <div className="flex flex-col items-center justify-center bg-gray-700 p-8 rounded-lg">
          <h3 className="text-lg font-medium mb-6">Ready for Interview?</h3>
          
          {/* Join Button */}
          <button
            onClick={handleJoinCall}
            disabled={interview.status !== "Scheduled"}
            className={`px-6 py-3 rounded font-semibold transition ${
              interview.status === "Scheduled" 
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" 
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {interview.status === "Scheduled" ? "🟢 Join Interview Room" : "🔒 Interview Not Scheduled"}
          </button>
          
          <p className="mt-4 text-sm text-gray-400">
            You will be able to join the call once the status is “Scheduled”.
          </p>
        </div>
      ) : (
        <div className="relative w-full h-[500px] bg-black rounded overflow-hidden">
          {/* Embedded Video Call Frame */}
          <iframe
            src={videoUrl || "https://example.com/video-call-room "}
            title="Video Interview"
            className="w-full h-full border-none"
            allow="fullscreen; microphone; camera; display-capture; speaker;"
          ></iframe>

          {/* End Call Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleEndCall}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded shadow-lg transition"
            >
              🔴 End Interview
            </button>
          </div>
        </div>
      )}

      {/* Notes Section */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Internal Notes</h3>
        <textarea
          rows="4"
          placeholder="Add notes about this interview..."
          className="w-full p-3 bg-gray-700 rounded"
        />
        <button
          type="button"
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          Save Notes
        </button>
      </section>

      {/* Footer Actions */}
      <footer className="mt-8 text-right">
        <button
          onClick={() => alert("📞 Contacting applicant...")}
          className="text-sm text-gray-400 hover:text-white mr-6"
        >
          📞 Contact Applicant
        </button>
        <button
          onClick={() => alert("📝 Mark as Completed")}
          disabled={!inProgress}
          className={`text-sm px-4 py-2 rounded ${
            inProgress 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-gray-700 cursor-not-allowed opacity-60"
          }`}
        >
          📝 Mark as Completed
        </button>
      </footer>
    </div>
  );
}