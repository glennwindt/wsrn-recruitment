import React, { useState } from "react";

const BlessingsLog = ({ initialEntries = [] }) => {
  const [entries, setEntries] = useState(initialEntries);
  const [newBlessing, setNewBlessing] = useState("");

  const handleAdd = () => {
    if (!newBlessing.trim()) return;
    const newEntry = {
      content: newBlessing,
      date: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setNewBlessing("");
  };

  return (
    <div className="wsrn-blessings-log">
      <h2>🌤️ Blessings Log</h2>
      <p>
        A place to remember moments of light: answered prayers, kindness received, personal victories. Add yours below.
      </p>

      <textarea
        value={newBlessing}
        onChange={(e) => setNewBlessing(e.target.value)}
        placeholder="Write your blessing..."
        rows={3}
      />
      <button onClick={handleAdd}>Add Blessing</button>

      <ul className="blessings-list">
        {entries.map((entry, idx) => (
          <li key={idx}>
            <span className="blessing-date">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlessingsLog;

