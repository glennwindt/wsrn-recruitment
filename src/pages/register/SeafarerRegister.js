// src/pages/register/SeafarerRegister.js

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import CountrySelector from "../../components/CountrySelector";
import ContractTimeline from "../../components/contractTimeline/ContractTimeline";
import DropdownRoleSelector from "../../components/Common/DropdownRoleSelector";
import VesselDropdown from "../../utils/VesselDropdown";
import { cruiseCrewCategories } from "../../utils/cruiseCrewCategories";
import "../../utils/VesselDropdown.css";
import "./SeafarerRegister.css";

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
    vesselCategory: "",
    position: "",
    appliedRole: "",
    files: [],
    militaryConfirmed: false,
    militaryLetter: null,
    militaryPurpose: "",
    militaryContactPhone: "",
    militaryContactEmail: "",
    seamanBookStatus: "",
    serviceEntries: [],
    entryLevelDetected: false,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const fileArray = Array.from(files).slice(0, 10);
      const seamanBookFile = fileArray.find((f) =>
        f.name.toLowerCase().includes("seaman")
      );

      const hasService = false; // mock OCR logic

      if (seamanBookFile) {
        setFormData((prev) => ({
          ...prev,
          seamanBookStatus: "valid",
          serviceEntries: hasService ? ["mocked entry"] : [],
          experienceLevel: hasService ? prev.experienceLevel : "Entry",
          entryLevelDetected: !hasService,
        }));
      }

      setFormData((prev) => ({ ...prev, files: fileArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, appliedRole: role }));
  };

  const handleVesselSelect = (type, subtype) => {
    if (type === "Defense") {
      setPopupMessage("⚠️ Authorization required to board military vessels.");
      setShowPopup(true);
    }

    setFormData((prev) => ({
      ...prev,
      vesselCategory: type,
      boardingPreferences: subtype ? [subtype] : [],
      militaryConfirmed: type === "Defense",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Seafarer registered successfully!");
  };

  return (
    <main className="seafarer-register-page">
      <Helmet>
        <title>Register as Seafarer | WSRN</title>
        <meta name="description" content="Join WSRN as a certified seafarer..." />
      </Helmet>

      <div className="page-wrapper">
        <div className="form-container">
          <h1 className="form-title">Seafarer Registration</h1>
          <form onSubmit={handleSubmit} className="form">

            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} required />

            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} required />

            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

            <label>Nationality</label>
            <CountrySelector selectedCountry={formData.nationality} onCountrySelect={(val) =>
              setFormData((prev) => ({ ...prev, nationality: val }))
            } />

            <label>Passport Number</label>
            <input name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />

            <label>Passport Expiry</label>
            <input type="date" name="passportExpiry" value={formData.passportExpiry} onChange={handleChange} required />

            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Experience Level</label>
            <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Certified">Certified Inland / EU</option>
            </select>

            {formData.entryLevelDetected && (
              <small style={{ color: "#007777" }}>
                📘 Seaman Book detected without service entries.
              </small>
            )}

            <label>Vessel Type & Subtype</label>
            <VesselDropdown onSelect={handleVesselSelect} />

            <label>Select Desired Crew Role</label>
            <DropdownRoleSelector onSelect={handleRoleSelect} defaultValue="" />

            <label>Upload Files (Max 10)</label>
            <input
              type="file"
              multiple
              name="documents"
              onChange={handleChange}
              accept=".pdf,.jpg,.png,.doc,.docx"
            />

            <button type="submit" className="form-submit-button">
              Register Seafarer
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
            <p style={{ textAlign: "center", color: "#000" }}>
              <strong style={{ color: "#ff0000" }}>⚠️ WARNING:</strong> Boarding a defense vessel requires signed authorization.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                className="popup-ok"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, militaryConfirmed: true }));
                  setShowPopup(false);
                }}
              >
                Proceed
              </button>
              <button
                className="popup-cancel"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, vesselCategory: "", militaryConfirmed: false }));
                  setShowPopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

