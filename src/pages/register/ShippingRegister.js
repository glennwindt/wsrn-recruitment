// src/pages/register/ShippingRegister.js

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import CountrySelector from "../../components/CountrySelector";
import DropdownRoleSelector from "../../components/Common/DropdownRoleSelector";
import { cruiseCrewCategories } from "../../utils/cruiseCrewCategories";

export default function ShippingRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    fleetSize: "",
    fleetType: "",
    contactPerson: "",
    contactEmail: "",
    country: "",
    complianceInterest: "",
    partnershipModel: "",
    appliedRole: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    console.log("Shipping registration:", formData);
    alert("Shipping company registered successfully!");
  };

  return (
    <>
      <Helmet>
        <title>Register as Shipping Company | WSRN</title>
        <meta
          name="description"
          content="Connect with WSRN to onboard compliant crew, track legal forms, and access AI-matched maritime talent."
        />
      </Helmet>

      <main className="page">
        <h1>Register as Shipping Company</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
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
            name="fleetSize"
            type="number"
            placeholder="Fleet Size"
            value={formData.fleetSize}
            onChange={handleChange}
            required
          />
          <input
            name="fleetType"
            placeholder="Fleet Type"
            value={formData.fleetType}
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

          <label>Target Crew Role</label>
          <DropdownRoleSelector
            onSelect={handleRoleSelect}
            defaultValue=""
          />

          <label>Upload Supporting Documents</label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.png,.doc,.docx"
            onChange={handleFileUpload}
          />

          <label>Compliance Interest</label>
          <select
            name="complianceInterest"
            value={formData.complianceInterest}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Visa & Legal Processing</option>
            <option>Payroll Structure Setup</option>
            <option>Global Crew Matching</option>
          </select>

          <label>Partnership Model</label>
          <select
            name="partnershipModel"
            value={formData.partnershipModel}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Commission-Based Collaboration</option>
            <option>Full-Service Monthly Membership</option>
            <option>Integration with Existing HR System</option>
          </select>

          <button type="submit" className="form-submit-button">
            Submit Registration
          </button>
        </form>

        <footer>
          <p>
            © {new Date().getFullYear()} WSRN – Delivering AI-Matched Maritime Talent Worldwide
          </p>
        </footer>
      </main>
    </>
  );
}

