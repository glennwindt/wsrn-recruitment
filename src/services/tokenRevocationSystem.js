// src/services/tokenRevocationSystem.js

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export async function revokeAccess(userId) {
  if (!userId) return;

  try {
    const tokenRef = doc(collection(db, "device_tokens"), userId);
    await deleteDoc(tokenRef);

    console.log(`🔒 Access revoked for user ${userId}`);
    alert("📱 Your access has been revoked due to expired documents or account removal.");
  } catch (err) {
    console.error("❌ Failed to revoke access:", err);
  }
}