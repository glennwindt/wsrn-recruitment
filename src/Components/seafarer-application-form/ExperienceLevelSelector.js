// src/components/seafarer-application-form/ExperienceLevelSelector.js

import React, { useState } from 'react';

const ExperienceLevelSelector = () => {
  const [experienceLevel, setExperienceLevel] = useState('');
  
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Experience Level</h2>

      <select
        name="experienceLevel"
        value={experienceLevel}
        onChange={(e) => setExperienceLevel(e.target.value)}
        className="w-full border p-2 mb-4"
        required
      >
        <option value="">Select Experience Level</option>
        <option value="Deck Officer">Deck Officer</option>
        <option value="Engineer">Engineer</option>
        <option value="Crew">Crew</option>
        <option value="Trainee">Trainee</option>
      </select>

      {/* Conditional fields based on experience */}
      {experienceLevel && (
        <div className="text-sm text-gray-600">
          Selected Role: <strong>{experienceLevel}</strong>
        </div>
      )}
    </div>
  );
};

export default ExperienceLevelSelector;