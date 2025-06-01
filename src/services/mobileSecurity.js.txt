// src/services/mobileSecurity.js

import { auth } from "./firebase";
import { getUserRole } from "./roles";

let currentUser = null;

auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    localStorage.setItem("wsrn_mobile_user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      role: getUserRole(user.email),
      lastLogin: new Date().toISOString()
    }));
  } else {
    localStorage.removeItem("wsrn_mobile_user");
  }
});

export function checkAppAccess() {
  const userData = JSON.parse(localStorage.getItem("wsrn_mobile_user"));

  if (!userData) {
    console.warn("🚫 No user data found. Please log in.");
    return false;
  }

  const validRoles = ["admin", "agency", "shipping_company", "seafarer"];
  if (!validRoles.includes(userData.role)) {
    console.warn("🚫 Unauthorized role detected:", userData.role);
    return false;
  }

  const lastLogin = new Date(userData.lastLogin);
  const now = new Date();
  const daysSinceLogin = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));

  if (daysSinceLogin > 7) {
    console.warn("⏳ Session expired. Re-authentication required.");
    return false;
  }

  return true;
}