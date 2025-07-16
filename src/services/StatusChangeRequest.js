export function submitStatusChange(wsId, newStatus, reason, entityId) {
  const payload = {
    wsId,
    newStatus,
    reason,
    triggeredBy: entityId,
    timestamp: Date.now()
  };
  console.log("Status Change Submitted:", payload);
  // Replace with API call or database update logic
}

