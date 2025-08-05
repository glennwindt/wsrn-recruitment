import React, { useEffect, useState } from 'react';
import { routeMessage } from '../utils/MessageRouter';

const StaffPane = ({ incomingMessages, user }) => {
  const [personalMessages, setPersonalMessages] = useState([]);

  useEffect(() => {
    const processMessages = async () => {
      const routed = await Promise.all(incomingMessages.map(routeMessage));
      const filtered = routed.filter(msg => {
        const isStaffPane = msg.pane === 'StaffPane';
        const isPersonal = msg.message.sender === user.email;
        return isStaffPane && isPersonal;
      });

      setPersonalMessages(filtered.map(msg => msg.message));
    };

    if (incomingMessages.length) {
      processMessages();
    }
  }, [incomingMessages, user]);

  return (
    <div>
      {personalMessages.length === 0 ? (
        <p>No personal messages.</p>
      ) : (
        <ul>
          {personalMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}</strong>: {msg.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StaffPane;

