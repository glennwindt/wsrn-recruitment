import React, { useState } from "react";

const FundingTogglePanel = ({ programs = [] }) => {
  const [toggles, setToggles] = useState(
    programs.reduce((map, prog) => ({ ...map, [prog.id]: prog.funded }), {})
  );

  const handleToggle = (id) => {
    setToggles({ ...toggles, [id]: !toggles[id] });
  };

  return (
    <div className="funding-toggle-panel">
      <h2>💰 Funding Toggle Panel</h2>
      <p>Switch funding support for each spiritual training initiative on or off.</p>

      <ul className="toggle-list">
        {programs.map((prog) => (
          <li key={prog.id}>
            <strong>{prog.name}</strong>
            <button
              className={toggles[prog.id] ? "enabled" : "disabled"}
              onClick={() => handleToggle(prog.id)}
            >
              {toggles[prog.id] ? "Funded ✅" : "Suspended ⛔"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FundingTogglePanel;

