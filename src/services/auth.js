// src/auth.js
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as fbUpdateProfile,
  updateEmail as fbUpdateEmail,
  updatePassword as fbUpdatePassword,
  onAuthStateChanged
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// —————— Initialize Firebase ——————
const firebaseConfig = {
  apiKey:             "AIzaSyABC123...WSRN",
  authDomain:         "wsrn-recruitment.firebaseapp.com",
  projectId:          "wsrn-recruitment",
  storageBucket:      "wsrn-recruitment.appspot.com",
  messagingSenderId:  "123456789-WSRN",
  appId:              "1:123456789:web:wsrn123abc456"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// —————— Role Logic & Error Mapping ——————
const determineWSRNRole = (email) => {
  if (!email)                return "guest";
  if (email.endsWith("@wsrn.com"))    return "admin";
  if (email.includes("@agency."))     return "agency";
  if (email.includes("@shipping."))   return "shipping";
  return "seafarer";
};

const WSRNErrorMessages = {
  "auth/invalid-email":      "Please enter a valid WSRN email",
  "auth/user-disabled":      "Your WSRN account is disabled",
  "auth/user-not-found":     "No WSRN account found with this email",
  "auth/wrong-password":     "Incorrect WSRN password",
  "auth/email-already-in-use":"This WSRN email is already registered",
  "auth/weak-password":      "Password should be at least 6 characters"
};

const getWSRNErrorMessage = (code) =>
  WSRNErrorMessages[code] || "WSRN authentication failed. Please try again.";

// —————— Exported Auth Functions ——————
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      user,
      role: determineWSRNRole(user.email)
    };
  } catch (err) {
    throw new Error(getWSRNErrorMessage(err.code));
  }
};

export const register = async (email, password, displayName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await fbUpdateProfile(user, { displayName });
    }
    return {
      user,
      role: determineWSRNRole(user.email)
    };
  } catch (err) {
    throw new Error(getWSRNErrorMessage(err.code));
  }
};

export const logout = () => signOut(auth);

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (err) {
    throw new Error(getWSRNErrorMessage(err.code));
  }
};

export const updateUserProfile = (data) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");
  return fbUpdateProfile(user, data);
};

export const updateUserEmail = (newEmail) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");
  return fbUpdateEmail(user, newEmail);
};

export const updateUserPassword = (newPassword) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");
  return fbUpdatePassword(user, newPassword);
};

// Subscribe to auth state changes. Returns the unsubscribe function.
export const onAuthChange = (callback) => onAuthStateChanged(auth, user => {
  callback(
    user
      ? { uid: user.uid, email: user.email, role: determineWSRNRole(user.email) }
      : null
  );
});