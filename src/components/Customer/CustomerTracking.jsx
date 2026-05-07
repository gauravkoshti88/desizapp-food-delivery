import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import DeliveryBoyLoc from '../../assets/DaliveryBoy/deliveryBoyLoc.png'
import HomeLoc from '../../assets/DaliveryBoy/homeLoc.png'

const deliveryBoyIcon = new L.Icon({
  iconUrl: DeliveryBoyLoc,
  iconSize: [45, 50],
  iconAnchor: [22, 50],
  popupAnchor: [0, -50]
})

const customerIcon = new L.Icon({
  iconUrl: HomeLoc,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50]
})

function CustomerTracking({ order }) {
  // Safe fallback coordinates
  const deliveryBoyLat = order?.deliveryBoyLocation?.lat ?? 23.25
  const deliveryBoyLong = order?.deliveryBoyLocation?.long ?? 79.25

  const customerLat = order?.customerLocation?.lat ?? 23.20
  const customerLong = order?.customerLocation?.long ?? 79.20

  // Path between delivery boy and customer
  const path = [
    [deliveryBoyLat, deliveryBoyLong],
    [customerLat, customerLong]
  ]

  // Safe center calculation
  const centerLat = (deliveryBoyLat + customerLat) / 2
  const centerLong = (deliveryBoyLong + customerLong) / 2
  const center = [centerLat, centerLong]

  return (
    <div className="h-[400px] w-full">
      <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render markers only if coordinates are valid */}
        {deliveryBoyLat && deliveryBoyLong && (
          <Marker position={[deliveryBoyLat, deliveryBoyLong]} icon={deliveryBoyIcon}>
            <Popup>Delivery Boy</Popup>
          </Marker>
        )}

        {customerLat && customerLong && (
          <Marker position={[customerLat, customerLong]} icon={customerIcon}>
            <Popup>Customer</Popup>
          </Marker>
        )}

        <Polyline positions={path} color="orange" weight={6} opacity={0.8} dashArray="10,10" />
      </MapContainer>
    </div>
  )
}

export default CustomerTracking
