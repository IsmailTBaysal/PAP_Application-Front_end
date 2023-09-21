import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

class SimpleMapComponent extends React.Component {
  render() {
    const position = [31.9686, -99.9018]; // Texas coordinates

    return (
      <MapContainer
        center={position}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    );
  }
}

export default SimpleMapComponent;
