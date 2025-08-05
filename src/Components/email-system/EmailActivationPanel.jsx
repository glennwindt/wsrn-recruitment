import React, { useState } from 'react';
import { activateEmail, fetchEmailRegistry } from '../../services/emailRegistryService';

const EmailActivationPanel = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Staff');
  const [domain, setDomain] = useState('wsrn-recruitment.com');

  const handleActivate = () => {
    activateEmail({ email, role, domain });
  };

  return (
    <div className="email-activation-panel">
      <h2>Activate Email</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. cilia@wsrn-recruitment.com" />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option>Staff</option>
        <option>Owner</option>
        <option>HR</option>
        <option>Recruitment</option>
      </select>
      <select value={domain} onChange={e => setDomain(e.target.value)}>
        <option>wsrn-recruitment.com</option>
        <option>wsrn.com</option>
      </select>
      <button onClick={handleActivate}>Activate</button>
    </div>
  );
};

export default EmailActivationPanel;

