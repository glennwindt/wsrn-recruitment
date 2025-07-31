import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { recommendTrainingCenter } from "../services/trainingCenterRecommender";

export default function CertificateRenewalAlerts({ userRole = "seafarer" }) {
  const [documents, setDocuments] = useState([
    {
      id: "DOC001",
      applicantName: "John Doe",
      documentType: "STCW",
      expiryDate: "2024-12-31",
      issuedBy: "Maritime School of Lisbon",
      nationality: "Philippines",
      currentLocation: {
        city: "Lisbon",
        country: "Portugal"
      },
      employer: "DSA Maritime Ltd."
    },
    {
      id: "DOC002",
      applicantName: "Carlos Mendes",
      documentType: "Medical Fitness",
      expiryDate: "2025-06-30",
      issuedBy: "Dutch Maritime Authority",
      nationality: "Brazil",
      currentLocation: {
        city: "Rotterdam",
        country: "Netherlands"
      },
      employer: "Ocean Star Shipping"
    },
    {
      id: "DOC003",
      applicantName: "Lucas van der Meer",
      documentType: "GMDSS",
      expiryDate: "2025-04-30",
      issuedBy: "Global Seafarer Training Center",
      nationality: "Netherlands",
      currentLocation: {
        city: "Manila",
        country: "Philippines"
      },
      employer: "Glenn van Windt Recruitment"
    }
  ]);

  const [recommendedSchools, setRecommendedSchools] = useState([]);

  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleSendReminder = async (doc) => {
    const recipient = userRole === "seafarer" ? doc.applicantEmail : doc.employerEmail;

    alert(`📧 Sending reminder to ${recipient || doc.employer} about ${doc.documentType}`);

    // In real app, this would call Firebase Function
    const schools = await recommendTrainingCenter(doc.currentLocation, doc.documentType, doc.id);
    setRecommendedSchools(schools);
  };

  const handleUpdateFromAgency = (docId) => {
    alert(`✅ Agency has marked ${docId} as renewed.`);
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() + 5); // Assume 5-year extension

    setDocuments(documents.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          expiryDate: newDate.toISOString().split("T")[0],
          status: "Valid"
        };
      }
      return doc;
    }));
  };

  const handleUpdateFromSeafarer = (docId) => {
    alert(`✅ Seafarer has updated ${docId}.`);
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() + 5); // Assume 5-year extension

    setDocuments(documents.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          expiryDate: newDate.toISOString().split("T")[0],
          status: "Valid"
        };
      }
      return doc;
    }));
  };

  const daysLeft = (expDate) => {
    const today = new Date();
    const exp = new Date(expDate);
    return Math.floor((exp - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Certificate Renewal Alerts</h2>

      {documents.length > 0 ? (
        <table className="w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Applicant</th>
              <th className="text-left p-2">Certificate</th>
              <th className="text-right p-2">Expiry Date</th>
              <th className="text-right p-2">Issued By</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => {
              const expDate = new Date(doc.expiryDate);
              const now = new Date();
              const days = Math.floor((expDate - now) / (1000 * 60 * 60 * 24));
              const needsRefresher = ["STCW", "GMDSS"].includes(doc.documentType);

              return (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{doc.applicantName}</td>
                  <td className="py-3">{doc.documentType}</td>
                  <td className="py-3 text-right text-gray-400">{formattedDate(doc.expiryDate)}</td>
                  <td className="py-3 text-right">{doc.issuedBy}</td>
                  <td className="py-3 text-right space-x-3">
                    <button
                      onClick={() => handleSendReminder(doc)}
                      className={`text-sm ${
                        days < 0 ? "text-red-400 hover:text-red-300" : "text-blue-400 hover:text-blue-300"
                      }`}
                    >
                      {days < 0 ? "⚠️ Expired" : "📅 Check Renewal"}
                    </button>
                    {userRole === "agency" && (
                      <button
                        onClick={() => handleUpdateFromAgency(doc.id)}
                        className="text-green-400 hover:text-green-300 text-sm"
                      >
                        ✅ Agency Mark as Renewed
                      </button>
                    )}
                    {userRole === "seafarer" && (
                      <button
                        onClick={() => handleUpdateFromSeafarer(doc.id)}
                        className="text-green-400 hover:text-green-300 text-sm"
                      >
                        ✅ Crew Mark as Renewed
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="italic text-gray-400 mt-4">No documents recorded yet.</p>
      )}

      {/* Recommended Schools */}
      {recommendedSchools.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recommended Training Centers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedSchools.map((school, i) => (
              <div key={i} className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold">{school.name}</h4>
                <p className="text-sm text-gray-400">{school.city}, {school.country}</p>
                <p className="mt-2 text-sm">Courses Offered:</p>
                <ul className="list-disc pl-5 mt-1 text-sm">
                  {school.courses.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
                <a href={school.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm">
                  🖥 Visit Website
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}