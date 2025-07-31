// src/components/CommonNotifications.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export async function notifyUser({ userId, type, message }) {
  try {
    await addDoc(collection(db, "wsrn_notifications"), {
      userId,
      type,
      message,
      timestamp: new Date().toISOString()
    });
    console.log("🔔 Notification sent:", message);
  } catch (err) {
    console.error("❌ Failed to send notification:", err.message);
  }
}

