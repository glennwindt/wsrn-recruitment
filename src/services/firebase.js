// src/services/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc
} from "firebase/firestore";

// ✅ Real Firebase config (make sure this is correct)
const firebaseConfig = {
  apiKey: "AIzaSyABC123...WSRN",
  authDomain: "wsrn-recruitment.firebaseapp.com",
  projectId: "wsrn-recruitment",
  storageBucket: "wsrn-recruitment.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Optional: Session persistence and auth state mirroring
setPersistence(auth, browserSessionPersistence).catch(err =>
  console.error("WSRN Auth Persistence Error:", err)
);

onAuthStateChanged(auth, user => {
  if (user) {
    localStorage.setItem("wsrn_user", JSON.stringify({ uid: user.uid, email: user.email }));
  } else {
    localStorage.removeItem("wsrn_user");
  }
});

// Export services
export {
  auth,
  db,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  collection,
  addDoc,
  doc,
  setDoc
};

