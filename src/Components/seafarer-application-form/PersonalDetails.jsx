import React from 'react';
import CountrySelector from '../CountrySelector';

const PersonalDetails = ({ formData, handleChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Family Name</label>
          <input
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nationality</label>
          <CountrySelector
            selectedCountry={formData.nationality}
            onCountrySelect={(country) =>
              handleChange({ target: { name: "nationality", value: country } })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Country Code</label>
          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            readOnly
            className="w-full border p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Passport Number</label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Passport Expiry</label>
          <input
            type="date"
            name="passportExpiry"
            value={formData.passportExpiry}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

