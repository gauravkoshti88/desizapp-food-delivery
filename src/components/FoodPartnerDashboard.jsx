import React from 'react'
import Navbar from './Reusable/Navbar'
import { useSelector } from 'react-redux'
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ShopItemCard from './FoodPartner/ShopItemCard';

function FoodPartnerDashboard() {
  const navigate = useNavigate();
  const { shopData } = useSelector(state => state.shop);

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8'>
      <Navbar />

      {!shopData &&
        <div className='flex justify-center items-center mt-16 w-full max-w-4xl mx-auto'>
          <div className='w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 lg:p-10 border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2'>
            <div className='flex flex-col items-center text-center space-y-6'>
              <FaUtensils className='text-orange-500 w-16 h-16 lg:w-20 lg:h-20 bg-orange-100 p-4 rounded-2xl shadow-xl' />
              <h2 className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent'>
                Add Your Restaurant
              </h2>
              <p className='text-base lg:text-lg text-slate-600 leading-relaxed max-w-md'>
                Grow your business with us — deliver food to thousands of hungry customers every single day.
              </p>
              <button
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-base lg:text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 active:scale-95"
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      }

      {shopData &&
        <div className="w-full max-w-6xl mx-auto mt-15 space-y-7 lg:space-y-8 mb-15 sm:mb-10">
          {/* Header */}
          <div className="flex flex-col items-center lg:items-center gap-5 transition-all duration-500">
            <FaUtensils className="text-orange-500 w-12 h-12 lg:w-14 lg:h-14" />
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 bg-clip-text leading-tight">
                Welcome to {shopData.restaurantName}
              </h1>
              <p className="text-base text-center lg:text-lg text-slate-600 mt-2 font-medium">Manage your restaurant dashboard</p>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/50 bg-gradient-to-r from-slate-50 via-white to-orange-50/50">
            <img
              src={shopData?.image?.url}
              alt={shopData.restaurantName}
              className="w-full h-auto max-h-[400px] lg:max-h-[500px] object-contain sm:object-cover hover:brightness-110 transition-all duration-700 cursor-zoom-in"
            />
            <div className="p-10 bg-gradient-to-r from-slate-50/90 to-white/90 backdrop-blur-sm">
              {/* Restaurant Name */}
              <h2 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
                {shopData.restaurantName}
              </h2>

              {/* City & State */}
              <p className="text-lg text-slate-700 mb-2">
                {shopData.city}, {shopData.state}
              </p>

              {/* Address */}
              <p className="text-base text-slate-600 leading-relaxed">
                {shopData.address}
              </p>
            </div>
          </div>

          {/* Food Items */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-6 lg:p-10 hover:shadow-3xl transition-all duration-500">
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text mb-10 lg:mb-12 flex items-center gap-3">
              <span className="w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></span>
              Food Items
            </h2>

            {shopData.foodItems && shopData.foodItems.length > 0 ? (
              <div className="flex flex-col items-center gap-4 w-full">
                {shopData.foodItems.map((item, index) => (
                  <ShopItemCard item={item} key={index+"-"+item._id} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-dashed border-orange-200">
                <FaUtensils className="text-orange-400 w-16 h-16 mb-6 opacity-60" />
                <p className="text-xl lg:text-2xl font-semibold text-slate-500 mb-2">
                  No food items available
                </p>
                <p className="text-slate-500 text-sm lg:text-base mb-6">
                  Add some delicious items to get started!
                </p>

                {/* Add Food Button */}
                <button
                  type="button"
                  onClick={() => navigate("/add-food-item")}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                >
                  + Add Food
                </button>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default FoodPartnerDashboard