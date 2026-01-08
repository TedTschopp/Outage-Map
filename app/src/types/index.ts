/**
 * Core types for the Outage Map application
 */

export type Coordinates = {
  lat: number;
  lng: number;
}

export type OutageStatus = {
  hasOutage: boolean;
  outageId?: string;
  estimatedRestoreTime?: string;
  affectedCustomers?: number;
  message?: string;
}

export type PushSubscriptionData = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export type NotificationPreferences = {
  enabled: boolean;
  location?: Coordinates;
  advanceNoticeHours?: 12 | 24 | 36 | 48 | 72;
}
