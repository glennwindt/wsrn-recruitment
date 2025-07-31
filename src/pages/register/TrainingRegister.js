import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function TrainingRegister() {
  const [formData, setFormData] = useState({
    institutionName: "",
    location: "",
    annualGraduates: "",
    contactPerson: "",
    contactEmail: "",
    partnershipModel: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Training registration:", formData);
    alert("Training center registered successfully!");
  };

  return (
    <main className="page">
      <Helmet>
        <title>Register Training Center | WSRN</title>
        <meta name="description" content="Collaborate with WSRN as a maritime training school. Onboard graduates, access digital tools, and match students with global shipping careers." />
      </Helmet>

      <h1>Register Maritime School / Training Center</h1>
      <p>Become a WSRN-certified partner to help your graduates access AI-based job matching, visa facilitation, and industry placement worldwide.</p>

      <form onSubmit={handleSubmit} className="form">
        <input name="institutionName" placeholder="Institution Name" value={formData.institutionName} onChange={handleChange} required />
        <input name="location" placeholder="Location (e.g. Lisbon, Rotterdam)" value={formData.location} onChange={handleChange} required />
        <input name="annualGraduates" type="number" placeholder="Number of Annual Graduates" value={formData.annualGraduates} onChange={handleChange} required />
        <input name="contactPerson" placeholder="Primary Contact Person" value={formData.contactPerson} onChange={handleChange} required />
        <input name="contactEmail" type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />

        <label>Preferred Partnership Model</label>
        <select name="partnershipModel" value={formData.partnershipModel} onChange={handleChange}>
          <option value="">Select</option>
          <option>Graduate Integration Portal</option>
          <option>Training Accreditation</option>
          <option>AI-Matching Dashboard Access</option>
        </select>

        <button type="submit">Become a WSRN Partner</button>
      </form>

      <footer>
        <p>© {new Date().getFullYear()} WSRN – Connecting Maritime Education with Global Opportunity</p>
      </footer>
    </main>
  );
}

