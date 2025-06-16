// src/services/fcmTokenRevocation.js

import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function trackDeviceToken(uid, fcmToken) {
  try {
    const q = query(collection(db, "fcm_tokens"), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    snapshot.forEach(async (tokenDoc) => {
      if (tokenDoc.data().token !== fcmToken) {
        await deleteDoc(doc(db, "fcm_tokens", tokenDoc.id));
      }
    });
  } catch (error) {
    console.error("Error revoking old tokens:", error);
  }
}