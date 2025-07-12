// src/services/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// your actual Firebase config here
const firebaseConfig = {
  apiKey:     "AIzaSyABC123...WSRN",
  authDomain: "wsrn-recruitment.firebaseapp.com",
  projectId:  "wsrn-recruitment",
  // …other keys…
};

// 1) Initialize App
const app = initializeApp(firebaseConfig);

// 2) Named export: auth instance
export const auth = getAuth(app);

// 3) Session persistence
setPersistence(auth, browserSessionPersistence).catch(err =>
  console.error("WSRN Auth Persistence Error:", err)
);

// 4) Named export: firestore
export const db = getFirestore(app);

// 5) Mirror auth state to localStorage (optional)
onAuthStateChanged(auth, user => {
  if (user) {
    localStorage.setItem(
      "wsrn_user",
      JSON.stringify({ uid: user.uid, email: user.email })
    );
  } else {
    localStorage.removeItem("wsrn_user");
  }
});

// 6) Named exports for your auth helpers
export { signInWithEmailAndPassword, signOut };

// 7) Default export for workaround
export default { auth, db, signInWithEmailAndPassword, signOut };