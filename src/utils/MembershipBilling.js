// Central billing logic for WSRN system

/**
 * Calculate membership tier for Shipping Companies
 * Based on number of active vessels
 */
export function getShippingMembershipTier(vesselCount) {
  if (vesselCount <= 5) return "Tier 1";
  if (vesselCount <= 10) return "Tier 2";
  return "Tier 3 – Unlimited Access";
}

/**
 * Calculate membership tier for Agencies
 * Based on number of active seafarer placements
 */
export function getAgencyMembershipTier(placements) {
  if (placements <= 25) return "Basic Plan";
  if (placements <= 50) return "Pro Plan";
  return "Enterprise – Unlimited Access";
}

/**
 * Determine commission rate to apply
 * Compares contract date vs. new commission effective date
 */
export function getActiveCommissionRate(contractDate, effectiveDate, oldRate, newRate) {
  const contract = new Date(contractDate);
  const effective = new Date(effectiveDate);
  return contract < effective ? oldRate : newRate;
}

/**
 * Trigger notification logic if commission change is approaching
 */
export function shouldTriggerCommissionNotice(effectiveDate, noticePeriodDays = 14) {
  const today = new Date();
  const effective = new Date(effectiveDate);
  const diffInDays = (effective - today) / (1000 * 60 * 60 * 24);
  return diffInDays <= noticePeriodDays;
}

/**
 * Generate billing summary object
 * Can be reused for display or invoice preview
 */
export function getBillingSummary({ model, vesselCount, placements, contractDate, effectiveDate, oldRate, newRate }) {
  if (model === "membership") {
    return {
      model,
      shippingTier: getShippingMembershipTier(vesselCount),
      agencyTier: getAgencyMembershipTier(placements)
    };
  }

  return {
    model,
    commissionRate: getActiveCommissionRate(contractDate, effectiveDate, oldRate, newRate),
    noticeRequired: shouldTriggerCommissionNotice(effectiveDate)
  };
}

