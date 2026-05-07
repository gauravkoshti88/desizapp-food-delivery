import React, { useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { serverUrl } from '../../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../redux/slices/userSlice';
import { ClipLoader } from 'react-spinners';

function ShopOrderCard({ order }) {
    const [availableBoys, setAvailableBoys] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState();

    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            setLoading(true)
            const response = await axios.put(
                serverUrl + `/api/order/update-status/${orderId}/${shopId}`,
                { status },
                { withCredentials: true }
            );
            dispatch(updateOrderStatus({ orderId, shopId, status }));
            setAvailableBoys(response.data.availableBoys);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            confirm: 'bg-green-100 text-green-800 border-green-200',
            preparing: 'bg-blue-100 text-blue-800 border-blue-200',
            'out of delivery': 'bg-orange-100 text-orange-800 border-orange-200 animate-pulse',
            delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4 
      space-y-3 hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 group">

            {/* Customer Info */}
            <div className="space-y-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                <div className="flex items-start justify-between">
                    <h2 className="font-bold text-sm md:text-base bg-gradient-to-r from-gray-900 to-gray-700 
            bg-clip-text text-transparent truncate max-w-[70%]">
                        {order.customer.fullname}
                    </h2>
                    <div className={`px-2 py-0.5 rounded-full text-xs md:text-sm font-semibold border shadow-sm 
            ${getStatusColor(order.shopOrders.status)}`}>
                        {order.shopOrders.status?.replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                </div>
                <div className="text-xs md:text-sm flex items-center justify-between text-gray-500">
                    <div className='space-y-1'>
                        <p className="text-gray-500 truncate">{order.customer.email}</p>
                        <p className="flex items-center gap-1.5 text-gray-600">
                            <FaPhoneAlt className="w-3 h-3 text-blue-500 flex-shrink-0" />
                            <span className="truncate">{order.customer.phone}</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 justify-end">
                        <p className="text-sm text-blue-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 shadow-sm text-center font-bold">
                            {order.paymentMethod}
                        </p>
                        <p className={`text-sm bg-gray-50 px-4 py-1 rounded-lg border border-gray-200 shadow-sm font-bold ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                            {order.payment ? "Paid" : "Pending"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Address */}
            <div className="p-2 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
                <p className="flex items-start gap-1.5 text-xs md:text-sm text-gray-700 leading-relaxed">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="max-h-12 overflow-hidden">{order?.deliveryAddress?.text}</span>
                </p>
            </div>

            {/* Items */}
            <div className='space-y-2'>
                {order.shopOrders.map((shopOrder, index) => (
                    <div key={index} className='border border-amber-100 rounded-lg p-2.5 bg-gradient-to-br from-amber-50/80 to-orange-50/50 hover:bg-amber-50/90 transition-all duration-150 shadow-sm hover:shadow-md'>

                        {/* Shop Name */}
                        <div className='flex items-center space-x-2 mb-2 pb-1.5 border-b border-amber-200'>
                            <div className='w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full'></div>
                            <p className='font-semibold text-sm text-gray-800 truncate'>{shopOrder.shop.restaurantName}</p>
                        </div>

                        {/* Items */}
                        <div className='flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 -mb-2'>
                            {shopOrder.shopOrderItems.map((food, idx) => (
                                <div key={idx} className='flex-shrink-0 w-28 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-lg p-1.5 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 group'>
                                    <div className='relative overflow-hidden rounded-md mb-1.5'>
                                        <img
                                            src={food.item?.image?.url}
                                            alt={food?.item.dishname}
                                            className='w-full h-18 object-cover group-hover:scale-110 transition-transform duration-300'
                                        />
                                    </div>
                                    <p className='text-xs font-bold text-gray-900 line-clamp-2 leading-tight mb-0.5'>
                                        {food.item?.dishname}
                                    </p>
                                    <p className='text-xs text-gray-600 font-medium'>
                                        ₹{food.price} x {food.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Shop Subtotal */}
                        <div className='flex justify-between items-center pt-1.5 border-t border-amber-200'>
                            <p className='font-semibold text-sm text-gray-800'>
                                Total Amount: <span className='text-orange-600 font-bold text-base'>₹{shopOrder.subtotal}</span>
                            </p>
                            <div className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${getStatusColor(shopOrder.status)} border`}>
                                {shopOrder.status?.toUpperCase()}
                            </div>
                        </div>
                        {/* Status & Total */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white 
        rounded-b-xl -mx-3 px-3 pb-2 mt-1">
                            {/* Status Control */}
                            <div className="space-y-1">
                                {loading && <ClipLoader size={20}/>}
                                <label className="text-xs font-medium text-gray-600">Order Status</label>
                                <select
                                    className="w-full rounded-lg border-2 px-3 py-1.5 text-sm font-semibold 
                        focus:outline-none focus:ring-2 focus:ring-orange-400/50 
                        bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-orange-400 text-gray-800
                        disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-300"
                                    onChange={(e) => handleUpdateStatus(order._id, shopOrder.shop._id, e.target.value)}
                                    disabled={shopOrder?.status === "delivered"}
                                >
                                    <option value="">Change</option>
                                    <option value="pending">Pending</option>
                                    <option value="confirm">Confirm</option>
                                    <option value="preparing">Preparing</option>
                                    <option value="out of delivery">Out For Delivery</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                        {/* Delivery Boy Section */}
            {shopOrder?.status === "out of delivery" && (
                <div className="mt-3 p-4 rounded-xl border-2 border-orange-300 
    bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-100 
    shadow-lg space-y-3 animate-fadeIn">

                    {/* Header */}
                    {shopOrder.assignDeliveryBoy ? (
                        <h2 className="text-center text-md md:text-lg font-bold text-orange-700">
                            🚚 Assigned Delivery Boy
                        </h2>
                    ) : (
                        <p className="text-sm md:text-base font-semibold text-orange-600">
                            Available Delivery Boys:
                        </p>
                    )}

                    {/* Content */}
                    {availableBoys?.length > 0 ? (
                        availableBoys.map((b, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white/70 
          backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition">
                                <p className="text-gray-700 font-medium">{b.fullname}</p>
                                <p className="text-gray-500 text-sm">{b.phone}</p>
                            </div>
                        ))
                    ) : shopOrder.assignDeliveryBoy ? (
                        <div className="flex items-center justify-between bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                            <p className="font-semibold text-gray-700">
                                Name: <span className="text-sm text-gray-600">{shopOrder?.assignDeliveryBoy?.fullname}</span>
                            </p>
                            <p className="font-semibold text-gray-700">
                                Phone: <span className="text-sm text-gray-600">{shopOrder?.assignDeliveryBoy?.phone}</span>
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic text-center">⏳ Waiting for delivery boy to accept</p>
                    )}
                </div>
            )}
                    </div>
                ))}
            </div>

            {order?.shopOrders?.status === "delivered" && (
                <div className="mt-3 p-4 rounded-lg border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-100 shadow-md flex items-center justify-center">
                    <p className="text-green-700 font-bold text-sm md:text-base flex items-center gap-2">
                        ✅ Order Delivered Successfully
                    </p>
                </div>
            )}

        </div>
    );
}

export default ShopOrderCard;
