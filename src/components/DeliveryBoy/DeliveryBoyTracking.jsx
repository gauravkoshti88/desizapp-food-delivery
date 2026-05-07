import React from 'react'
import DeliveryBoyLoc from '../../assets/DaliveryBoy/deliveryBoyLoc.png'
import HomeLoc from '../../assets/DaliveryBoy/homeLoc.png'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { IoMdCloseCircle } from "react-icons/io";

// Custom icons
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

// Helper component to auto-fit bounds
function FitBounds({ path }) {
  const map = useMap();
  if (path && path.length > 0) {
    map.fitBounds(path);   // auto zoom & center to include both points
  }
  return null;
}

function DeliveryBoyTracking({ order, setShowMap, info }) {
  const deliveryBoyLat = order.deliveryBoyLocation?.lat || 0
  const deliveryBoyLong = order.deliveryBoyLocation?.long || 0

  const customerLat = order.customerLocation?.lat || 0
  const customerLong = order.customerLocation?.long || 0

  const path = [
    [deliveryBoyLat, deliveryBoyLong],
    [customerLat, customerLong]
  ]

  return (
    <div className='w-full max-w-full h-screen fixed inset-0 z-50 flex flex-col bg-white shadow-2xl overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between p-5 pt-3 pb-3 bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg border-b border-orange-200/50'>
        <div className='flex flex-col'>
          <h2 className='font-bold text-white text-lg leading-tight'>Tracking</h2>
          <p className='font-semibold text-orange-100 text-sm'>{info.customer?.fullname}</p>
        </div>
        <button
          onClick={() => setShowMap(false)}
          className='p-2 rounded-full bg-white/20 hover:bg-white/30 border border-white/50 hover:border-white/70 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 text-white'
        >
          <IoMdCloseCircle size={24} />
        </button>
      </div>

      {/* Customer Details */}
      <div className='p-5 pb-3 bg-gradient-to-b from-orange-50 to-white border-b border-orange-100/50 flex-shrink-0'>
        <div className='space-y-1'>
          <p className='font-semibold text-sm text-orange-800'>{info.customer?.fullname}</p>
          <p className='text-xs text-orange-700 font-medium truncate max-w-[280px]'>
            📍 {info.deliveryAddress?.text}
          </p>
          <p className='text-xs text-orange-600 flex items-center gap-2'>
            📞 {info.customer?.phone}
          </p>
        </div>
      </div>

      {/* Map */}
      <div className='flex-1 relative'>
        <MapContainer
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          className='w-full h-full'
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[deliveryBoyLat, deliveryBoyLong]} icon={deliveryBoyIcon}>
            <Popup>
              <div className='font-bold text-orange-600'>Delivery Boy</div>
              <div className='text-sm'>Moving to destination</div>
            </Popup>
          </Marker>

          <Marker position={[customerLat, customerLong]} icon={customerIcon}>
            <Popup>
              <div className='font-bold text-blue-600'>Customer Location</div>
              <div className='text-sm'>{info.deliveryAddress?.text}</div>
            </Popup>
          </Marker>

          <Polyline 
            positions={path} 
            color='#f97316' 
            weight={6}
            opacity={0.8}
            dashArray={[10,10]}
          />

          {/* Auto-fit map to markers */}
          <FitBounds path={path} />
        </MapContainer>
      </div>

      {/* Navigation Button */}
      <div className='p-5 pt-3 bg-white border-t border-orange-100/50 shadow-lg flex-shrink-0'>
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${deliveryBoyLat},${deliveryBoyLong}&destination=${customerLat},${customerLong}&travelmode=driving`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          🚗 Navigate to Customer
        </a>
      </div>
    </div>
  )
}

export default DeliveryBoyTracking
