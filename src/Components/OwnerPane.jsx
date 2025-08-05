import React, { useEffect, useState } from 'react';
import { routeMessage } from '../utils/MessageRouter';

const OwnerPane = ({ incomingMessages }) => {
  const [ownerMessages, setOwnerMessages] = useState([]);

  useEffect(() => {
    const processMessages = async () => {
      const routed = await Promise.all(incomingMessages.map(routeMessage));
      const filtered = routed.filter(msg => msg.pane === 'OwnerPane');
      setOwnerMessages(filtered.map(msg => msg.message));
    };

    if (incomingMessages.length) {
      processMessages();
    }
  }, [incomingMessages]);

  return (
    <div>
      <h2>Owner Messages</h2>
      {ownerMessages.length === 0 ? (
        <p>No messages for owners.</p>
      ) : (
        <ul>
          {ownerMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}</strong>: {msg.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerPane;

