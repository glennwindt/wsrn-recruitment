export function unlockDashboard(wsrnId) {
  // Redirect or unlock dashboard features for this candidate
  window.location.href = `/dashboard/${wsrnId}`;
}

