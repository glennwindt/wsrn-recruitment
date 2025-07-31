// VoiceControlPanel.js – Controls for audio-based commands and feedback
import React from 'react';

export default function VoiceControlPanel({ isActive }) {
  // Future: Integrate speech-to-text and command triggers
  return (
    <div>
      <h2>Voice Control Panel</h2>
      {isActive ? <p>System Activated</p> : <p>Awaiting Activation</p>}
    </div>
  );
}

