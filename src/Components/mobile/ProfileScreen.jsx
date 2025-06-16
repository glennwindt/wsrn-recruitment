import React, { useState } from "react";

export default function ProfileScreen({ userRole }) {
  const [applicant, setApplicant] = useState({
    name: "John Doe",
    nationality: "Philippines",
    passportNumber: "P1234567",
    expiryDate: "2030-12-31",
    positions: ["Deck Officer", "Cargo Watch"],
    certifications: ["STCW", "Medical Fitness", "GMDSS"],
    onboardSchedules: ["6/3 Months", "9/3 Months"]
  });

  const handleCertUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    alert(`✅ Uploaded: ${file.name}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Your Profile</h2>

      {/* Personal Info */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Personal Information</h3>
        <p><strong>Name:</strong> {applicant.name}</p>
        <p><strong>Nationality:</strong> {applicant.nationality}</p>
        <p><strong>Passport:</strong> {applicant.passportNumber}</p>
        <p><strong>Expiry:</strong> {applicant.expiryDate}</p>
      </div>

      {/* Certifications */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Certifications</h3>
        <ul className="list-disc pl-5 mb-4">
          {applicant.certifications.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
        <input type="file" onChange={handleCertUpload} />
      </div>

      {/* Boarding Preferences */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Boarding Preferences</h3>
        <ul className="space-y-1">
          {applicant.onboardSchedules.map((schedule, i) => (
            <li key={i} className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              {schedule}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Update Profile</h3>
        <button
          onClick={() => alert("📝 Saving profile updates...")}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}