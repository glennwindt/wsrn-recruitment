import React, { useEffect, useState } from 'react';
import { routeMessage } from '../utils/MessageRouter';
import { generateSickLeaveMemo } from '../utils/MemoGenerator';
import { sendEmail } from '../utils/EmailComposer';

const GENERAL_INBOXES = [
  'info@wsrn-recruitment.com',
  'team@wsrn-recruitment.com',
  'support@wsrn-recruitment.com',
];

const GeneralStaffPane = ({ incomingMessages, staffRegistry, currentStaff }) => {
  const [generalMessages, setGeneralMessages] = useState([]);
  const [isOnSickLeave, setIsOnSickLeave] = useState(false);

  useEffect(() => {
    const processMessages = async () => {
      const routed = await Promise.all(incomingMessages.map(routeMessage));
      const filtered = routed.filter(msg => {
        const isStaffPane = msg.pane === 'StaffPane';
        const isGeneralInbox = GENERAL_INBOXES.includes(msg.message.sender);
        return isStaffPane && isGeneralInbox;
      });

      setGeneralMessages(filtered.map(msg => msg.message));
    };

    if (incomingMessages.length) {
      processMessages();
    }
  }, [incomingMessages]);

  const handleSickLeave = () => {
    setIsOnSickLeave(true);

    const memo = generateSickLeaveMemo(currentStaff, staffRegistry);
    sendEmail({
      to: 'team@wsrn-recruitment.com',
      subject: 'Sick Leave Notification',
      body: memo,
    });
  };

  return (
    <div className="staff-pane">
      <h3>{currentStaff?.name || 'Staff Member'}</h3>
      <p>Status: {isOnSickLeave ? 'On Sick Leave' : 'Active'}</p>
      <button onClick={handleSickLeave}>Mark as Sick</button>

      <hr />

      <h4>General Staff Messages</h4>
      {generalMessages.length === 0 ? (
        <p>No general staff messages.</p>
      ) : (
        <ul>
          {generalMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}</strong>: {msg.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GeneralStaffPane;

