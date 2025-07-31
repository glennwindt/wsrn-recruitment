import React, { useState } from "react";

const ManualOverridePanel = ({ overrides = [] }) => {
  const [activeOverrides, setActiveOverrides] = useState(
    overrides.reduce((map, item) => ({ ...map, [item.id]: item.enabled }), {})
  );

  const toggleOverride = (id) => {
    setActiveOverrides({ ...activeOverrides, [id]: !activeOverrides[id] });
  };

  return (
    <div className="manual-override-panel">
      <h2>🛑 Manual Override Panel</h2>
      <p>Use this panel to manually override automated system states for critical training or compliance actions.</p>

      <ul className="override-list">
        {overrides.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <button
              className={activeOverrides[item.id] ? "enabled" : "disabled"}
              onClick={() => toggleOverride(item.id)}
            >
              {activeOverrides[item.id] ? "Override Active 🔓" : "System Default 🔒"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManualOverridePanel;

