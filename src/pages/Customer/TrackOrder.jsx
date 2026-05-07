import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import CustomerTracking from '../../components/Customer/CustomerTracking';
import Delivery_Boy from '../../assets/DaliveryBoy/Delivery_Boy.png'
import { useSelector } from 'react-redux';

function TrackOrder() {
    const { orderId } = useParams();
    const [currentOrder, setCurrentOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { socket } = useSelector(state => state.user)
    const [liveLocation, setLiveLocation] = useState({});

    const handleGetOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(serverUrl + `/api/order/get-order-by-id/${orderId}`, { withCredentials: true });
            setCurrentOrder(response.data);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on("deliveryBoyLocationUpdate", ({ deliveryBoyId, latitude, longitude }) => {
                setLiveLocation(prev=> ({
                    ...prev,
                    [deliveryBoyId]: {lat:latitude, long:longitude}
                }))
            })
        }
    }, [])

    useEffect(() => {
        handleGetOrder()
    }, [orderId])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8 px-4">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="fixed top-5 left-5 p-2 bg-white shadow-md hover:shadow-lg rounded-xl hover:scale-105 transition-all duration-200 border border-gray-200 z-10"
                >
                    <IoIosArrowRoundBack size={22} className="text-orange-600" />
                </button>

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-3">Track Your Order</h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto rounded-full mb-3"></div>
                    <p className="text-lg text-gray-600 font-semibold">Order ID: <span className="font-mono text-orange-600">#{orderId.slice(-8)}</span></p>
                </div>

                {/* Order Cards */}
                {currentOrder?.shopOrders?.map((shopOrder, idx) => (
                    <div key={idx} className="bg-white shadow-lg border border-orange-100 rounded-2xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        {/* Restaurant Header */}
                        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b-2 border-orange-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-1">{shopOrder.shop.restaurantName}</h2>
                                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full font-medium">
                                    🍽️ {shopOrder.shopOrderItems?.length || 0} items
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                <span className="text-xl font-bold text-white">🏪</span>
                            </div>
                        </div>

                        {/* Main Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Order Items & Price */}
                            <div className="space-y-4">
                                <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 shadow-sm">
                                    <h3 className="font-semibold text-base text-gray-800 mb-4 flex items-center gap-2">
                                        📦 Order Items
                                    </h3>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {shopOrder?.shopOrderItems?.map((item, itemIdx) => (
                                            <div key={itemIdx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-lg">🍲</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 text-sm">{item.item.dishname}</p>
                                                    <p className="text-xs text-gray-500">₹{item.item.price || 'N/A'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center shadow-sm">
                                    <p className="text-2xl font-bold text-emerald-700 mb-1">₹{shopOrder.subtotal}</p>
                                    <p className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Subtotal</p>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="space-y-4">
                                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                                    <h3 className="font-semibold text-base text-gray-800 mb-4 flex items-center gap-2">
                                        📍 Delivery Address
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="font-semibold text-gray-900 leading-relaxed text-sm">
                                            {currentOrder.deliveryAddress.text}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="mb-6">
                            {shopOrder.status === "delivered" ? (
                                <div className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-center rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <div className="text-3xl mb-3">✅</div>
                                    <h3 className="text-xl font-bold mb-1">Successfully Delivered!</h3>
                                    <p className="text-sm opacity-90">Your order has arrived safely</p>
                                </div>
                            ) : (
                                <div className="p-2 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl shadow-md">
                                    <h3 className="font-bold text-lg text-gray-800 mb-5 text-center flex items-center justify-center gap-2">
                                        🚚 Delivery Boy
                                    </h3>
                                    {shopOrder.assignDeliveryBoy ? (
                                        <div className="max-w-sm mx-auto text-center space-y-4">
                                            {/* Delivery Boy Avatar */}
                                            <div className="group relative">
                                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mx-auto shadow-xl ring-4 ring-white/50 hover:scale-110 transition-all duration-300 group-hover:shadow-2xl">
                                                    <img
                                                        src={shopOrder.assignDeliveryBoy.profileImage || Delivery_Boy}
                                                        alt={shopOrder.assignDeliveryBoy.fullname}
                                                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                                                    />
                                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">✓</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Name */}
                                            <h4 className="font-bold text-lg text-gray-800 leading-tight">
                                                {shopOrder.assignDeliveryBoy.fullname}
                                            </h4>

                                            {/* Phone */}
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl shadow-md border border-green-200 hover:shadow-lg transition-all duration-200">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="text-lg">📞</span>
                                                    <p className="text-sm font-semibold text-green-700 font-mono tracking-wide">
                                                        {shopOrder.assignDeliveryBoy.phone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6">
                                            <div className="text-4xl mb-4 animate-pulse">⏳</div>
                                            <h4 className="font-bold text-xl text-orange-600 mb-2">Awaiting Delivery Partner</h4>
                                            <p className="text-sm text-orange-600 max-w-md mx-auto">
                                                We'll assign a delivery boy soon. Hang tight!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Live Tracking */}
                        {shopOrder.assignDeliveryBoy && shopOrder.status !== "delivered" && (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-2xl border-2 border-blue-200 shadow-lg">
                                <h3 className="font-bold text-lg text-blue-800 mb-4 flex items-center justify-center gap-2">
                                    🗺️ Live Tracking
                                </h3>
                                <div className="rounded-xl overflow-hidden shadow-md border-2 border-white">
                                    <CustomerTracking order={
                                        {
                                            deliveryBoyLocation: liveLocation[shopOrder.assignDeliveryBoy._id] || {
                                                lat: shopOrder.assignDeliveryBoy.location.coordinates[1],
                                                long: shopOrder.assignDeliveryBoy.location.coordinates[0]
                                            },
                                            customerLocation: {
                                                lat: currentOrder.deliveryAddress.latitude,
                                                long: currentOrder.deliveryAddress.longitude
                                            }
                                        }
                                    } />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Empty State */}
                {!currentOrder?.shopOrders?.length && !loading && (
                    <div className="text-center py-20 max-w-md mx-auto">
                        <div className="text-6xl mb-6 opacity-30">📦</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Order Not Found</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            The order you're tracking doesn't exist or has been cancelled.
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            ← Back to Orders
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrackOrder