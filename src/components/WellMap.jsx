import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import wellsData from '../data/wells.json';

// Fix for default marker icon
const icon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const WellMap = () => {
  const [hoveredWell, setHoveredWell] = useState(null);

  // Tripura's center coordinates
  const center = [23.9408, 91.9882];

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Flowing':
        return 'bg-green-500';
      case 'Sick':
        return 'bg-yellow-500';
      case 'Dry/Abandoned':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <MapContainer
        center={center}
        zoom={9}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {wellsData.map((well, index) => (
          <Marker
            key={index}
            position={[well.lat, well.long]}
            icon={icon}
            eventHandlers={{
              mouseover: () => setHoveredWell(well),
              mouseout: () => setHoveredWell(null)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{well.name}</h3>
                <p>Status: {well.status}</p>
                {well.qg && <p>Qg: {well.qg} MMSCMD</p>}
                {well.qc && <p>Qc: {well.qc} m³/day</p>}
                {well.qw && <p>Qw: {well.qw} m³/day</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Hover Info Box */}
      {hoveredWell && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm transform transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${getMarkerColor(hoveredWell.status)}`}></div>
            <h3 className="text-lg font-bold">{hoveredWell.name}</h3>
          </div>
          <div className="space-y-1">
            <p><span className="font-semibold">Location:</span> {hoveredWell.location}</p>
            <p><span className="font-semibold">Status:</span> {hoveredWell.status}</p>
            {hoveredWell.qg && <p><span className="font-semibold">Qg:</span> {hoveredWell.qg} MMSCMD</p>}
            {hoveredWell.qc && <p><span className="font-semibold">Qc:</span> {hoveredWell.qc} m³/day</p>}
            {hoveredWell.qw && <p><span className="font-semibold">Qw:</span> {hoveredWell.qw} m³/day</p>}
            {hoveredWell.fthp && <p><span className="font-semibold">FTHP:</span> {hoveredWell.fthp}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WellMap; 