import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import CountrySelector from "../../components/CountrySelector";
import { vesselCategories } from "../../utils/vesselCategories";
import { vesselPositions } from "../../utils/vesselPositions";
import redOilTanker from '../../assets/red-oil-tanker.png';
import "./SeafarerRegister.css";

export default function SeafarerRegister() {
  const initialFormState = {
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
    vesselCategory: "",
    position: "",
    boardingPreferences: [],
    militaryConfirmed: false,
    files: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [preferenceLimitReached, setPreferenceLimitReached] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (preferenceLimitReached) {
      const timer = setTimeout(() => {
        setPreferenceLimitReached(false);
        setPopupPosition(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [preferenceLimitReached]);

  const requiredFields = [
    "firstName",
    "lastName",
    "dob",
    "nationality",
    "phone",
    "email",
    "experienceLevel",
    "vesselCategory",
    "position"
  ];

  const validateForm = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, files: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNationalityChange = (country) => {
    const updatedCode = "+351"; // Replace with actual logic if needed
    setFormData((prev) => ({
      ...prev,
      nationality: country,
      countryCode: updatedCode
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowValidationPopup(true);
      return;
    }

    console.log("Form submitted:", formData);
    alert("Seafarer registered successfully!");
  };

  const availableVessels = Object.values(vesselCategories).flat();
  const positionOptions = vesselPositions[formData.vesselCategory] || [];

  return (
    <>
      <Helmet>
        <title>Register as Seafarer | WSRN</title>
        <meta
          name="description"
          content="Join WSRN as a certified seafarer with secure military integration and smart vessel assignment."
        />
      </Helmet>

      <main
        className="seafarer-register-page"
        style={{
          backgroundImage: `url(${redOilTanker})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        {/* Floating Popup for Preference Limit */}
        {preferenceLimitReached && popupPosition && (
          <div
            className="floating-popup"
            style={{
              position: 'absolute',
              top: popupPosition.top - 60,
              left: popupPosition.left + 100,
              zIndex: 1000,
              backgroundColor: '#fff',
              border: '2px solid #0077cc',
              padding: '20px 25px',
              borderRadius: '10px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
              width: '300px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
            }}
          >
            You can select up to 3 vessel preferences only.
            <div style={{ marginTop: '15px' }}>
              <button
                onClick={() => {
                  setPreferenceLimitReached(false);
                  setPopupPosition(null);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0077cc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Military Confirmation Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
              <p className="popup-message">{popupMessage}</p>
              <div className="popup-actions">
                <button
                  className="popup-ok"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      militaryConfirmed: true
                    }));
                    setShowPopup(false);
                  }}
                >
                  Confirm Military Boarding
                </button>
                <button
                  className="popup-cancel"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      vesselCategory: "",
                      militaryConfirmed: false
                    }));
                    setShowPopup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Validation Error Popup */}
        {showValidationPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <button className="popup-close" onClick={() => setShowValidationPopup(false)}>×</button>
              <p className="popup-message">
                Please complete all mandatory fields before submitting.
              </p>
              <div className="popup-actions">
                <button className="popup-ok" onClick={() => setShowValidationPopup(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="form-container">
          <h1 className="form-title">Seafarer Registration</h1>
          <p className="form-subtitle">
            WSRN connects certified crew to global fleets with legal support and intelligent assignment routing.
          </p>

          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            className="form"
            noValidate
          >
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />

            <CountrySelector selectedCountry={formData.nationality} onCountrySelect={handleNationalityChange} />

            <input name="countryCode" value={formData.countryCode} readOnly />
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

            <label>Experience Level</label>
            <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Certified">Certified</option>
            </select>

            <label>Select Preferred Vessel Category <span style={{ fontWeight: "normal" }}>(Maximum 3 selections)</span></label>
            <div className="vessel-dropdown">
              <div
                className="dropdown-toggle"
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{
                  border: "1px solid #ccc",
                  padding: "0.6rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  fontSize: "1rem"
}}
              >
                {formData.boardingPreferences.length > 0
                  ? formData.boardingPreferences.join(", ")
                  : "Select Preferred Vessel Category"}
              </div>

              {dropdownOpen && (
                <div
                  className="dropdown-content"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "1rem",
                    marginTop: "0.5rem",
                    backgroundColor: "#f9f9f9",
                    maxHeight: "300px",
                    overflowY: "auto"
                  }}
                >
                  {availableVessels.map((vessel) => (
                    <label key={vessel} style={{ display: "block", marginBottom: "0.5rem" }}>
                      <input
                        type="checkbox"
                        value={vessel}
                        checked={formData.boardingPreferences.includes(vessel)}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          const currentPrefs = formData.boardingPreferences;

                          if (checked && currentPrefs.length >= 3) {
                            const rect = e.target.getBoundingClientRect();
                            setPopupPosition({
                              top: rect.top + window.scrollY,
                              left: rect.left + window.scrollX,
                            });
                            setPreferenceLimitReached(true);
                            return;
                          }

                          const updatedPreferences = checked
                            ? [...currentPrefs, value]
                            : currentPrefs.filter((pref) => pref !== value);

                          const updatedCategory = updatedPreferences[0] || "";

                          setFormData((prev) => ({
                            ...prev,
                            boardingPreferences: updatedPreferences,
                            vesselCategory: updatedCategory
                          }));

                          if (checked && value === "Naval Ship") {
                            setPopupMessage("Military boarding requires confirmation.");
                            setShowPopup(true);
                          }
                        }}
                      />
                      {vessel}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <label>Preferred Position</label>
            <select name="position" value={formData.position} onChange={handleChange} required>
              <option value="">Select</option>
              {positionOptions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>

            <label>Upload Certifications</label>
            <input type="file" multiple onChange={handleChange} />

            <button type="submit">Submit Registration</button>
            <div className="footer-spacer" />
          </form>
        </div>
      </main>
    </>
  );
}


