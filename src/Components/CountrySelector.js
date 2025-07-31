import React, { useState } from "react";
import PropTypes from "prop-types";

// Country list (trimmed for brevity)
const allCountries = [
  "Portugal", "Netherlands", "USA", "UK", "Germany", "France", "Spain", "Brazil", "Philippines", "India", "Japan", "South Korea", "Australia", "Canada", "Mexico", "Nigeria", "Ghana", "Lebanon", "Saudi Arabia", "UAE", "Russia", "Sweden", "Italy", "South Africa", "Vietnam"
  // ... add the rest as needed
];

// Dialing codes
const countryCodeMap = {
  Portugal: "+351",
  Netherlands: "+31",
  USA: "+1",
  UK: "+44",
  Germany: "+49",
  France: "+33",
  Spain: "+34",
  Brazil: "+55",
  Philippines: "+63",
  India: "+91",
  Japan: "+81",
  "South Korea": "+82",
  Australia: "+61",
  Canada: "+1",
  Mexico: "+52",
  Nigeria: "+234",
  Ghana: "+233",
  Lebanon: "+961",
  "Saudi Arabia": "+966",
  UAE: "+971",
  Russia: "+7",
  Sweden: "+46",
  Italy: "+39",
  "South Africa": "+27",
  Vietnam: "+84"
};

// Flag emoji generator (based on country name)
const getFlagEmoji = (country) => {
  const isoMap = {
    Portugal: "PT", Netherlands: "NL", USA: "US", UK: "GB", Germany: "DE", France: "FR", Spain: "ES",
    Brazil: "BR", Philippines: "PH", India: "IN", Japan: "JP", "South Korea": "KR", Australia: "AU",
    Canada: "CA", Mexico: "MX", Nigeria: "NG", Ghana: "GH", Lebanon: "LB", "Saudi Arabia": "SA",
    UAE: "AE", Russia: "RU", Sweden: "SE", Italy: "IT", "South Africa": "ZA", Vietnam: "VN"
  };

  const code = isoMap[country];
  return code
    ? String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt()))
    : "🏳️";
};

export default function CountrySelector({ selectedCountry, onCountrySelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = allCountries.filter((country) =>
    country.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const handleSelect = (country) => {
    onCountrySelect?.(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  const dialingCode = countryCodeMap[selectedCountry] || "N/A";
  const flag = getFlagEmoji(selectedCountry);

  return (
    <div className="country-selector" style={{ position: "relative", marginBottom: "1rem" }}>
      <label htmlFor="selected-country" className="block mb-1 font-medium text-white">
        Select Country
      </label>
      <input
        id="selected-country"
        type="text"
        value={selectedCountry || ""}
        readOnly
        placeholder="Select a country"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full p-2 bg-gray-700 rounded cursor-pointer text-white border border-gray-600"
      />
      {selectedCountry && (
        <div className="mt-2 text-white text-sm">
          {flag} {selectedCountry} — Dialing Code: <strong>{dialingCode}</strong>
        </div>
      )}
      {isOpen && (
        <div
          className="dropdown"
          style={{
            position: "absolute",
            zIndex: 10,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            background: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
            marginTop: "0.5rem"
          }}
        >
          <input
            type="text"
            id="country-search"
            placeholder="Search country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-gray-700 border-b border-gray-600 text-white focus:outline-none"
            autoFocus
          />
          <ul className="mt-2">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li
                  key={country}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                  onClick={() => handleSelect(country)}
                >
                  {getFlagEmoji(country)} {country}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No country found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

CountrySelector.propTypes = {
  selectedCountry: PropTypes.string,
  onCountrySelect: PropTypes.func
};

