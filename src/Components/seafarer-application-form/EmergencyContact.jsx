// src/components/seafarer-application-form/EmergencyContact.jsx

import React, { useState } from 'react';

const EmergencyContact = () => {
  const [formData, setFormData] = useState({
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    emergencyRelationship: '',
    emergencyPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Emergency Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Father's Phone</label>
          <input
            type="tel"
            name="fatherPhone"
            value={formData.fatherPhone}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mother's Phone</label>
          <input
            type="tel"
            name="motherPhone"
            value={formData.motherPhone}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Emergency Contact Relationship</label>
          <input
            type="text"
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            placeholder="e.g., Brother, Uncle, Close Friend"
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Emergency Contact Number</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;