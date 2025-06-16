import React, { useState } from "react";
import { uploadCertificate } from "../services/documentUploadAPI";

export default function DigitalSignatureTool({ userRole = "applicant" }) {
  const [signatureText, setSignatureText] = useState("");
  const [contractData, setContractData] = useState({
    title: "",
    content: "",
    vessel: "",
    position: "",
    duration: "",
    salary: ""
  });

  const [signedContracts, setSignedContracts] = useState([
    {
      id: "CON001",
      title: "Employment Contract - Deck Officer",
      signedBy: "John Doe",
      vessel: "MV Blue Horizon",
      position: "Deck Officer",
      signedAt: "2025-04-18T14:30:00Z",
      status: "Active"
    },
    {
      id: "CON002",
      title: "Promotion Agreement - Engine Room Rating",
      signedBy: "Carlos Mendes",
      vessel: "MV Ocean Star",
      position: "Engine Room Rating",
      signedAt: "2025-04-10T09:15:00Z",
      status: "Pending Approval"
    }
  ]);

  const handleContractChange = (e) => {
    const { name, value } = e.target;
    setContractData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!contractData.title || !contractData.content) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate PDF generation
    const blob = new Blob([contractData.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Simulate upload
    const result = await uploadCertificate({
      type: "Employment Contract",
      file: url,
      fileName: `${contractData.title}.pdf`,
      vessel: contractData.vessel,
      position: contractData.position
    }, "applicant");

    if (result?.success === false) {
      alert("❌ Failed to save contract");
      return;
    }

    // Add to signed contracts list
    const newContract = {
      id: `CON${String(signedContracts.length + 1).padStart(3, "0")}`,
      ...contractData,
      signedAt: new Date().toISOString(),
      status: "Pending Applicant Signature"
    };

    setSignedContracts([newContract, ...signedContracts]);
    setContractData({
      title: "",
      content: "",
      vessel: "",
      position: "",
      duration: "",
      salary: ""
    });

    alert("📄 Contract created successfully. Please review and sign.");
  };

  const handleSign = (contractId) => {
    alert(`✅ Contract ${contractId} has been digitally signed.`);
    setSignedContracts(signedContracts.map(c => {
      if (c.id === contractId) {
        return {
          ...c,
          status: "Signed",
          signedBy: userRole === "applicant" ? "Applicant" : "Agency"
        };
      }
      return c;
    }));
  };

  const handleDownload = (contractId) => {
    alert(`⬇️ Downloading contract ${contractId}...`);
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
      <h2 className="text-2xl font-bold mb-6">Digital Signature Tool</h2>

      {/* Create New Contract */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Create New Employment Contract</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={contractData.title}
              onChange={handleContractChange}
              placeholder="E.g., Employment Contract - Deck Officer"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Vessel Type</label>
            <input
              type="text"
              name="vessel"
              value={contractData.vessel}
              onChange={handleContractChange}
              placeholder="MV Blue Horizon"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={contractData.position}
              onChange={handleContractChange}
              placeholder="Deck Officer / Engine Room Rating"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              value={contractData.duration}
              onChange={handleContractChange}
              placeholder="6 Months / 1 Year"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={contractData.salary}
              onChange={handleContractChange}
              placeholder="€2500 / Month"
              className="w-full p-3 bg-gray-800 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Contract Content</label>
          <textarea
            rows="6"
            name="content"
            value={contractData.content}
            onChange={handleContractChange}
            placeholder="Enter contract terms here..."
            className="w-full p-3 bg-gray-800 rounded"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
        >
          📝 Generate Contract
        </button>
      </form>

      {/* List of Contracts */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Your Signed Contracts ({signedContracts.length})</h3>

        {signedContracts.length > 0 ? (
          <table className="w-full table-auto border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Title</th>
                <th className="text-right p-2">Signed By</th>
                <th className="text-right p-2">Status</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signedContracts.map((contract, index) => (
                <tr key={index} className="hover:bg-gray-700 transition border-b border-gray-700">
                  <td className="py-3">{contract.title}</td>
                  <td className="py-3 text-right">{contract.signedBy}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      contract.status === "Signed" ? "bg-green-900/30 text-green-400" :
                      contract.status === "Pending Applicant Signature" ? "bg-yellow-900/30 text-yellow-400" :
                      contract.status === "Pending Agency Approval" ? "bg-blue-900/30 text-blue-400" : "bg-red-900/30 text-red-400"
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-3">
                    <button
                      onClick={() => handleDownload(contract.id)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      📄 View PDF
                    </button>
                    {userRole === "applicant" && contract.status !== "Signed" && (
                      <button
                        onClick={() => handleSign(contract.id)}
                        className="text-green-400 hover:text-green-300 text-sm"
                      >
                        ✍️ Sign Digitally
                      </button>
                    )}
                    {userRole === "agency" && contract.status === "Pending Applicant Signature" && (
                      <button
                        onClick={() => alert(`Send reminder to ${contract.signedBy}`)}
                        className="text-orange-400 hover:text-orange-300 text-sm"
                      >
                        📬 Send Reminder
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-400 mt-4">No signed contracts yet.</p>
        )}
      </section>
    </div>
  );
}