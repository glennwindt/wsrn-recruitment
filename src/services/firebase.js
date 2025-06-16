// src/services/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "wsrn-recruitment.firebaseapp.com",
  projectId: "wsrn-recruitment",
  storageBucket: "wsrn-recruitment.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = {
      uid: user.uid,
      email: user.email,
      role: getUserRole(user.email),
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem("wsrn_user", JSON.stringify(userData));

    // Simulated FCM token registration
    const mockFcmToken = btoa(`${user.uid}:${Date.now()}:MOBILE`);
    trackDeviceToken(user.uid, mockFcmToken);
  } else {
    localStorage.removeItem("wsrn_user");
  }
});

function getUserRole(email) {
  if (!email) return "guest";
  if (email.endsWith("@wsrn.com")) return "admin";
  if (email.includes(".agency")) return "agency";
  if (email.includes(".shipping")) return "shipping_company";
  if (email.includes(".seafarer")) return "seafarer";
  return "guest";
}

async function trackDeviceToken(uid, fcmToken) {
  try {
    const q = query(collection(db, "fcm_tokens"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    snapshot.forEach(async (tokenDoc) => {
      if (tokenDoc.data().token !== fcmToken) {
        await deleteDoc(doc(db, "fcm_tokens", tokenDoc.id));
      }
    });
  } catch (error) {
    console.error("Error tracking device token:", error);
  }
}

export { auth, db, signInWithEmailAndPassword, signOut };