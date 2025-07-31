import React, { useState } from "react";

const ComplianceCenter = () => {
  const [checklist, setChecklist] = useState([
    { label: "Crew Certifications Verified", done: false },
    { label: "Contract Templates Approved", done: false },
    { label: "Safety Protocols Uploaded", done: false },
    { label: "CTT Dispatch Logs Audited", done: false },
    { label: "Ethics Agreement Distributed", done: false },
  ]);

  const toggleItem = (index) => {
    const updated = [...checklist];
    updated[index].done = !updated[index].done;
    setChecklist(updated);
  };

  return (
    <div className="compliance-center">
      <h2>🧾 Agency Compliance Center</h2>
      <p>Track and manage your regulatory responsibilities. Stay audit-ready and aligned with WSRN standards.</p>

      <ul className="compliance-checklist">
        {checklist.map((item, idx) => (
          <li key={idx}>
            <label>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(idx)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplianceCenter;

