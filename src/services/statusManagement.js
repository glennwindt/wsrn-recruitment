export async function updateStatus(wsrnId, newStatus, reason, sourceId) {
  await logStatusChange({ wsrnId, newStatus, reason, sourceId, timestamp: Date.now() });

  if (["Retired", "Resigned", "Fired"].includes(newStatus)) {
    archiveSeafarer(wsrnId);
  }
}

export async function archiveSeafarer(wsrnId) {
  const record = await fetchSeafarer(wsrnId);
  await saveToHistory(record);
  await lockDashboard(wsrnId);
}
