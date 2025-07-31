// src/components/LegalProcessingForm.js
import React, { useState } from "react";

export default function LegalProcessingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    applicantName: "",
    nationality: "",
    vesselType: "",
    position: "",
    visaType: "Work Permit",
    nifNumber: "",
    nissNumber: "",
    aimApplicationId: "",
    submissionDate: new Date().toISOString().split("T")[0],
    status: "In Review"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.nifNumber || !formData.nissNumber) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit?.(formData);
    alert(`✅ Application submitted for ${formData.applicantName}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Legal Processing Form</h3>
      
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
          <label className="block text-sm mb-2">Nationality</label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 rounded"
          >
            <option value="">Select Nationality</option>
            <option value="Portugal">Portugal</option>
            <option value="Philippines">Philippines</option>
            <option value="India">India</option>
            <option value="Brazil">Brazil</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Spain">Spain</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-2">Vessel Type</label>
          <input
            type="text"
            name="vesselType"
            value={formData.vesselType}
            onChange={handleChange}
            placeholder="Container Ship, Oil Tanker..."
            required
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Deck Officer, Engine Room Rating"
            required
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Visa Type</label>
          <select
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
          >
            <option value="Work Permit">Work Permit</option>
            <option value="Residency Visa">Residency Visa</option>
            <option value="Temporary Work Authorization">Temporary Work Authorization</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm mb-2">NIF Number</label>
          <input
            type="text"
            name="nifNumber"
            value={formData.nifNumber}
            onChange={handleChange}
            placeholder="123456789"
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">NISS Number</label>
          <input
            type="text"
            name="nissNumber"
            value={formData.nissNumber}
            onChange={handleChange}
            placeholder="12345678901"
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">AIMA Application ID</label>
          <input
            type="text"
            name="aimApplicationId"
            value={formData.aimApplicationId}
            onChange={handleChange}
            placeholder="APP000001"
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Submission Date</label>
          <input
            type="date"
            name="submissionDate"
            value={formData.submissionDate}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 rounded"
        >
          <option value="In Review">In Review</option>
          <option value="Approved">Approved</option>
          <option value="Pending Documentation">Pending Documentation</option>
          <option value="Submitted to AIMA">Submitted to AIMA</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded transition"
      >
        📝 Submit Legal Application
      </button>
    </form>
  );
}