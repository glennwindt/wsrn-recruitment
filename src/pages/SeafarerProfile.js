import React, { useState } from "react";
import { auth } from "../services/firebase";
import { uploadCertificate } from "../services/documentUploadAPI";
import { validateUploadedDocument } from "../services/aiDocumentValidation";

export default function SeafarerProfile({ userRole = "seafarer" }) {
  const [documents, setDocuments] = useState([
    {
      id: "DOC001",
      type: "Passport",
      fileName: "john_passport.pdf",
      uploadedAt: "2025-04-18T10:00:00Z",
      status: "Valid",
      confidence: 0.98,
      data: {
        name: "John Doe",
        passportNumber: "P1234567",
        expiryDate: "2030-12-31",
        nationality: "Philippines"
      }
    },
    {
      id: "DOC002",
      type: "Medical Fitness",
      fileName: "",
      uploadedAt: "",
      status: "Not Submitted",
      confidence: 0,
      data: {}
    }
  ]);

  const [formData, setFormData] = useState({
    type: "",
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        file: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.type || !formData.file) {
      alert("Please select document type and upload file.");
      return;
    }

    const documentData = {
      type: formData.type,
      file: formData.file,
      fileName: `${formData.type}_upload_${Date.now()}.pdf`,
      uploadedBy: auth.currentUser?.email
    };

    const documentId = await uploadCertificate(documentData, auth.currentUser?.uid);
    if (documentId) {
      alert(`✅ ${formData.type} submitted successfully.`);
      setDocuments([...documents, documentData]);
    }
  };

  const handleValidate = async (docIndex) => {
    const doc = documents[docIndex];

    if (!doc.id || !doc.type) {
      alert("Invalid document selected.");
      return;
    }

    const result = await validateUploadedDocument(doc.id, doc.file, doc.type);

    if (result.success === false) {
      alert(`❌ Document ${doc.type} failed validation.`);
    } else {
      const updatedDocs = [...documents];
      updatedDocs[docIndex] = {
        ...updatedDocs[docIndex],
        status: result.valid ? "Valid" : "Invalid",
        confidence: result.confidence,
        data: result.extractedData
      };

      setDocuments(updatedDocs);
      alert(`🧠 AI Validation Completed: ${result.documentId} is ${result.valid ? "valid" : "invalid"}`);
    }
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">WSRN – Seafarer Profile</h1>
        <p className="mt-2 text-gray-400">Manage your documents and certifications.</p>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        {/* Upload New Document */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold mb-4">Upload New Certificate</h2>

          <div>
            <label className="block text-sm mb-2">Document Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 rounded"
            >
              <option value="">Select Document</option>
              <option value="Passport">Passport</option>
              <option value="Seaman Book">Seaman Book</option>
              <option value="Medical Fitness">Medical Fitness</option>
              <option value="STCW">STCW Certificate</option>
              <option value="GMDSS">GMDSS License</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Upload File</label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              className="w-full p-3 bg-gray-700 rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
          >
            📁 Submit Document
          </button>
        </form>

        {/* List of Documents */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Submitted Documents ({documents.length})</h3>

          {documents.map((doc, index) => {
            const expDate = new Date(doc.data.expiryDate || doc.uploadedAt);
            const now = new Date();
            const daysLeft = Math.floor((expDate - now) / (1000 * 60 * 60 * 24));
            const expired = daysLeft < 0;

            return (
              <div key={index} className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{doc.type}</h4>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    doc.status === "Valid" ? "bg-green-900/30 text-green-400" :
                    doc.status === "Pending Review" ? "bg-yellow-900/30 text-yellow-400" : "bg-red-900/30 text-red-400"
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <p className="mt-2 text-sm">Uploaded: {doc.fileName}</p>
                {doc.data.expiryDate && (
                  <p className="mt-1 text-sm">
                    Expires: {formattedDate(doc.data.expiryDate)}
                    {expired && <span className="ml-2 text-red-400 font-semibold">⚠️ Expired</span>}
                  </p>
                )}

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => handleValidate(index)}
                    disabled={!doc.file || doc.status === "Valid"}
                    className={`text-sm py-1 px-3 rounded ${
                      doc.file && doc.status !== "Valid" 
                        ? "bg-green-600 hover:bg-green-700 cursor-pointer" 
                        : "bg-gray-700 cursor-not-allowed"
                    }`}
                  >
                    🤖 Validate with AI
                  </button>
                  <button
                    onClick={() => alert(`Viewing ${doc.fileName}`)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    📄 View PDF
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500 max-w-5xl mx-auto">
        <p>&copy; {new Date().getFullYear()} WSRN – Built with ❤️ in Portugal</p>
      </footer>
    </div>
  );
}