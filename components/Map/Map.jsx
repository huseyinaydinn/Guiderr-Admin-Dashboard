"use client"

import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Leaflet default marker icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

export default function Map(props) {
  const { center = [39.0, 35.0], zoom = 6 } = props

  // Force resize to fix rendering issues
  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OSM</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            Starting point
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
