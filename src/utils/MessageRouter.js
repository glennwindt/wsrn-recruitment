import { fetchEmailRegistry } from '../services/emailRegistryService';

export const routeMessage = async (message) => {
  const { senderEmail, content } = message;
  const registry = await fetchEmailRegistry();

  const entry = registry.find(item => item.email === senderEmail && item.isActive);

  if (!entry) {
    console.warn(`Unregistered email: ${senderEmail}`);
    return { pane: 'Unassigned', message };
  }

  return {
    pane: entry.routedTo,
    message: {
      sender: senderEmail,
      role: entry.role,
      domain: entry.domain,
      content,
    },
  };
};

