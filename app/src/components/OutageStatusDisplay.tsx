/**
 * Outage Status Component
 * 
 * Displays the current outage status with clear visual indicators
 */

import React from 'react';
import type { OutageStatus } from '../types';
import { useTranslation } from '../utils/i18n';
import './OutageStatusDisplay.css';

interface OutageStatusDisplayProps {
  status: OutageStatus | null;
  loading?: boolean;
}

export const OutageStatusDisplay: React.FC<OutageStatusDisplayProps> = ({ 
  status, 
  loading = false 
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="outage-status loading" role="status" aria-live="polite">
        <div className="status-icon">⏳</div>
        <h2>{t('outage.checking')}</h2>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  const isOutage = status.hasOutage;

  return (
    <div 
      className={`outage-status ${isOutage ? 'outage' : 'no-outage'}`}
      role="status"
      aria-live="polite"
      aria-label={isOutage ? t('outage.detected') : t('outage.noOutage')}
    >
      <div className="status-icon" aria-hidden="true">
        {isOutage ? '⚠️' : '✅'}
      </div>
      <h2>{isOutage ? t('outage.detected') : t('outage.noOutage')}</h2>
      
      {status.message && (
        <p className="status-message">{status.message}</p>
      )}

      {isOutage && status.estimatedRestoreTime && (
        <div className="outage-details">
          <div className="detail-item">
            <strong>{t('outage.estimatedRestore')}:</strong>
            <span>{new Date(status.estimatedRestoreTime).toLocaleString()}</span>
          </div>
          {status.affectedCustomers && (
            <div className="detail-item">
              <strong>{t('outage.affectedCustomers')}:</strong>
              <span>{status.affectedCustomers.toLocaleString()}</span>
            </div>
          )}
          {status.outageId && (
            <div className="detail-item">
              <strong>{t('outage.outageId')}:</strong>
              <span>{status.outageId}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
