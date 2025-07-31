// src/pages/register/AgencyRegister.js

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import vesselCategories from "../../utils/vesselCategories";
import DropdownRoleSelector from "../../components/Common/DropdownRoleSelector";
import CountrySelector from "../../components/CountrySelector";

export default function AgencyRegister() {
  const [formData, setFormData] = useState({
    agencyName: "",
    country: "",
    licenseNumber: "",
    contactPerson: "",
    contactEmail: "",
    preferredVessels: [],
    partnershipType: "",
    appliedRole: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...formData.preferredVessels, value]
      : formData.preferredVessels.filter((v) => v !== value);
    setFormData((prev) => ({ ...prev, preferredVessels: updated }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, appliedRole: role }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setFormData((prev) => ({ ...prev, files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agency registration:", formData);
    alert("Agency registered successfully!");
  };

  return (
    <main className="page">
      <Helmet>
        <title>Register as Maritime Staffing Agency | WSRN</title>
        <meta
          name="description"
          content="Partner with WSRN to access certified crew, legal onboarding tools, and smart recruitment solutions for the maritime sector."
        />
      </Helmet>

      <h1>Register as Maritime Staffing Agency</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="agencyName"
          placeholder="Agency Name"
          value={formData.agencyName}
          onChange={handleChange}
          required
        />
        <CountrySelector
          selectedCountry={formData.country}
          onCountrySelect={(val) =>
            setFormData((prev) => ({ ...prev, country: val }))
          }
        />
        <input
          name="licenseNumber"
          placeholder="Legal License Number"
          value={formData.licenseNumber}
          onChange={handleChange}
          required
        />
        <input
          name="contactPerson"
          placeholder="Primary Contact"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          name="contactEmail"
          type="email"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />

        <label>Select Target Crew Role</label>
        <DropdownRoleSelector
          onSelect={handleRoleSelect}
          defaultValue=""
        />

        <label>Preferred Vessel Types</label>
        {Object.entries(vesselCategories).map(([group, subtypes]) => (
          <fieldset key={group}>
            <legend>{group}</legend>
            {subtypes.map((sub) => (
              <label key={sub} style={{ display: "block", margin: "4px 0" }}>
                <input
                  type="checkbox"
                  value={sub}
                  checked={formData.preferredVessels.includes(sub)}
                  onChange={handleCheckboxChange}
                />
                {" "}{sub}
              </label>
            ))}
          </fieldset>
        ))}

        <label>Upload Supporting Documents</label>
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.png,.doc,.docx"
          onChange={handleFileUpload}
        />

        <label>Partnership Preference</label>
        <select
          name="partnershipType"
          value={formData.partnershipType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Commission-Based Access</option>
          <option>Monthly Subscription Model</option>
          <option>Joint Venture / Representation</option>
        </select>

        <button type="submit" className="form-submit-button">
          Submit Registration
        </button>
      </form>

      <footer>
        <p>
          © {new Date().getFullYear()} WSRN – Elevating Maritime Staffing
          Standards Worldwide
        </p>
      </footer>
    </main>
  );
}

