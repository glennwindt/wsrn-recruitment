import React, { useState } from "react";

const PrayerfulPlacementBoard = ({ initialEntries = [] }) => {
  const [entries, setEntries] = useState(initialEntries);
  const [newPrayer, setNewPrayer] = useState("");

  const handleAdd = () => {
    if (!newPrayer.trim()) return;
    const newEntry = {
      prayer: newPrayer,
      date: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setNewPrayer("");
  };

  return (
    <div className="prayerful-placement-board">
      <h2>🛐 Prayerful Placement Board</h2>
      <p>
        Document the prayers, discernment, and spiritual reflections that guided crew assignments. This board honors the unseen hand behind each placement.
      </p>

      <textarea
        value={newPrayer}
        onChange={(e) => setNewPrayer(e.target.value)}
        placeholder="Write your prayer or reflection..."
        rows={3}
      />
      <button onClick={handleAdd}>Add Entry</button>

      <ul className="prayer-entries">
        {entries.map((entry, idx) => (
          <li key={idx}>
            <span className="entry-date">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <p>{entry.prayer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrayerfulPlacementBoard;

