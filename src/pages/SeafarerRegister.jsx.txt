import React, { useState } from "react";
import CountrySelector from "../components/CountrySelector";

export default function SeafarerRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
    countryCode: "+351",
    phone: "",
    email: "",
    experienceLevel: "",
    boardingPreferences: [],
    files: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.type === "file") {
      setFormData({ ...formData, files: Array.from(files) });
    } else if (name === "nationality") {
      const updatedCode = countryCodeMap[value] || "+";

      setFormData({
        ...formData,
        nationality: value,
        countryCode: updatedCode
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedPreferences = checked
      ? [...formData.boardingPreferences, value]
      : formData.boardingPreferences.filter((pref) => pref !== value);

    setFormData({ ...formData, boardingPreferences: updatedPreferences });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Seafarer registered successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Seafarer Registration</h2>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 rounded text-white"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 rounded text-white"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="p-3 bg-gray-700 rounded text-white"
          />

          <CountrySelector
            selectedCountry={formData.nationality}
            onCountrySelect={(country) => {
              handleChange({ target: { name: "nationality", value: country } });
            }}
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={formData.countryCode}
            readOnly
            className="p-3 bg-gray-700 rounded text-center"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="col-span-2 p-3 bg-gray-700 rounded text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="col-span-3 p-3 bg-gray-700 rounded text-white"
          />
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <label className="block font-medium">Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 rounded text-white"
          >
            <option value="">Select Experience Level</option>
            <option value="Entry">Entry</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Certified">Certified</option>
          </select>
        </div>

        {/* Boarding Preferences */}
        <div className="space-y-2">
          <label className="block font-medium">Boarding Preferences (Vessel Type)</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["Oil / Gas Tanker", "Container Ship", "Cruise Ship", "Bulk Carrier", "Passenger Vessel"].map((type) => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.boardingPreferences.includes(type)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition"
        >
          Register as Seafarer
        </button>
      </form>
    </div>
  );
}