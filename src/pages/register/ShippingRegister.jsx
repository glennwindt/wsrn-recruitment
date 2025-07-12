import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function ShippingRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    fleetSize: "",
    fleetType: "",
    contactPerson: "",
    contactEmail: "",
    complianceInterest: "",
    partnershipModel: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping registration:", formData);
    alert("Shipping company registered successfully!");
  };

  return (
    <main className="page">
      <Helmet>
        <title>Register as Shipping Company | WSRN</title>
        <meta name="description" content="Connect with WSRN to onboard compliant crew, track international legal forms, and access AI-matched maritime talent globally." />
      </Helmet>

      <h1>Register as Shipping Company</h1>
      <p>WSRN streamlines crew onboarding, legal form tracking, and payroll solutions under Portuguese law — empowering maritime companies globally.</p>

      <form onSubmit={handleSubmit} className="form">
        <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
        <input name="fleetSize" type="number" placeholder="Fleet Size" value={formData.fleetSize} onChange={handleChange} required />
        <input name="fleetType" placeholder="Fleet Type (e.g. Ro-Ro, Tanker)" value={formData.fleetType} onChange={handleChange} required />
        <input name="contactPerson" placeholder="Primary Contact Person" value={formData.contactPerson} onChange={handleChange} required />
        <input name="contactEmail" type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />

        <label>Compliance Interest</label>
        <select name="complianceInterest" value={formData.complianceInterest} onChange={handleChange}>
          <option value="">Select</option>
          <option>Visa & Legal Processing</option>
          <option>Payroll Structure Setup</option>
          <option>Global Crew Matching</option>
        </select>

        <label>Partnership Model</label>
        <select name="partnershipModel" value={formData.partnershipModel} onChange={handleChange}>
          <option value="">Select</option>
          <option>Commission-Based Collaboration</option>
          <option>Full-Service Monthly Membership</option>
          <option>Integration with Existing HR System</option>
        </select>

        <button type="submit">Submit Registration</button>
      </form>

      <footer>
        <p>© {new Date().getFullYear()} WSRN – Delivering AI-Matched Maritime Talent Worldwide</p>
      </footer>
    </main>
  );
}

