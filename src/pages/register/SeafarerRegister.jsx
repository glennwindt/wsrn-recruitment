import React, { useState } from "react";
import { Helmet } from "react-helmet";
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
      const updatedCode = "+"; // Replace with actual country code logic
      setFormData({ ...formData, nationality: value, countryCode: updatedCode });
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
    <main className="page">
      <Helmet>
        <title>Register as Seafarer | WSRN</title>
        <meta name="description" content="Join WSRN as a certified seafarer and access global maritime opportunities with legal and payroll support under Portuguese law." />
      </Helmet>

      <h1>Register as Seafarer</h1>
      <p>Join the global network of certified maritime professionals. WSRN provides AI-based placement, legal guidance, and visa processing under Portuguese regulation.</p>

      <form onSubmit={handleSubmit} className="form">
        {/* Personal Info */}
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />

        <CountrySelector
          selectedCountry={formData.nationality}
          onCountrySelect={(country) => handleChange({ target: { name: "nationality", value: country } })}
        />

        {/* Contact Info */}
        <input value={formData.countryCode} readOnly />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

        {/* Experience Level */}
        <label>Experience Level</label>
        <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Entry">Entry</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Certified">Certified</option>
        </select>

        {/* Boarding Preferences */}
        <label>Boarding Preferences (Vessel Type)</label>
        {["Oil / Gas Tanker", "Container Ship", "Cruise Ship", "Bulk Carrier", "Passenger Vessel"].map((type) => (
          <label key={type}>
            <input type="checkbox" value={type} checked={formData.boardingPreferences.includes(type)} onChange={handleCheckboxChange} />
            {type}
          </label>
        ))}

        {/* Certificates */}
        <label>Upload Certifications</label>
        <input type="file" multiple onChange={handleChange} />

        <button type="submit">Submit Registration</button>
      </form>

      <footer>
        <p>© {new Date().getFullYear()} WSRN – Built with ❤️ for Seafarers Worldwide</p>
      </footer>
    </main>
  );
}

