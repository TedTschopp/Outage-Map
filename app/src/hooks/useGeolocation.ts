/**
 * Custom hook for geolocation
 */

import { useState, useEffect } from 'react';
import type { Coordinates } from '../types';

interface GeolocationState {
  location: Coordinates | null;
  error: string | null;
  loading: boolean;
  usingFallback?: boolean;
}

// SCE Corporate Headquarters: 2244 Walnut Grove Ave, Rosemead, CA 91770
const SCE_HEADQUARTERS: Coordinates = {
  lat: 34.0517,
  lng: -118.0732,
};

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      // Use SCE headquarters as fallback
      setState({
        location: SCE_HEADQUARTERS,
        error: null,
        loading: false,
        usingFallback: true,
      });
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        error: null,
        loading: false,
        usingFallback: false,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      let errorMessage = 'Unable to retrieve your location';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location permission denied - using SCE headquarters';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable - using SCE headquarters';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out - using SCE headquarters';
          break;
      }

      // Use SCE headquarters as fallback instead of showing error
      setState({
        location: SCE_HEADQUARTERS,
        error: errorMessage,
        loading: false,
        usingFallback: true,
      });
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  return state;
};
