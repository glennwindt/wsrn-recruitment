import React, { useState } from "react";
import "./VesselDropdown.css"; // Basic styling here

const vesselCategories = {
  Passenger: [
    "Domestic Cruise Ship",
    "Coastal Passenger Vessel",
    "River Cruise Ship",
    "Inter-Island Ferry",
    "High-Speed Catamaran",
    "Tour Boat"
  ],
  Cargo: [
    "Container Ship",
    "Bulk Carrier",
    "Ro-Ro Vessel",
    "Refrigerated Cargo Ship"
  ],
  Industrial: [
    "Oil Tanker",
    "Gas Carrier",
    "Chemical Tanker",
    "Heavy Lift Ship"
  ],
  Offshore: [
    "Dredger",
    "Jack-Up Rig",
    "Pipe-Laying Vessel",
    "Seismic Survey Ship"
  ],
  Utility: [
    "Tug",
    "Service Boat",
    "Support Craft",
    "Harbor Vessel"
  ],
  Defense: [
    "Naval Ship",
    "Patrol Boat",
    "Submarine Tender"
  ]
};

export default function VesselDropdown() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("");

  return (
    <div className="dropdown-container">
      <label>Vessel Type:</label>
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedSubtype("");
        }}
      >
        <option value="">Select Type</option>
        {Object.keys(vesselCategories).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <label>Subtype:</label>
          <select
            value={selectedSubtype}
            onChange={(e) => setSelectedSubtype(e.target.value)}
          >
            <option value="">Select Subtype</option>
            {vesselCategories[selectedCategory].map((subtype) => (
              <option key={subtype} value={subtype}>
                {subtype}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

