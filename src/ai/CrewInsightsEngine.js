// src/ai/CrewInsightsEngine.js

export function evaluateCrewMember(crewData) {
  const insights = {};

  // Rehire potential
  insights.rehirePotential = crewData.terminationReason === 'voluntary' && crewData.performanceScore > 75;

  // Performance flags
  insights.performanceFlag = crewData.performanceScore < 50 || crewData.missedDeadlines > 3;

  // Risk scoring
  insights.riskScore = Math.min(100, 
    (crewData.missedDeadlines * 10) + 
    (crewData.disciplinaryActions * 20) - 
    (crewData.performanceScore / 2)
  );

  // Smart recommendations
  insights.recommendation = insights.riskScore > 70 
    ? 'Review contract and consider performance improvement plan.'
    : 'Crew member is stable. No action needed.';

  return insights;
}

