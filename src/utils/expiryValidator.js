// src/utils/expiryValidator.js
import dayjs from 'dayjs';

/**
 * Checks if a date has passed compared to today.
 * @param {string} expiryDate - ISO string
 * @returns {boolean}
 */
export const isExpired = (expiryDate) => {
  return dayjs(expiryDate).isBefore(dayjs(), 'day');
};

/**
 * Determines if a document will expire dangerously close to a future boarding date.
 * Based on repeating on/off rotation cycles.
 *
 * @param {string} expiryDate - Document expiry ISO date
 * @param {string} contractStartDate - Seafarer's contract start ISO date
 * @param {{ on: number, off: number }} rotation - Months on/off
 * @param {number} warnBeforeDays - Days before boarding that triggers alert
 * @returns {boolean}
 */
export const willExpireBeforeBoarding = (
  expiryDate,
  contractStartDate,
  rotation = { on: 3, off: 3 },
  warnBeforeDays = 60
) => {
  const expiry = dayjs(expiryDate);
  const start = dayjs(contractStartDate);
  const cycleLength = rotation.on + rotation.off;

  for (let i = 0; i < 6; i++) {
    const nextBoarding = start.add(i * cycleLength, 'month');
    const warningWindowStart = nextBoarding.subtract(warnBeforeDays, 'day');

    if (expiry.isBefore(nextBoarding) && expiry.isAfter(warningWindowStart)) {
      return true; // Cutting it too close for safe onboarding
    }
  }

  return false;
};

/**
 * Optional: Role-based custom buffer (for future expansion)
 */
const roleBasedThresholds = {
  passport: 60,
  medical: 90,
  vaccination: 180,
};

export const getThresholdForType = (type = '') => {
  return roleBasedThresholds[type.toLowerCase()] || 60;
};

