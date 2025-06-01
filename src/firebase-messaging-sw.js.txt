// src/firebase-messaging-sw.js

import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging";

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

onBackgroundMessage(messaging, (payload) => {
  console.log("🔔 Background message received:", payload);
  
  const options = {
    body: payload.notification.body,
    icon: "/logo.png",
    sound: "/sounds/alarm.mp3",
    badge: "/favicon.ico",
    vibrate: [200, 100, 200],
    tag: "wsrn-notification"
  };

  self.registration.showNotification(payload.notification.title, options);
});