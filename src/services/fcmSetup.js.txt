// src/services/fcmSetup.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "wsrn-recruitment.firebaseapp.com",
  projectId: "wsrn-recruitment",
  storageBucket: "wsrn-recruitment.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and register device
export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY"
      });
      console.log("📱 Device registered:", token);
      return token;
    } else {
      throw new Error("Permission not granted");
    }
  } catch (err) {
    console.error("❌ FCM Setup failed:", err);
    return null;
  }
};

// Listen for incoming messages
export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("🔔 Message received:", payload);
    
    if (payload.notification) {
      const audio = new Audio(payload.data?.sound || "default.mp3");
      audio.play();

      // Native notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/logo.png"
        });
      }
    }
  });
};