/**
 * Push Notification Service
 * 
 * Handles Web Push notification subscriptions and management.
 * Currently stores subscriptions locally (localStorage).
 * 
 * TODO: Integrate with backend API to store subscriptions server-side
 * TODO: Implement OAuth for tying identity to notification subscriptions
 */

import type { PushSubscriptionData, NotificationPreferences } from '../types';

const STORAGE_KEY_SUBSCRIPTION = 'outage_map_push_subscription';
const STORAGE_KEY_PREFERENCES = 'outage_map_notification_preferences';

class PushNotificationService {
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

  /**
   * Initialize the service worker for push notifications
   */
  async initialize(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Workers not supported');
      return;
    }

    if (!('PushManager' in window)) {
      console.warn('Push notifications not supported');
      return;
    }

    try {
      this.serviceWorkerRegistration = await navigator.serviceWorker.register(
        '/service-worker.js'
      );
      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  /**
   * Check if push notifications are supported
   */
  isSupported(): boolean {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  /**
   * Check current notification permission status
   */
  getPermissionStatus(): NotificationPermission {
    if (!('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  }

  /**
   * Request notification permission and subscribe to push
   */
  async subscribe(): Promise<PushSubscriptionData | null> {
    if (!this.serviceWorkerRegistration) {
      await this.initialize();
    }

    if (!this.serviceWorkerRegistration) {
      throw new Error('Service Worker not registered');
    }

    try {
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        console.log('Notification permission denied');
        return null;
      }

      // Generate a VAPID key for the application
      // TODO: Replace with actual VAPID public key from backend
      const vapidPublicKey = this.urlBase64ToUint8Array(
        'BEl62iUYgUivxIkv69yViEuiBIa-Ib37J8xQmrXj-qLEhiGgB0J5q5v5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Y'
      );

      const subscription = await this.serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey as BufferSource,
      });

      const subscriptionData = this.subscriptionToData(subscription);
      
      // Store subscription locally
      this.saveSubscriptionLocally(subscriptionData);
      
      // TODO: Send subscription to backend API
      // await this.sendSubscriptionToBackend(subscriptionData);

      return subscriptionData;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribe(): Promise<void> {
    if (!this.serviceWorkerRegistration) {
      return;
    }

    try {
      const subscription = await this.serviceWorkerRegistration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        this.clearLocalSubscription();
        console.log('Unsubscribed from push notifications');
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      throw error;
    }
  }

  /**
   * Get current subscription status
   */
  async getSubscription(): Promise<PushSubscriptionData | null> {
    // First check localStorage
    const localSub = this.getLocalSubscription();
    if (localSub) {
      return localSub;
    }

    // Then check service worker
    if (!this.serviceWorkerRegistration) {
      return null;
    }

    try {
      const subscription = await this.serviceWorkerRegistration.pushManager.getSubscription();
      if (subscription) {
        return this.subscriptionToData(subscription);
      }
    } catch (error) {
      console.error('Failed to get subscription:', error);
    }

    return null;
  }

  /**
   * Save notification preferences
   */
  savePreferences(preferences: NotificationPreferences): void {
    localStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(preferences));
  }

  /**
   * Get notification preferences
   */
  getPreferences(): NotificationPreferences | null {
    const data = localStorage.getItem(STORAGE_KEY_PREFERENCES);
    return data ? JSON.parse(data) : null;
  }

  // Private helper methods

  private subscriptionToData(subscription: PushSubscription): PushSubscriptionData {
    const keys = subscription.toJSON().keys!;
    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: keys.p256dh!,
        auth: keys.auth!,
      },
    };
  }

  private saveSubscriptionLocally(subscription: PushSubscriptionData): void {
    localStorage.setItem(STORAGE_KEY_SUBSCRIPTION, JSON.stringify(subscription));
  }

  private getLocalSubscription(): PushSubscriptionData | null {
    const data = localStorage.getItem(STORAGE_KEY_SUBSCRIPTION);
    return data ? JSON.parse(data) : null;
  }

  private clearLocalSubscription(): void {
    localStorage.removeItem(STORAGE_KEY_SUBSCRIPTION);
    localStorage.removeItem(STORAGE_KEY_PREFERENCES);
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

// Export singleton instance
export const pushNotificationService = new PushNotificationService();
