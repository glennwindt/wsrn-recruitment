import React, { useState } from "react";

const FleetPrayerCircle = ({ initialEntries = [] }) => {
  const [entries, setEntries] = useState(initialEntries);
  const [newPrayer, setNewPrayer] = useState("");

  const handleAdd = () => {
    if (!newPrayer.trim()) return;
    const entry = {
      prayer: newPrayer,
      date: new Date().toISOString(),
      vessel: "Unassigned", // Optional: can be linked to vessel selector
    };
    setEntries([entry, ...entries]);
    setNewPrayer("");
  };

  return (
    <div className="fleet-prayer-circle">
      <h2>🙏 Fleet Prayer Circle</h2>
      <p>
        Share intercessory prayers, blessings, and spiritual reflections for vessels and crew. This circle strengthens unity and spiritual care across the fleet.
      </p>

      <textarea
        value={newPrayer}
        onChange={(e) => setNewPrayer(e.target.value)}
        placeholder="Write a prayer or blessing..."
        rows={3}
      />
      <button onClick={handleAdd}>Add Prayer</button>

      <ul className="prayer-entries">
        {entries.map((entry, idx) => (
          <li key={idx}>
            <span className="entry-date">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <p>{entry.prayer}</p>
            {entry.vessel && <small>Vessel: {entry.vessel}</small>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FleetPrayerCircle;

