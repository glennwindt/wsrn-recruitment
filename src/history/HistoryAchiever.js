export function archiveSeafarer(wsId) {
  const record = fetchActiveRecord(wsId);
  moveToHistoryDB(record);
  lockDashboard(wsId);
}

function fetchActiveRecord(wsId) {
  // Simulated record retrieval
  return { wsrnId: wsId, name: "Archived Seafarer", status: "Retired" };
}

function moveToHistoryDB(record) {
  console.log("Archived to history:", record);
}

function lockDashboard(wsId) {
  console.log(`Dashboard locked for WSRN ${wsId}`);
}

