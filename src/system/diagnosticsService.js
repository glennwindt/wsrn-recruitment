// src/system/diagnosticsService.js
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

const diagCollection = collection(db, "systemDiagnostics");

// ✅ Fetch diagnostics logs
export async function getSystemDiagnostics() {
  const snapshot = await getDocs(diagCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// ✅ Log an error or warning
export async function logDiagnostic(message, component, severity = "warning") {
  await addDoc(diagCollection, {
    message,
    component,
    severity,
    timestamp: serverTimestamp()
  });
}

