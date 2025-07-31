import React from 'react';

const OutreachModal = ({ selectedCenters, onClose, onSend }) => {
  const defaultSubject = 'Welcome from Global Maritime Registry';
  const defaultTemplate = `Dear [ManagementContact],

We’re reaching out from the Global Maritime Registry to introduce our latest initiative designed to support your center, [CenterName], and your mission at [CompanyName].

We’re impressed by your status as a [Type] center located in [Location], and we’d love to explore collaboration opportunities with your team.

Warm regards,
Registry Coordinator`;

  const [subject, setSubject] = React.useState(defaultSubject);
  const [message, setMessage] = React.useState(defaultTemplate);

  const previewMessages = selectedCenters.map(center => {
    let filled = message
      .replace('[ManagementContact]', center.managementContact)
      .replace('[CenterName]', center.name)
      .replace('[CompanyName]', center.companyName)
      .replace('[Type]', center.type)
      .replace('[Location]', center.location);
    return {
      id: center.id,
      name: center.name,
      preview: filled
    };
  });

  return (
    <div className="modal">
      <h3>Send Outreach</h3>
      <div className="form-group">
        <label>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Message Template</label>
        <textarea
          rows={8}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <small>Use tags like [CompanyName], [ManagementContact], [Location]</small>
      </div>

      <h4>Preview for {selectedCenters.length} center{selectedCenters.length > 1 ? 's' : ''}</h4>
      <ul className="preview-list">
        {previewMessages.map(pm => (
          <li key={pm.id}>
            <strong>{pm.name}:</strong>
            <p>{pm.preview}</p>
          </li>
        ))}
      </ul>

      <div className="modal-actions">
        <button onClick={onClose}>Cancel</button>
        <button onClick={() => onSend(subject, previewMessages)}>Send Emails</button>
      </div>
    </div>
  );
};

export default OutreachModal;

