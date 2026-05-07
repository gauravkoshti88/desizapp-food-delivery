import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css'
import { setAddress, setLocation } from '../../redux/slices/mapSlice';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdDeliveryDining, MdFoodBank } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { IoFastFoodOutline } from "react-icons/io5";
import { serverUrl } from '../../App'
import { addMyOrder, setCartItems } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import L from 'leaflet'
import HomeLoc from '../../assets/DaliveryBoy/homeLoc.png'

function RecenterMap({ location }) {
  if (location.lat && location.long) {
    const map = useMap()
    map.setView([location.lat, location.long], 16, { animate: true })
  }
  return null
}

const customerIcon = new L.Icon({
  iconUrl: HomeLoc,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50]
})

function CheckoutPage() {
  const { location, address } = useSelector(state => state.map);
  const { cartItems, totalAmount, userData } = useSelector(state => state.user);
  const navigate = useNavigate()
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState("COD")
  const apiKey = import.meta.env.VITE_GEO_API

  const deliveryFee = totalAmount > 500 ? 0 : 45;
  const totalWithDeliveryFee = totalAmount + deliveryFee;

  const onDragEnd = (e) => {
    console.log(e.target._latlng);
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({
      lat, long: lng
    }))
    getAddressByLatLng(lat, lng)

  }

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)

      dispatch(setAddress(response.data.results[0].formatted))
    } catch (error) {
      dispatch(setAddress(null))
    }
  }

  const getLatLngByAddress = async () => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`);

      const { lat, lon } = response.data.features[0].properties
      dispatch(setLocation({ lat, long: lon }))

    } catch (error) {
      dispatch(setLocation({
        lat: null,
        long: null
      }))

    }
  }

  const getCurrentLocation = () => {
    const latitude = userData?.location.coordinates[1];
    const longitude = userData?.location.coordinates[0];
    dispatch(setLocation({ lat: latitude, long: longitude }));
    getAddressByLatLng(latitude, longitude);
    setAddressInput(address)
  }


  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(serverUrl + "/api/order/place-order", {
        cartItems,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.long
        },
        paymentMethod,
        totalAmount: totalWithDeliveryFee
      }, { withCredentials: true })

      if (paymentMethod === "COD") {
        dispatch(addMyOrder(response.data))
        dispatch(setCartItems([]))
        navigate("/order-placed");
      } else {
        const orderId = response.data.orderId
        const razorpayOrder = response.data.razorpayOrder
        openRazorpay(orderId, razorpayOrder)
      }
    } catch (error) {
      navigate("/home")
    }
  }

  const openRazorpay = (orderId, razorpayOrder) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "DesiZapp",
      description: "Test Transaction",
      order_id: razorpayOrder.id,
      handler: async function (response) {
        try {
          const verifyResponse = await axios.post(serverUrl + "/api/order/verify-payment", {
            razorpayPaymentId: response.razorpay_payment_id,
            orderId
          }, { withCredentials: true })

          dispatch(addMyOrder(verifyResponse.data))
          dispatch(setCartItems([]))
          navigate("/order-placed");
        } catch (error) {
          console.log(error);

          toast.error("Payment Failed ❌", {
            position: "top-right",
            style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
          });
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  useEffect(() => {
    setAddressInput(address)
  }, [address])

  return (
    <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center p-6'>
      <div
        onClick={() => navigate("/cart")}
        className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md fixed top-3 left-3"
      >
        <IoIosArrowRoundBack size={24} className="text-orange-600" />
      </div>
      <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6'>
        <h1 className='text-2xl font-bold text-gray-800 text-center'>Checkout</h1>
        {/* For Map */}
        <section>
          <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'><FaLocationDot className='text-orange-600' />Delivery Location</h2>
          <div className='flex gap-2 mb-3'>
            <input type="text" className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]' placeholder='Enter Your Delivery Address' value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
            <button className='bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getLatLngByAddress}><IoIosSearch size={17} /></button>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getCurrentLocation}><TbCurrentLocation size={17} /></button>
          </div>

          <div className='rounded-xl border overflow-hidden'>
            <div className='h-64 w-full flex items-center justify-center'>
              <MapContainer
                className='w-full h-full'
                center={[location?.lat, location?.long]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker position={[location.lat, location.long]} draggable eventHandlers={{ dragend: onDragEnd }} icon={customerIcon}>

                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>

        {/* For Payment Method */}
        <section>
          <h2 className='text-lg font-semibold mb-3 text-gray-800'>Patment Method</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className={`flex items-center gap-3 cursor-pointer rounded-xl border p-4 text-left transition ${paymentMethod === "COD" ? "border-orange-500 bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`} onClick={() => setPaymentMethod("COD")}>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100'><MdDeliveryDining className='text-green-600 text-xl' /></span>
              <div>
                <p className='font-medium text-gray-800'>Cash On Delivery</p>
                <p className='text-xs text-gray-500'>Pay when your food arrives</p>
              </div>
            </div>
            <div className={`flex items-center cursor-pointer gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "ONLINE" ? "border-orange-500 bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`} onClick={() => setPaymentMethod("ONLINE")}>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
                <FaMobileAlt className='text-purple-700 text-lg' />
              </span>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                <FaCreditCard className='text-blue-700 text-xl' />
              </span>
              <div>
                <p className='font-medium text-gray-800'>UPI / Credit / Debit Card</p>
                <p className='text-xs text-gray-500'>Pay Securely Online</p>
                <p className='text-xs text-red-500 font-semibold'>
                  ⚠️ Currently running in Razorpay Test Mode (No real money will be deducted)
                </p>
                <p className='text-xs text-blue-600 font-medium'>
                  👉 Use only Razorpay Dummy Card details for testing
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="max-w-full mx-auto p-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
            Order Summary
            <span className="w-8 h-8 bg-orange-500 text-white text-xs font-bold rounded-lg flex items-center justify-center">
              {cartItems.length}
            </span>
          </h2>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
            {/* Items */}
            {cartItems.map((item, index) => (
              <div key={item.id || index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-2 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IoFastFoodOutline />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">× {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-lg text-gray-900">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}

            {/* Empty State */}
            {cartItems.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1 5h10l-1-5M3 3l1.4 2M7 13l-1 5" />
                  </svg>
                </div>
                <p className="font-medium text-gray-900">Your cart is empty</p>
              </div>
            )}

            {/* Summary */}
            {cartItems.length > 0 && (
              <>
                <hr className="border-gray-200 my-4" />
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">Subtotal</span>
                    <span className="font-bold">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-sm text-gray-700">Delivery</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-bold text-sm" : "font-bold text-sm"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-300 flex justify-between items-center">
                    <span className="text-xl font-black text-gray-900">Total</span>
                    <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      ₹{totalWithDeliveryFee.toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        <button className='w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 active:scale-97 transition-transform duration-500' onClick={handlePlaceOrder}>
          {paymentMethod === "COD" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  )
}

export default CheckoutPage
