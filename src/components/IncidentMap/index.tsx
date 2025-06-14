import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import './index.css';

interface Incident {
  id: string;
  incidentType: string;
  severity: string;
  description: string;
  latitude: number;
  longitude: number;
  reporterName: string;
  timestamp: string;
}

interface Props {
  incidents: Incident[];
  mapVar?: boolean;
  onMapClick?: (latlng: LatLngTuple) => void;
}

const ClickCapture: React.FC<{ onClick: (latlng: LatLngTuple) => void }> = ({ onClick }) => {
  useMapEvents({
    click(e) {
      const latlng: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      onClick(latlng);
    },
  });
  return null;
};

const incidentIcons: { [key: string]: L.Icon } = {
  Flood: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4830/4830739.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Earthquake: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1388/1388427.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Fire: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/482/482167.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Cyclone: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907615.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Tornado: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1779/1779934.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Landslide: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5753/5753091.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  Default: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
};

const FlyToLocation: React.FC<{ position: LatLngTuple }> = ({ position }) => {
  const map = useMapEvents({});
  map.flyTo(position, 12);
  return null;
};

const LegendItem: React.FC<{ label: string; icon: string }> = ({ label, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <img src={icon} alt={label} width={20} height={20} />
    <span>{label}</span>
  </div>
);

const baseMapUrls = {
  Streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Imagery: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  Topographic: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  Dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  Light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  Terrain: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
  Watercolor: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
};

const IncidentMap: React.FC<Props> = ({ incidents, mapVar = false, onMapClick }) => {
  const [selectedPosition, setSelectedPosition] = useState<LatLngTuple | null>(null);
  const [basemap, setBasemap] = useState<keyof typeof baseMapUrls>('Streets');
  const center: LatLngTuple = [20.5937, 78.9629];
  const hasIncidents = incidents.length > 0;

  return (
    <>
    {mapVar===false && hasIncidents===true &&(
      <div style={{ marginBottom: '8px', textAlign: 'right' }}>
        <label style={{ marginRight: '8px' }}>Basemap:</label>
        <select
          value={basemap}
          onChange={(e) => setBasemap(e.target.value as keyof typeof baseMapUrls)}
          style={{ padding: '4px', borderRadius: '4px' }}
        >
          {Object.keys(baseMapUrls).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
)}
  {mapVar===false && hasIncidents===true &&(
      <div
        style={{
          position: 'absolute',
          top: '250px',
          left: '20px',
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 6px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}
      >
        <strong>Legend</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
          <LegendItem label="Flood" icon="https://cdn-icons-png.flaticon.com/512/4830/4830739.png" />
          <LegendItem label="Earthquake" icon="https://cdn-icons-png.flaticon.com/512/1388/1388427.png" />
          <LegendItem label="Fire" icon="https://cdn-icons-png.flaticon.com/512/482/482167.png" />
          <LegendItem label="Cyclone" icon="https://cdn-icons-png.flaticon.com/512/2907/2907615.png" />
          <LegendItem label="Tornado" icon="https://cdn-icons-png.flaticon.com/512/1779/1779934.png" />
          <LegendItem label="Landslide" icon="https://cdn-icons-png.flaticon.com/512/5753/5753091.png" />
        </div>
      </div>
)}
      <MapContainer
        center={selectedPosition || center}
        zoom={5}
        style={{
          height: mapVar ? '80vh' : hasIncidents ? '50vh' : '30vh',
          width: mapVar ? '50%' : hasIncidents ? '100%' : '60%',
          borderRadius: mapVar ? '10px' : 0,
          position: 'relative'
        }}
      >
        <TileLayer url={baseMapUrls[basemap]} />

        {hasIncidents ? (
          <>
            {selectedPosition && <FlyToLocation position={selectedPosition} />}
            {incidents.map((incident) => {
              const position: LatLngTuple = [incident.latitude, incident.longitude];
              const isCriticalFire =
                (incident.incidentType === 'Fire') &&
                incident.severity === 'Critical';

              const icon = isCriticalFire
                ? L.divIcon({
                    html: `<div class="pulsing-marker">
                            <img src="${
                              incidentIcons[incident.incidentType]?.options.iconUrl ||
                              incidentIcons.Default.options.iconUrl
                            }" width="30" height="30" />
                          </div>`,
                    iconSize: [30, 30],
                    className: '',
                  })
                : incidentIcons[incident.incidentType] || incidentIcons.Default;

              return (
                <Marker
                  key={incident.id}
                  position={position}
                  icon={icon}
                  eventHandlers={{
                    click: () => setSelectedPosition(position),
                  }}
                >
                  <Popup>
                    <strong>{incident.incidentType}</strong><br />
                    Severity: {incident.severity}<br />
                  </Popup>
                </Marker>
              );
            })}
          </>
        ) : (
          <>
            <ClickCapture
              onClick={(latlng) => {
                setSelectedPosition(latlng);
                if (onMapClick) onMapClick(latlng);
              }}
            />
            {selectedPosition && (
              <Marker position={selectedPosition}>
                <Popup>
                  Selected Location<br />
                  Lat: {selectedPosition[0].toFixed(4)}<br />
                  Lng: {selectedPosition[1].toFixed(4)}
                </Popup>
              </Marker>
            )}
          </>
        )}
      </MapContainer>
    </>
  );
};

export default IncidentMap;
