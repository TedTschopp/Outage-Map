/**
 * Service Worker for Push Notifications
 * 
 * Handles push notification events and displays notifications to the user.
 */

// Service worker version
const VERSION = '1.0.0';

// Listen for push events
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received:', event);

  let data = {
    title: 'Outage Map',
    body: 'You have a new notification',
    icon: '/vite.svg',
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/vite.svg',
    badge: '/vite.svg',
    vibrate: [200, 100, 200],
    data: data.data,
    actions: data.actions || [],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click:', event);

  event.notification.close();

  // Open the app when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a window is already open, focus it
      for (const client of clientList) {
        if (client.url === self.registration.scope && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

// Installation
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing version:', VERSION);
  self.skipWaiting();
});

// Activation
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating version:', VERSION);
  event.waitUntil(self.clients.claim());
});

console.log('[Service Worker] Loaded version:', VERSION);
