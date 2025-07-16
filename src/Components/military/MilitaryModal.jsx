import React from 'react';
import { showPopup } from '../../components/ConfirmActionModal';

export function MilitaryCheckbox({ onConfirm }) {
  const triggerWarning = () => {
    showPopup({
      title: "⚠️ Military Boarding Authorization Required",
      message: "Unauthorized access prohibited. Upload legal documents only if officially authorized. Continue?",
      onConfirm: onConfirm,
      onCancel: () => document.getElementById('militaryCheckbox').checked = false,
    });
  };

  return (
    <label>
      <input type="checkbox" id="militaryCheckbox" onClick={triggerWarning} />
      Request Military Review
    </label>
  );
}

