// src/components/seafarer-application-form/LocationPreferences.js

import React, { useState } from 'react';

const LocationPreferences = () => {
  const [region, setRegion] = useState('');
  const [preferences, setPreferences] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected region:", region);
    console.log("Preferences:", preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Preferred Work Locations</h2>
      
      <select 
        value={region} 
        onChange={(e) => setRegion(e.target.value)}
        className="w-full border p-2 mb-4"
        required
      >
        <option value="">Select Region</option>
        <option value="eu_inland">EU Inland (Netherlands, Belgium)</option>
        <option value="offshore">Offshore (North Sea, Gulf of Mexico)</option>
        <option value="asian_shipping">Asian Shipping Lanes</option>
        <option value="global">Global (no preference)</option>
      </select>

      <div className="mb-4">
        <label><input type="checkbox" /> Oil/Gas Tanker</label><br />
        <label><input type="checkbox" /> Container Ship</label><br />
        <label><input type="checkbox" /> Cruise Ship</label><br />
      </div>

      <button 
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Preferences
      </button>
    </form>
  );
};

export default LocationPreferences;