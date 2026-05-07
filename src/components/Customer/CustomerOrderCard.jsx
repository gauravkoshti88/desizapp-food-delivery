import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../../App'
import { toast } from 'react-toastify'

function CustomerOrderCard({ order }) {

    const navigate = useNavigate()
    const [selectedRating, setSelectedRating] = useState({})

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }

    const handleRating = async (itemId, rating) => {
        try {
            const response = await axios.post(serverUrl + '/api/food/rating', { itemId, rating }, {
                withCredentials: true
            })
            setSelectedRating(prev => ({ ...prev, [itemId]: rating }))
        } catch (error) {
            toast.error("Rating Error", {
                position: "top-right",
                style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
            });
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'confirmed': 'bg-green-100 text-green-800 border-green-200',
            'preparing': 'bg-blue-100 text-blue-800 border-blue-200',
            'ready': 'bg-orange-100 text-orange-800 border-orange-200',
            'delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
            'cancelled': 'bg-red-100 text-red-800 border-red-200'
        }
        return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200'
    }

    return (
        <div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-3 space-y-2.5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5'>
            {/* Header */}
            <div className='flex justify-between items-start pb-1.5 border-b border-gray-100'>
                <div className='space-y-1 min-w-0'>
                    <p className='font-bold text-sm bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate'>
                        #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className='text-xs text-gray-500 flex items-center space-x-1'>
                        <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' />
                        </svg>
                        <span>{formatDate(order.createdAt)}</span>
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

            {/* Shop Orders */}
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
                                    {shopOrder.status === "delivered" && <div className='mt-1 flex justify-center'>
                                        {[1, 2, 3, 4, 5].map((star, idx) => (
                                            <button key={idx} className={`text-lg cursor-pointer ${selectedRating[food?.item?._id] >= star ? "text-yellow-400" : "text-gray-400"}`}
                                                onClick={() => handleRating(food.item._id, star)}
                                            >★</button>
                                        ))}
                                    </div>}
                                </div>
                            ))}
                        </div>

                        {/* Shop Subtotal */}
                        <div className='flex justify-between items-center pt-1.5 border-t border-amber-200'>
                            <p className='font-semibold text-sm text-gray-800'>
                                Sub: <span className='text-orange-600 font-bold text-base'>₹{shopOrder.subtotal}</span>
                            </p>
                            <div className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${getStatusColor(shopOrder.status)} border`}>
                                {shopOrder.status?.toUpperCase()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Total */}
            <div className='flex justify-between items-center pt-2 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-b-xl -mx-3 px-3 pb-2 mt-1'>
                <div className='space-x-2 flex items-center'>
                    <p className='font-bold text-sm text-gray-800'>Grand Total:</p>
                    <p className='font-black text-lg bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent tracking-tight'>
                        ₹{order.totalAmount}
                    </p>
                </div>

                <button className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm py-2 px-5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-orange-400/50 backdrop-blur-sm flex items-center space-x-1.5' onClick={() => navigate(`/track-order/${order._id}`)}>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7m6-3v13' />
                    </svg>
                    <span>Track</span>
                </button>
            </div>
        </div>
    )
}

export default CustomerOrderCard