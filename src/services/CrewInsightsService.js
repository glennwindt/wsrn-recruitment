// Simulated backend service (can be replaced with real API calls)

const insightsDB = {}; // In-memory store for now

export function saveCrewInsights(crewId, insights) {
  insightsDB[crewId] = {
    ...insights,
    timestamp: new Date().toISOString()
  };
  console.log(`Insights saved for crew ${crewId}`, insightsDB[crewId]);
}

export function getCrewInsights(crewId) {
  return insightsDB[crewId] || null;
}

