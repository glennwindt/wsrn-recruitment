import React, { useState } from "react";

export default function AIDocumentReview({ userRole = "admin" }) {
  const [documents, setDocuments] = useState([
    {
      id: "DOC001",
      applicantName: "John Doe",
      documentType: "Passport",
      status: "Valid",
      expiryDate: "2030-12-31",
      fileName: "john_passport.pdf",
      uploadedBy: "John Doe",
      uploadedAt: "2025-04-18T10:00:00"
    },
    {
      id: "DOC002",
      applicantName: "Carlos Mendes",
      documentType: "Seaman Book",
      status: "Expiring Soon",
      expiryDate: "2025-06-30",
      fileName: "carlos_seaman_book.pdf",
      uploadedBy: "DSA Maritime Ltd.",
      uploadedAt: "2025-04-19T11:30:00"
    },
    {
      id: "DOC003",
      applicantName: "Lucas van der Meer",
      documentType: "Medical Fitness",
      status: "Invalid",
      expiryDate: "2024-09-15",
      fileName: "lucas_medical_certificate.pdf",
      uploadedBy: "Glenn van Windt",
      uploadedAt: "2025-04-20T09:15:00"
    }
  ]);

  const [formData, setFormData] = useState({
    applicantName: "",
    documentType: "",
    fileName: "",
    file: null,
    expiryDate: "",
    uploadedBy: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({
      ...prev,
      fileName: file.name,
      file
    }));
  };

  const handleSubmit = () => {
    if (!formData.applicantName || !formData.documentType || !formData.fileName) {
      alert("Please fill all required fields.");
      return;
    }

    const newDoc = {
      id: `DOC${String(documents.length + 1).padStart(3, "0")}`,
      ...formData,
      status: checkDocumentStatus(formData.expiryDate),
      uploadedAt: new Date().toISOString()
    };

    setDocuments([newDoc, ...documents]);
    alert(`✅ ${newDoc.documentType} for ${newDoc.applicantName} has been reviewed.`);
    
    // Clear form after submission
    setFormData({
      applicantName: "",
      documentType: "",
      fileName: "",
      file: null,
      expiryDate: "",
      uploadedBy: ""
    });
  };

  const checkDocumentStatus = (expiry) => {
    if (!expiry) return "Pending";
    const today = new Date();
    const exp = new Date(expiry);
    return exp < today ? "Expired" : "Valid";
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this document record?")) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI-Powered Document Review</h2>

      {/* Upload New Document */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Upload New Document</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Applicant Name</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Document Type</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="">Select Type</option>
              <option value="Passport">Passport</option>
              <option value="Seaman Book">Seaman Book</option>
              <option value="Medical Fitness">Medical Fitness Certificate</option>
              <option value="STCW">STCW Certificate</option>
              <option value="GMDSS">GMDSS Certificate</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Uploaded By</label>
            <input
              type="text"
              name="uploadedBy"
              value={formData.uploadedBy}
              onChange={handleChange}
              placeholder="Agency / Staff Name"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">File Upload</label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full p-2 bg-gray-800 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          📁 Submit for AI Review
        </button>
      </form>

      {/* Document List */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Submitted Documents ({documents.length})</h3>

        {documents.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Applicant</th>
                <th className="text-left p-2">Document</th>
                <th className="text-right p-2">Expiry</th>
                <th className="text-right p-2">Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => {
                const expDate = new Date(doc.expiryDate);
                const now = new Date();
                const daysLeft = Math.floor((expDate - now) / (1000 * 60 * 60 * 24));

                return (
                  <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                    <td className="py-3">{doc.applicantName}</td>
                    <td className="py-3">{doc.documentType}</td>
                    <td className="py-3 text-right">{doc.expiryDate}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        doc.status === "Valid" ? "bg-green-900/30 text-green-400" :
                        doc.status === "Expiring Soon" ? "bg-yellow-900/30 text-yellow-400" :
                        doc.status === "Expired" ? "bg-red-900/30 text-red-400" :
                        "bg-gray-700 text-gray-400"
                      }`}>
                        {doc.status}
                      </span>
                      {daysLeft <= 30 && daysLeft >= 0 && (
                        <p className="text-yellow-400 text-sm mt-1">Expires in {daysLeft} days</p>
                      )}
                      {daysLeft < 0 && (
                        <p className="text-red-400 text-sm mt-1">⚠️ Expired {Math.abs(daysLeft)} days ago</p>
                      )}
                    </td>
                    <td className="py-3 text-right space-x-3">
                      <button
                        onClick={() => alert(`Viewing ${doc.fileName}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        📄 View
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No documents submitted yet.</p>
        )}
      </section>
    </div>
  );
}