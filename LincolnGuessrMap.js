import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  Popup,
  Polyline,
} from "react-leaflet";
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LincolnGuessrMap({
  onCurrentLocationChange,
  canChooseLocation = false,
  pickedLocation,
  correctLocation,
  correctInfo,
}) {
  const [currentLocation, setCurrentLocation] = useState(pickedLocation);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (canChooseLocation) {
          const { lat, lng } = e.latlng;
          setCurrentLocation([lat, lng]);
          onCurrentLocationChange([lat, lng]);
        }
      },
    });
    return null;
  };

  const customIcon = (emoji) =>
    new DivIcon({
      className: "custom-icon",
      html: `<div style="font-size: 24px;">${emoji}</div>`,
      iconAnchor: [12, 24],
    });

  return (
    <>
      <style jsx>{`
        .leaflet-container {
          height: 100%;
        }
      `}</style>
      <MapContainer center={correctLocation || [43.153214, -79.392812]} zoom={12} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {currentLocation && (
          <Marker position={currentLocation} icon={customIcon("📍")}>
            <Popup>
              Latitude: {currentLocation[0]}, Longitude: {currentLocation[1]}
            </Popup>
          </Marker>
        )}
        {correctLocation && (
          <Marker position={correctLocation} icon={customIcon("🚩")}>
            <Popup>{correctInfo || `Latitude: ${correctLocation[0]}, Longitude: ${correctLocation[1]}`}</Popup>
          </Marker>
        )}
        {correctLocation && currentLocation && (
          <Polyline
            positions={[correctLocation, currentLocation]}
            color="black"
            weight={3}
            dashArray="5, 10"
          />
        )}
      </MapContainer>
    </>
  );
}
