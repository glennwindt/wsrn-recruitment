// Firebase v9 Modular SDK
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { 
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  setDoc
} from "firebase/firestore";

// =====================
// CONFIG (Replace with YOUR actual values from Firebase Console)
// =====================
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "wsrn-e96cc.firebaseapp.com", // Confirm this matches your WSRN project
  projectId: "wsrn-e96cc",
  storageBucket: "wsrn-e96cc.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Force session-based persistence (no accidental long-term logins)
setPersistence(auth, browserSessionPersistence);

// =====================
// ENHANCED AUTH STATE MANAGEMENT
// =====================
onAuthStateChanged(auth, async (user) => {
  try {
    if (user) {
      const role = await determineUserRole(user.email);
      
      const userData = {
        uid: user.uid,
        email: user.email,
        role: role,
        lastLogin: new Date().toISOString(),
        ip: await fetchIP() // Optional: Track login location
      };

      localStorage.setItem("wsrn_user", JSON.stringify(userData));
      await registerFCMToken(user.uid);
    } else {
      localStorage.removeItem("wsrn_user");
    }
  } catch (error) {
    console.error("Auth state error:", error);
    // Fallback for critical error
    if (!localStorage.getItem("wsrn_user_fallback")) {
      localStorage.setItem("wsrn_user_fallback", "guest");
    }
  }
});

// =====================
// CORE FUNCTIONS (All original features + enhancements)
// =====================

/**
 * Advanced Role Detection (Matches your fairness vision)
 */
async function determineUserRole(email) {
  if (!email) return "guest";

  // Role hierarchy (WSRN has ultimate control)
  const roleRules = {
    "admin": ["@wsrn.com", "@wsrn-admin.com"],
    "agency": [".agency", "@partner-agency.com"],
    "shipping_company": [".shipping", "@vessel-owner.com"],
    "seafarer": [".seafarer", "@crew-member.org"]
  };

  for (const [role, domains] of Object.entries(roleRules)) {
    if (domains.some(domain => email.includes(domain))) {
      return role;
    }
  }

  return "guest";
}

/**
 * FCM Token Management (Improved security)
 */
async function registerFCMToken(uid) {
  try {
    // Generate token (replace with actual FCM registration in production)
    const fcmToken = btoa(`${uid}:${Date.now()}:MOBILE`);

    // Firestore transaction
    const tokensRef = collection(db, "fcm_tokens");
    const q = query(tokensRef, where("uid", "==", uid));
    const snapshot = await getDocs(q);

    // Delete old tokens
    const promises = snapshot.docs.map(async (doc) => {
      if (doc.data().token !== fcmToken) {
        await deleteDoc(doc.ref);
      }
    });

    await Promise.all(promises);

    // Add new token
    await setDoc(doc(tokensRef, uid), {
      uid,
      token: fcmToken,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("FCM Error:", error);
    // Implement fallback notification system here
  }
}

// =====================
// EXPORTS (All original functionality preserved)
// =====================
export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  signOut,
  determineUserRole // Optional: Export if used elsewhere
};