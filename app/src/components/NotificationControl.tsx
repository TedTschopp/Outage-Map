/**
 * Notification Control Component
 * 
 * Provides UI for managing push notification subscriptions
 */

import React, { useState, useEffect } from 'react';
import { pushNotificationService } from '../services/pushNotificationService';
import { useTranslation } from '../utils/i18n';
import type { Coordinates, NotificationPreferences } from '../types';
import './NotificationControl.css';

interface NotificationControlProps {
  location: Coordinates | null;
  hasOutage: boolean;
}

export const NotificationControl: React.FC<NotificationControlProps> = ({ 
  location, 
  hasOutage 
}) => {
  const { t } = useTranslation();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [advanceHours, setAdvanceHours] = useState<12 | 24 | 36 | 48 | 72>(24);

  useEffect(() => {
    // Initialize push service
    pushNotificationService.initialize();

    // Check current subscription status
    const checkStatus = async () => {
      const subscription = await pushNotificationService.getSubscription();
      setIsSubscribed(!!subscription);
      setPermission(pushNotificationService.getPermissionStatus());
    };

    checkStatus();
  }, []);

  const handleEnableNotifications = async () => {
    try {
      const subscription = await pushNotificationService.subscribe();
      
      if (subscription) {
        setIsSubscribed(true);
        setPermission('granted');

        // Save preferences
        const preferences: NotificationPreferences = {
          enabled: true,
          location: location || undefined,
          advanceNoticeHours: hasOutage ? undefined : advanceHours,
        };
        pushNotificationService.savePreferences(preferences);
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
      alert('Failed to enable notifications. Please try again.');
    }
  };

  const handleDisableNotifications = async () => {
    try {
      await pushNotificationService.unsubscribe();
      setIsSubscribed(false);
    } catch (error) {
      console.error('Failed to disable notifications:', error);
      alert('Failed to disable notifications. Please try again.');
    }
  };

  if (!pushNotificationService.isSupported()) {
    return (
      <div className="notification-control not-supported" role="status">
        <p>{t('notifications.notSupported')}</p>
      </div>
    );
  }

  return (
    <div className="notification-control">
      <h3>{t('notifications.status')}</h3>
      
      <div className="status-display">
        <div className="status-item">
          <span className="label">{t('notifications.status')}:</span>
          <span className={`value ${isSubscribed ? 'enabled' : 'disabled'}`}>
            {isSubscribed ? t('notifications.enabled') : t('notifications.disabled')}
          </span>
        </div>
        
        <div className="status-item">
          <span className="label">{t('notifications.permission')}:</span>
          <span className={`value permission-${permission}`}>
            {permission === 'granted' && t('notifications.granted')}
            {permission === 'denied' && t('notifications.denied')}
            {permission === 'default' && t('notifications.default')}
          </span>
        </div>
      </div>

      {!hasOutage && !isSubscribed && (
        <div className="advance-notice-selector">
          <label htmlFor="advance-hours">
            {t('notifications.selectAdvanceNotice')}:
          </label>
          <select
            id="advance-hours"
            value={advanceHours}
            onChange={(e) => setAdvanceHours(Number(e.target.value) as 12 | 24 | 36 | 48 | 72)}
            aria-label={t('notifications.selectAdvanceNotice')}
          >
            <option value={12}>{t('notifications.advanceNotice.12')}</option>
            <option value={24}>{t('notifications.advanceNotice.24')}</option>
            <option value={36}>{t('notifications.advanceNotice.36')}</option>
            <option value={48}>{t('notifications.advanceNotice.48')}</option>
            <option value={72}>{t('notifications.advanceNotice.72')}</option>
          </select>
        </div>
      )}

      <div className="button-group">
        {!isSubscribed ? (
          <button
            onClick={handleEnableNotifications}
            className="btn btn-primary"
            aria-label={t('notifications.enable')}
          >
            🔔 {t('notifications.enable')}
          </button>
        ) : (
          <button
            onClick={handleDisableNotifications}
            className="btn btn-secondary"
            aria-label={t('notifications.disable')}
          >
            🔕 {t('notifications.disable')}
          </button>
        )}
      </div>
    </div>
  );
};
