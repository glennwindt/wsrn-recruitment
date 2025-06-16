// src/components/SeafarerApplicationForm.jsx

import React, { useState } from 'react';

const SeafarerApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    phone: '',
    email: '',
    experienceLevel: '',
    boardingPreferences: [],
    documents: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted application:", formData);
    alert("Application submitted successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">Seafarer Application Form</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        {/* Add other form fields here */}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default SeafarerApplicationForm;