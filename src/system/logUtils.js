// src/system/logUtils.js

/**
 * Converts Firestore timestamp to local date string
 * @param {object} timestamp - Firestore timestamp object
 * @returns {string}
 */
export function formatTimestamp(timestamp) {
  if (!timestamp?.toDate) return "Unknown time";
  return timestamp.toDate().toLocaleString();
}

/**
 * Adds a visual emoji tag based on severity
 * @param {"info"|"warning"|"error"} severity
 * @returns {string}
 */
export function severityTag(severity) {
  switch (severity) {
    case "info": return "ℹ️ Info";
    case "warning": return "⚠️ Warning";
    case "error": return "❌ Error";
    default: return "🔍 Unknown";
  }
}

/**
 * Highlights stale heartbeats
 * @param {Date} lastSeen
 * @returns {string}
 */
export function heartbeatStatus(lastSeen) {
  if (!lastSeen) return "⚫ Offline";
  const now = Date.now();
  const delta = now - lastSeen.getTime();
  if (delta < 60000) return "🟢 Live";
  if (delta < 300000) return "🟠 Idle";
  return "🔴 Stale";
}

