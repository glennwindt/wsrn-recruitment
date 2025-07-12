import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function AgencyRegister() {
  const [formData, setFormData] = useState({
    agencyName: "",
    country: "",
    licenseNumber: "",
    contactPerson: "",
    contactEmail: "",
    preferredVessels: [],
    partnershipType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...formData.preferredVessels, value]
      : formData.preferredVessels.filter((v) => v !== value);
    setFormData({ ...formData, preferredVessels: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agency registration:", formData);
    alert("Your agency has been registered successfully!");
  };

  return (
    <main className="page">
      <Helmet>
        <title>Register as Agency | WSRN</title>
        <meta name="description" content="Partner with WSRN to access certified crew, legal onboarding tools, and smart recruitment solutions for the maritime sector." />
      </Helmet>

      <h1>Register as Maritime Staffing Agency</h1>
      <p>Join the WSRN network to connect with certified seafarers, automate onboarding, and improve global placement outcomes for your clients.</p>

      <form onSubmit={handleSubmit} className="form">
        <input name="agencyName" placeholder="Agency Name" value={formData.agencyName} onChange={handleChange} required />
        <input name="country" placeholder="Country of Operation" value={formData.country} onChange={handleChange} required />
        <input name="licenseNumber" placeholder="Legal License / Registration Number" value={formData.licenseNumber} onChange={handleChange} required />
        <input name="contactPerson" placeholder="Primary Contact Person" value={formData.contactPerson} onChange={handleChange} required />
        <input name="contactEmail" type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />

        <label>Preferred Vessel Types</label>
        {["Tanker", "Container", "Cruise", "Passenger", "Bulk Carrier"].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={formData.preferredVessels.includes(type)}
              onChange={handleCheckboxChange}
            />
            {type}
          </label>
        ))}

        <label>Partnership Preference</label>
        <select name="partnershipType" value={formData.partnershipType} onChange={handleChange}>
          <option value="">Select Type</option>
          <option>Commission-Based Access</option>
          <option>Monthly Subscription Model</option>
          <option>Joint Venture / Representation</option>
        </select>

        <button type="submit">Submit Registration</button>
      </form>

      <footer>
        <p>© {new Date().getFullYear()} WSRN – Elevating Maritime Staffing Standards Worldwide</p>
      </footer>
    </main>
  );
}

