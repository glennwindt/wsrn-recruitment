// src/system/statusSchema.js

export const expectedComponents = [
  "Dashboard",
  "AdminHome",
  "CandidateModal",
  "LiveInterview",
  "SystemDiagnostics"
];

export const heartbeatThresholds = {
  live: 60000,       // < 1 min = 🟢 Live
  idle: 300000,      // < 5 min = 🟠 Idle
  stale: 300000      // > 5 min = 🔴 Stale
};

export function getStatusLabel(deltaMs) {
  if (deltaMs < heartbeatThresholds.live) return "🟢 Live";
  if (deltaMs < heartbeatThresholds.idle) return "🟠 Idle";
  return "🔴 Stale";
}

export function isComponentMissing(lastSeenMap) {
  return expectedComponents.filter(comp => !(comp in lastSeenMap));
}

