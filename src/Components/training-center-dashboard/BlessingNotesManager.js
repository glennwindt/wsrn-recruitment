import React, { useState } from "react";

const BlessingNotesManager = ({ initialNotes = [] }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const entry = {
      content: newNote,
      author: "Trainer", // Optional: can be dynamic
      date: new Date().toISOString(),
    };
    setNotes([entry, ...notes]);
    setNewNote("");
  };

  return (
    <div className="blessing-notes-manager">
      <h2>📖 Blessing Notes Manager</h2>
      <p>
        Add spiritual reflections, encouragements, or prayer notes shared during training. These messages uplift and inspire trainees on their journey.
      </p>

      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a blessing note..."
        rows={3}
      />
      <button onClick={handleAddNote}>Add Note</button>

      <ul className="notes-list">
        {notes.map((entry, idx) => (
          <li key={idx}>
            <span className="note-date">{new Date(entry.date).toLocaleDateString()}</span>
            <p>{entry.content}</p>
            {entry.author && <small>From: {entry.author}</small>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlessingNotesManager;

