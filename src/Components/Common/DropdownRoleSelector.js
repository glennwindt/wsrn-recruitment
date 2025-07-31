// src/components/Common/DropdownRoleSelector.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import { cruiseCrewCategories } from "../../utils/cruiseCrewCategories";

const DropdownRoleSelector = ({ onSelect, defaultValue = "" }) => {
  const [selectedRole, setSelectedRole] = useState(defaultValue);

  const handleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    onSelect?.(role);
  };

  return (
    <div className="dropdown-role-selector">
      <label htmlFor="role-dropdown" className="block font-medium text-white mb-1">
        Select Role
      </label>
      <select
        id="role-dropdown"
        value={selectedRole}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
      >
        <option value="">-- Choose a role --</option>
        {Object.entries(cruiseCrewCategories).flatMap(([department, levels]) =>
          Object.entries(levels).map(([hierarchy, roles]) =>
            roles.length > 0 ? (
              <optgroup key={`${department}-${hierarchy}`} label={`${department} → ${hierarchy}`}>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </optgroup>
            ) : []
          )
        )}
      </select>
    </div>
  );
};

DropdownRoleSelector.propTypes = {
  onSelect: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default DropdownRoleSelector;

