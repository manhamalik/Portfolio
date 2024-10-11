import React, { useState, useContext, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { DivIcon, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Context } from "../pages/map";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faChampagneGlasses,
  faHeart,
  faBurger,
  // ... other icons ...
} from "@fortawesome/free-solid-svg-icons";
import BusinessCard from "./BusinessCard";
import AttractionCard from "./AttractionCard";
import EventCard from "./EventCard";

export default function MapPageMap({ mapLocations }) {
  const filters = useContext(Context);

  const markerDetails = {
    NaturalAttraction: { icon: faTree, color: "#027B00" },
    HistoricalAttraction: { icon: faBookOpenReader, color: "#027B00" },
    // ... other marker details ...
  };

  const [markersDisplayed, setMarkersDisplayed] = useState([...mapLocations]);

  useEffect(() => {
    if (filters.searchSelected.length !== 0) {
      setMarkersDisplayed(filters.searchSelected);
    } else {
      if (filters.filterSelected.size !== 0) {
        const filtered = mapLocations.filter((element) =>
          filters.filterSelected.has(element.type)
        );
        setMarkersDisplayed(filtered);
      } else {
        setMarkersDisplayed([...mapLocations]);
      }
    }
  }, [filters]);

  const center = new LatLng(43.153214, -79.392812);

  return (
    <>
      <style jsx>{`
        .leaflet-container {
          height: 100%;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      `}</style>
      <MapContainer center={center} zoom={12} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors"'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersDisplayed.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.coords}
            icon={
              new DivIcon({
                className: "icon-container",
                html: ReactDOMServer.renderToString(
                  <div
                    style={{
                      color: `${markerDetails[marker.type].color}`,
                      display: "flex",
                      justifyContent: "center",
                      border: "none",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={markerDetails[marker.type].icon}
                      size="2x"
                    />
                  </div>
                ),
                iconSize: [50, 50],
              })
            }
          >
            <Popup>
              <div style={{ boxShadow: "0 3px 20px rgba(0,0,0,0.6)", borderRadius: "12px" }}>
                {marker.section === "attractions" ? (
                  <AttractionCard attraction={marker.details} />
                ) : marker.section === "events" ? (
                  <EventCard event={marker.details} hasDelete={false} />
                ) : (
                  <BusinessCard business={marker.details} />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
