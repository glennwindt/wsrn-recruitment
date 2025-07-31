import React, { useState } from "react";

const GlobalBlessingsBoard = ({ initialEntries = [] }) => {
  const [entries, setEntries] = useState(initialEntries);
  const [newEntry, setNewEntry] = useState("");

  const handleAdd = () => {
    if (!newEntry.trim()) return;
    const entry = {
      content: newEntry,
      date: new Date().toISOString(),
      source: "Internal Dashboard", // Optional: could be agency, fleet, etc.
    };
    setEntries([entry, ...entries]);
    setNewEntry("");
  };

  return (
    <div className="global-blessings-board">
      <h2>🌐 Global Blessings Board</h2>
      <p>
        A shared space for gratitude, answered prayers, and uplifting moments across WSRN. Let’s celebrate the light we bring to one another.
      </p>

      <textarea
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Share a blessing, reflection, or answered prayer..."
        rows={3}
      />
      <button onClick={handleAdd}>Add Blessing</button>

      <ul className="blessings-feed">
        {entries.map((entry, idx) => (
          <li key={idx}>
            <span className="entry-date">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <p>{entry.content}</p>
            {entry.source && <small>Source: {entry.source}</small>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalBlessingsBoard;

