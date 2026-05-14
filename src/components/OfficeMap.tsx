import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + Vite
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function OfficeMap() {
  const position: [number, number] = [-6.7725, 39.2155]; // Mlimani City, Dar es Salaam coordinates

  return (
    <div className="h-full w-full min-h-[300px] rounded-2xl overflow-hidden border border-white/5 grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-700">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=fa8d7a164c014792a62883eb92e54a37" // Dark-ish theme if possible, or standard
        />
        {/* Fallback to standard OSM if thunderforest fails/needs key */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                MtaalamuTech HQ <br /> Mlimani City, Dar es Salaam
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
