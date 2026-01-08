/**
 * Main App Component
 * 
 * Outage Map MVP - Mobile-first React application
 */

import { useState, useEffect } from 'react';
import { MapComponent } from './components/MapComponent';
import { OutageStatusDisplay } from './components/OutageStatusDisplay';
import { NotificationControl } from './components/NotificationControl';
import { useGeolocation } from './hooks/useGeolocation';
import { outageService } from './services/outageService';
import { useTranslation } from './utils/i18n';
import type { OutageStatus } from './types';
import './App.css';

function App() {
  const { t } = useTranslation();
  const { location, error: locationError, loading: locationLoading, usingFallback } = useGeolocation();
  const [outageStatus, setOutageStatus] = useState<OutageStatus | null>(null);
  const [checkingOutage, setCheckingOutage] = useState(false);

  // Check outage status when location is obtained
  useEffect(() => {
    if (location) {
      const checkOutage = async () => {
        setCheckingOutage(true);
        try {
          const status = await outageService.checkOutage(location);
          setOutageStatus(status);
        } catch (error) {
          console.error('Error checking outage:', error);
        } finally {
          setCheckingOutage(false);
        }
      };

      checkOutage();
    }
  }, [location]);

  // Loading state
  if (locationLoading) {
    return (
      <div className="app-container loading">
        <div className="loading-content" role="status" aria-live="polite">
          <div className="spinner"></div>
          <h1>{t('app.loading')}</h1>
          <p>{t('location.requesting')}</p>
        </div>
      </div>
    );
  }

  // Main app view
  if (location) {
    const markerLabel = usingFallback 
      ? 'SCE Headquarters (Fallback Location)' 
      : 'Your Location';

    return (
      <div className="app-container">
        <header className="app-header">
          <h1>{t('app.title')}</h1>
        </header>

        <main className="app-main">
          <div className="map-container">
            <MapComponent 
              center={location} 
              markerLabel={markerLabel}
            />
          </div>

          <div className="info-panel">
            {usingFallback && locationError && (
              <div className="fallback-notice" role="status" aria-live="polite">
                <div className="fallback-icon">ℹ️</div>
                <p><strong>Using Default Location</strong></p>
                <p>{locationError}</p>
                <p>Showing SCE Corporate Headquarters: 2244 Walnut Grove Ave, Rosemead, CA 91770</p>
              </div>
            )}

            <OutageStatusDisplay 
              status={outageStatus} 
              loading={checkingOutage}
            />

            {outageStatus && (
              <NotificationControl 
                location={location}
                hasOutage={outageStatus.hasOutage}
              />
            )}
          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default App;
