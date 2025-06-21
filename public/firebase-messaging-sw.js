// public/firebase-messaging-sw.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// Use environment variables for security
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "wsrn-recruitment.firebaseapp.com",
  projectId: "wsrn-recruitment",
  storageBucket: "wsrn-recruitment.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Enhanced notification handler
onBackgroundMessage(messaging, (payload) => {
  console.log("🔔 Background message received:", payload);

  // Fallback for missing notification payload
  const notification = payload.notification || {
    title: "WSRN Alert",
    body: "New important update"
  };

  // Customize based on payload type
  const options = {
    body: notification.body,
    icon: notification.icon || "/logo192.png", // Default to your logo
    badge: "/favicon.ico",
    data: {
      url: payload.data?.link || "/", // Default to home
      timestamp: new Date().toISOString()
    },
    vibrate: [200, 100, 200],
    tag: "wsrn-notification"
  };

  // Add sound if specified
  if (notification.sound) {
    options.sound = "/sounds/" + notification.sound;
  }

  self.registration.showNotification(notification.title, options);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Focus open window or open new one
      const matchingClient = windowClients.find(client => 
        client.url === url && 'focus' in client
      );
      if (matchingClient) return matchingClient.focus();
      return clients.openWindow(url);
    })
  );
});