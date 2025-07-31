// src/services/shippingCompanyService.js

import { vessels } from '../data/vessels';

/**
 * Retrieves the shipping company associated with a specific vessel.
 * @param {string} vesselId
 * @returns {Object|null}
 */
export function getShippingCompanyByVesselId(vesselId) {
  const vessel = vessels.find(v => v.id === vesselId);
  return vessel?.shippingCompany || null;
}

/**
 * Checks if the specified agency is actively engaged with the vessel.
 * @param {string} vesselId
 * @param {string} agencyId
 * @returns {{status: string, warning: string|null}}
 */
export function getEngagementStatus(vesselId, agencyId) {
  const engagedAgencies = mockEngagements[vesselId] || [];
  const isEngaged = engagedAgencies.includes(agencyId);
  return {
    status: isEngaged ? 'Active' : 'Inactive',
    warning: isEngaged
      ? null
      : 'Agency not actively linked to this vessel'
  };
}

// Simulated engagement data (temporary; replace with API fetch later)
const mockEngagements = {
  vsl001: ['agency01', 'agency03'],
  vsl002: ['agency02'],
  vsl003: ['agency01']
};

