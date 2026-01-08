/**
 * Map Component
 * 
 * Displays an OpenStreetMap with user location and outage status
 */

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Coordinates } from '../types';

// Fix for default marker icon in Leaflet with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  center: Coordinates;
  zoom?: number;
  markerLabel?: string;
}

/**
 * Component to recenter map when center prop changes
 */
function RecenterMap({ center }: { center: Coordinates }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);

  return null;
}

export const MapComponent: React.FC<MapComponentProps> = ({ 
  center, 
  zoom = 13,
  markerLabel = 'Your Location'
}) => {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center.lat, center.lng]}>
          <Popup>{markerLabel}</Popup>
        </Marker>
        <RecenterMap center={center} />
      </MapContainer>
    </div>
  );
};
