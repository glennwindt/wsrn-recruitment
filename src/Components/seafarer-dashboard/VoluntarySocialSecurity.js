// src/components/SeafarerDashboard/VoluntarySocialSecurity.js

import React, { useState } from 'react';

const VoluntarySocialSecurity = () => {
  const [optIn, setOptIn] = useState(false);

  const handleToggle = () => {
    if (!optIn) {
      if (window.confirm("Are you sure you want to opt into voluntary social security contributions?")) {
        setOptIn(true);
      }
    } else {
      if (window.confirm("Are you sure you want to opt out of voluntary social security contributions?")) {
        setOptIn(false);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Voluntary Social Security Contributions</h2>
      
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={optIn}
            onChange={handleToggle}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>I wish to opt into voluntary social security contributions</span>
        </label>
      </div>

      <div className="text-sm text-gray-600">
        By opting in, you will contribute to Portuguese pension fund and healthcare programs even after leaving WSRN.
      </div>
    </div>
  );
};

export default VoluntarySocialSecurity;