import React from "react";

export default function RegistrationGuide({ role = "guest" }) {
  const introMessage = {
    seafarer:
      "⚓ Your journey begins here. Select your preferences so we can guide your path toward meaningful maritime service.",
    agency:
      "🏢 Welcome, Agency Partner. Help us understand your needs so we can connect you with committed seafarers worldwide.",
    shipping:
      "🚢 Set sail with the right crew. Share your vessel and crewing needs to unlock seamless global recruitment.",
    training:
      "🎓 Your academy empowers futures. Let WSRN help match your training programs with eager, qualified candidates.",
    guest:
      "👋 Explore your options. With WSRN, everyone is seen, respected, and invited to grow within the maritime community."
  };

  const getFormFields = () => {
    switch (role) {
      case "seafarer":
        return (
          <>
            <label>🌍 Preferred Region:</label>
            <select>
              <option>Select Region</option>
              <option>Mediterranean</option>
              <option>Pacific & Southeast Asia</option>
              <option>Middle East</option>
              <option>Inland Waterways</option>
              <option>Offshore Platforms</option>
              <option>Worldwide</option>
            </select>

            <label>🚢 Vessel Preference:</label>
            <select>
              <option>Select Vessel Type</option>
              <option>Cruise Ship</option>
              <option>Oil/Gas Tanker</option>
              <option>Container Ship</option>
              <option>Bulk Carrier</option>
              <option>Passenger Ferry</option>
            </select>

            <label>📄 Contract Style:</label>
            <select>
              <option>Rotation</option>
              <option>Short-Term</option>
              <option>Permanent</option>
            </select>

            <label>📜 Certifications Held:</label>
            <input type="text" placeholder="e.g., STCW, ENG1, Passport Number" />
          </>
        );

      case "agency":
        return (
          <>
            <label>🌍 Region of Operation:</label>
            <select>
              <option>Europe</option>
              <option>Asia</option>
              <option>Middle East</option>
              <option>Africa</option>
              <option>Worldwide</option>
            </select>

            <label>👥 Crew Specialization:</label>
            <input
              type="text"
              placeholder="e.g., Deck Officers, Engineers, Hospitality"
            />

            <label>📎 Upload Credentials:</label>
            <input type="file" />
          </>
        );

      case "shipping":
        return (
          <>
            <label>🚢 Vessel Fleet Type:</label>
            <select>
              <option>Commercial Cargo</option>
              <option>Offshore Operations</option>
              <option>Cruise & Passenger Transport</option>
            </select>

            <label>📍 Operating Regions:</label>
            <select>
              <option>Global</option>
              <option>EU Waters</option>
              <option>Asian Trade Routes</option>
            </select>

            <label>🧭 Crew Role Needs:</label>
            <input
              type="text"
              placeholder="e.g., Navigation Officers, Mechanics, Stewards"
            />
          </>
        );

      case "training":
        return (
          <>
            <label>📚 Programs Offered:</label>
            <input
              type="text"
              placeholder="e.g., STCW, Safety Training, Navigation"
            />

            <label>🌍 Center Location:</label>
            <input type="text" placeholder="e.g., Manila, Athens, Dubai" />

            <label>📎 Accreditations:</label>
            <input
              type="text"
              placeholder="e.g., IMO Category A, EU-STCW, USCG"
            />
          </>
        );

      default:
        return (
          <p>
            Please select your registration type to begin your WSRN onboarding
            journey.
          </p>
        );
    }
  };

  return (
    <div className="registration-guide">
      <h2>WSRN Registration Guide</h2>
      <p>{introMessage[role]}</p>

      <form>{getFormFields()}</form>

      <p
        style={{
          marginTop: "1rem",
          fontStyle: "italic",
          color: "#023e8a"
        }}
      >
        🙌 With WSRN, you are seen, you are respected, and your journey matters.
      </p>
    </div>
  );
}

