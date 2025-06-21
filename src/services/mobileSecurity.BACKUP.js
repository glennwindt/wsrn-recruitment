import { auth } from "./firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Add these
import { getUserRole } from "./roles";

// =====================
// ENHANCEMENTS ADDED:
// 1. Session timeout (30 mins) instead of 7 days
// 2. IP tracking (optional)
// 3. Force logout capability
// 4. Role hierarchy for WSRN control
// 5. FCM token management
// =====================

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes (was 7 days)
const ROLE_HIERARCHY = {
  admin: 4,          // WSRN full control
  agency: 3,         // Agencies
  shipping_company: 2, // Companies
  seafarer: 1,       // Crew
  guest: 0
};

let currentUser = null;
const messaging = getMessaging(); // Initialize messaging

// Enhanced auth state handler with FCM
auth.onAuthStateChanged(async (user) => {
  try {
    if (user) {
      currentUser = user;
      const userData = {
        uid: user.uid,
        email: user.email,
        role: getUserRole(user.email),
        lastLogin: new Date().toISOString(),
        ip: await fetchIP(), // Optional: Add IP tracking
        fcmToken: await getFCMToken() // New: Store FCM token
      };
      localStorage.setItem("wsrn_mobile_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("wsrn_mobile_user");
    }
  } catch (error) {
    console.error("Auth state error:", error);
    localStorage.removeItem("wsrn_mobile_user");
  }
});

// New: FCM Token Handler
export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY" // From Firebase Console > Project Settings > Cloud Messaging
    });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("FCM Token Error:", error);
    return null;
  }
};

// New: Foreground message handler
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  // Add your notification display logic here
});

// =====================
// ORIGINAL FUNCTIONS (Preserved with FCM awareness)
// =====================
export function checkAppAccess() {
  const userData = JSON.parse(localStorage.getItem("wsrn_mobile_user"));

  if (!userData) {
    console.warn("🚫 No user data found. Please log in.");
    return false;
  }

  // Keep original role check
  const validRoles = Object.keys(ROLE_HIERARCHY);
  if (!validRoles.includes(userData.role)) {
    console.warn("🚫 Unauthorized role detected:", userData.role);
    return false;
  }

  // Updated session check (30 mins instead of 7 days)
  const lastActive = new Date(userData.lastLogin).getTime();
  if (Date.now() - lastActive > SESSION_TIMEOUT) {
    console.warn("⏳ Session expired. Re-authentication required.");
    forceLogout();
    return false;
  }

  return true;
}

// =====================
// EXISTING SECURITY FEATURES (Preserved)
// =====================
export function forceLogout() {
  localStorage.removeItem("wsrn_mobile_user");
  if (currentUser) auth.signOut();
}

export function hasMinimumRole(requiredRole) {
  const userData = JSON.parse(localStorage.getItem("wsrn_mobile_user"));
  if (!userData) return false;
  
  return ROLE_HIERARCHY[userData.role] >= ROLE_HIERARCHY[requiredRole];
}

// Helper for IP tracking (optional)
async function fetchIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return "unknown";
  }
}