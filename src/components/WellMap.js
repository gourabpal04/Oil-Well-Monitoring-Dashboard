import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import wellsData from '../data/wells.json';
import anime from 'animejs';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WellMap = () => {
  const [selectedWell, setSelectedWell] = useState(null);

  useEffect(() => {
    // Animate markers on mount
    anime({
      targets: '.leaflet-marker-icon',
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)',
    });
  }, []);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Flowing':
        return '#28a745';
      case 'Sick':
        return '#ffc107';
      case 'Dry/Abandoned':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const createCustomIcon = (status) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${getMarkerColor(status)};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  };

  const handleMarkerClick = (well) => {
    setSelectedWell(well);
    // Animate the popup
    anime({
      targets: '.leaflet-popup-content-wrapper',
      scale: [0.8, 1],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .5)',
    });
  };

  return (
    <div className="well-map-container">
      <h1>Well Locations</h1>
      <div className="map-wrapper">
        <MapContainer
          center={[23.9408, 91.9882]} // Center of Tripura
          zoom={8}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {wellsData.map((well) => (
            <Marker
              key={well.name}
              position={[well.lat, well.long]}
              icon={createCustomIcon(well.status)}
              eventHandlers={{
                mouseover: () => setSelectedWell(well),
                mouseout: () => setSelectedWell(null),
              }}
            >
              <Popup>
                <div className="well-popup">
                  <h3>{well.name}</h3>
                  <p><strong>Location:</strong> {well.location}</p>
                  <p><strong>Status:</strong> {well.status}</p>
                  <p><strong>FTHP:</strong> {well.fthp || 'N/A'} psi</p>
                  <p><strong>Gas Rate:</strong> {well.qg ? well.qg.toLocaleString() : 'N/A'} m³/d</p>
                  <p><strong>Water Rate:</strong> {well.qw || 'N/A'} m³/d</p>
                  <p><strong>Condensate Rate:</strong> {well.qc || 'N/A'} m³/d</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedWell && (
        <div className="well-info-box">
          <h3>{selectedWell.name}</h3>
          <p><strong>Location:</strong> {selectedWell.location}</p>
          <p><strong>Status:</strong> {selectedWell.status}</p>
          <p><strong>FTHP:</strong> {selectedWell.fthp || 'N/A'} psi</p>
          <p><strong>Gas Rate:</strong> {selectedWell.qg ? selectedWell.qg.toLocaleString() : 'N/A'} m³/d</p>
          <p><strong>Water Rate:</strong> {selectedWell.qw || 'N/A'} m³/d</p>
          <p><strong>Condensate Rate:</strong> {selectedWell.qc || 'N/A'} m³/d</p>
        </div>
      )}
    </div>
  );
};

export default WellMap; 