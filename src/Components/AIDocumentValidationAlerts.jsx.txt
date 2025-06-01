import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, getFirestore } from "firebase/firestore";
import { db } from "../services/firebase";
import { validateUploadedDocument } from "../services/aiDocumentValidation";

export default function AIDocumentValidationAlerts({ userRole = "admin" }) {
  const [documents, setDocuments] = useState([
    {
      id: "DOC001",
      applicantName: "John Doe",
      documentType: "Passport",
      expiryDate: "2025-12-31",
      issuedBy: "Philippine Government"
    },
    {
      id: "DOC002",
      applicantName: "Carlos Mendes",
      documentType: "Medical Fitness",
      expiryDate: "2025-05-31",
      issuedBy: "Dutch Maritime Authority"
    },
    {
      id: "DOC003",
      applicantName: "Lucas van der Meer",
      documentType: "STCW",
      expiryDate: "2024-12-31",
      issuedBy: "Maritime School of Lisbon"
    }
  ]);

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date();
      const soonThreshold = new Date();
      soonThreshold.setMonth(soonThreshold.getMonth() + 1); // Within 1 month

      const newAlerts = documents.filter(doc => {
        const expDate = new Date(doc.expiryDate);
        return expDate < soonThreshold;
      });

      setAlerts(newAlerts);
    };

    checkExpiry();
  }, []);

  const sendEmailNotification = (document) => {
    alert(`📧 Sending renewal reminder to ${document.applicantName} for ${document.documentType}`);
  };

  const handleRenewal = (documentId) => {
    alert(`🔄 Marking document ${documentId} as renewed.`);
    setAlerts(alerts.filter(a => a.id !== documentId));
  };

  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI Document Validation Alerts</h2>

      {alerts.length > 0 ? (
        <table className="w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Applicant</th>
              <th className="text-left p-2">Document Type</th>
              <th className="text-right p-2">Expiry Date</th>
              <th className="text-right p-2">Status</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((doc, index) => {
              const expDate = new Date(doc.expiryDate);
              const now = new Date();
              const daysLeft = Math.floor((expDate - now) / (1000 * 60 * 60 * 24));
              const needsRefresher = ["STCW", "GMDSS"].includes(doc.documentType);

              return (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{doc.applicantName}</td>
                  <td className="py-3">{doc.documentType}</td>
                  <td className="py-3 text-right text-gray-400">{formattedDate(doc.expiryDate)}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      daysLeft < 0 ? "bg-red-900/30 text-red-400" :
                      daysLeft < 30 ? "bg-yellow-900/30 text-yellow-400" : "bg-green-900/30 text-green-400"
                    }`}>
                      {daysLeft < 0 ? "Expired" : daysLeft < 30 ? "Expiring Soon" : "Valid"}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-3">
                    <button
                      onClick={() => sendEmailNotification(doc)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      📬 Notify Applicant
                    </button>
                    <button
                      onClick={() => handleRenewal(doc.id)}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      ✅ Mark as Renewed
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="bg-gray-700 p-6 rounded text-center">
          <p className="text-gray-400 italic">No upcoming certificate renewals detected.</p>
        </div>
      )}

      <section className="mt-8">
        <h3 className="font-semibold mb-4">All Documents</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Applicant</th>
              <th className="text-left p-2">Document</th>
              <th className="text-right p-2">Issued By</th>
              <th className="text-right p-2">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                <td className="py-3">{doc.applicantName || "Unassigned"}</td>
                <td className="py-3">{doc.documentType}</td>
                <td className="py-3 text-right">{doc.issuedBy}</td>
                <td className="py-3 text-right text-gray-400">{formattedDate(doc.expiryDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}