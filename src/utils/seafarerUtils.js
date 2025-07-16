export async function fetchCrewProfile(uid) {
  // Temporary mock data — you can later replace with Firebase logic
  return {
    firstName: "Glenn",
    nationality: "Spanish",
    experienceLevel: "Senior",
    certificates: ["STCW", "ENG1", "Safety Training"],
    boardingPreferences: ["Cargo Vessel", "Europe", "3-month rotation"]
  };
}

export function checkCertificateExpiry(certificates = []) {
  const alerts = [];

  if (!certificates.includes("ENG1")) {
    alerts.push("🚨 ENG1 certificate missing or expired.");
  }

  if (!certificates.includes("STCW")) {
    alerts.push("⚠️ STCW training not found or expired.");
  }

  return alerts;
}

