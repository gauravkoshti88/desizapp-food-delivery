import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { serverUrl } from '../../App';
import { FaStore } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import FoodCard from '../../components/Customer/FoodCard';
import { IoCart } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from 'react-icons/io';

function Shop() {
    const { shopId } = useParams()
    const navigate = useNavigate()
    const [items, setItems] = useState([]);
    const [shop, setShop] = useState()
    const { cartItems, userData } = useSelector(state => state.user);

    const fetchShop = async () => {
        try {
            const response = await axios.get(serverUrl + `/api/food/get-fooditems-by-shop/${shopId}`, { withCredentials: true })
            setShop(response.data.shop)
            setItems(response.data.items)
        } catch (error) {
            navigate("/server-error")
        }
    }

    useEffect(() => {
        fetchShop()
    }, [shopId])

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-5 left-5 p-2 bg-white shadow-md hover:shadow-lg rounded-xl hover:scale-105 transition-all duration-200 border border-gray-200 z-10"
            >
                <IoIosArrowRoundBack size={22} className="text-orange-600" />
            </button>

            {/* Shop Header */}
            {shop && (
                <div className='relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-b-3xl shadow-2xl pt-20 md:pt-24 lg:pt-28'>
                    <img
                        src={shop?.image?.url}
                        alt={shop?.restaurantName}
                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 flex flex-col justify-center items-center text-center px-4'>
                        <div className='w-20 h-20 bg-red-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-2xl border border-red-500/30'>
                            <FaStore className='text-white text-4xl drop-shadow-2xl' />
                        </div>
                        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>
                            {shop.restaurantName}
                        </h1>
                        <div className='flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20'>
                            <FaLocationDot size={24} color='#ef4444' className='drop-shadow-lg' />
                            <p className='text-lg md:text-xl font-semibold text-gray-100 drop-shadow-lg max-w-md'>
                                {shop.address}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Menu Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='text-center mb-5'>
                    <div className='inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-3xl shadow-xl mb-8 transform hover:scale-105 transition-all duration-300'>
                        <FaUtensils className='text-2xl' />
                        <h2 className='text-3xl md:text-4xl font-bold'>Our Menu</h2>
                    </div>
                </div>

                {/* Items Grid */}
                {items?.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
                        {items.map((item, idx) => (
                            <FoodCard
                                food={item}
                                key={item._id || idx}
                                className='transform hover:-translate-y-2 transition-all duration-300'
                            />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-24'>
                        <div className='w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center'>
                            <FaUtensils className='text-4xl text-gray-500' />
                        </div>
                        <h3 className='text-2xl md:text-3xl font-bold text-gray-700 mb-4'>No Items Available</h3>
                        <p className='text-lg text-gray-500 max-w-md mx-auto'>
                            We're working hard to bring you delicious items soon. Check back later!
                        </p>
                    </div>
                )}
            </div>

            {/* Loading Skeleton */}
            {!shop && (
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32 md:pt-40'>
                    <div className='animate-pulse'>
                        <div className='h-64 md:h-80 lg:h-96 bg-gray-300 rounded-b-3xl mb-12'></div>
                        <div className='space-y-12'>
                            <div className='h-12 bg-gray-300 rounded-xl w-64 mx-auto mb-8'></div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className='h-80 bg-gray-300 rounded-2xl'></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {userData.role == "user" && cartItems && (
                <div
                    className="fixed top-5 right-4 md:right-6 lg:right-8 z-50"
                    onClick={() => navigate("/cart")}
                >
                    <div className="group relative flex items-center gap-2.5 
                    bg-gradient-to-r from-orange-500 to-red-500 
                    hover:from-orange-600 hover:to-red-600 
                    backdrop-blur-xl shadow-2xl border border-orange-600/50 
                    px-4 py-2 rounded-3xl transition-all duration-300 
                    hover:shadow-3xl hover:-translate-y-1 active:translate-y-0 active:shadow-xl">

                        {/* Cart Icon */}
                        <IoCart
                            className="text-xl md:text-2xl text-white group-hover:scale-110 transition-all duration-300"
                        />

                        {/* Badge */}
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center 
                        text-xs font-bold text-orange-600 shadow-lg drop-shadow-md">
                                {cartItems?.length > 99 ? "99+" : cartItems?.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Shop