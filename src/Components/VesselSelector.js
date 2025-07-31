// src/components/VesselSelector.js

import React from 'react';
import { vessels } from '../data/vessels';

const VesselSelector = ({ onSelect }) => {
  return (
    <div className="vessel-selector">
      <label>Select Vessel</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Choose a vessel --</option>
        {vessels.map(vessel => (
          <option key={vessel.id} value={vessel.id}>
            {vessel.name} — {vessel.type} ({vessel.flag})
          </option>
        ))}
      </select>
    </div>
  );
};

export default VesselSelector;

