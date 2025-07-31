// src/training/WSRN.fundingLogic.js
export function calculateFunding(seafarerProfile) {
  if (seafarerProfile.experienceLevel === 'entry') {
    return 'Eligible for Starter Subsidy';
  } else if (seafarerProfile.hasMilitaryBackground) {
    return 'Eligible for Veteran Grant';
  }
  return 'Standard Funding Applied';
}

