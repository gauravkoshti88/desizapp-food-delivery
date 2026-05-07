import axios from 'axios';
import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { serverUrl } from '../../App';
import { useDispatch } from 'react-redux';
import { setShopData } from '../../redux/slices/shopSlice';
import { ClipLoader } from 'react-spinners';

function ShopItemCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const handleRemoveItem = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(serverUrl+`/api/food/remove-item/${id}`,{withCredentials:true});
      dispatch(setShopData(response.data))
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl border hover:border-orange-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 w-full flex flex-row h-52 sm:h-56 lg:h-60">
      
      {/* Image - Fixed width */}
      <div className="w-32 sm:w-36 lg:w-40 h-full relative overflow-hidden flex-shrink-0 bg-gray-50">
        <img
          src={item.image.url}
          alt={item.dishname}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-row items-center justify-around gap-3 sm:gap-5 lg:gap-6">
        
        {/* Left - Text */}
        <div className="flex-1 pr-3">
          <h3 className="text-base sm:text-md lg:text-xl font-bold text-orange-600 line-clamp-2 mb-1 sm:mb-2">
            {item.dishname}
          </h3>
          <div className="flex flex-row items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-orange-600 font-semibold flex-wrap">
            <span className="capitalize">{item.category}</span>
            <span>|</span>
            <span>{item.foodType}</span>
          </div>
        </div>
        
        {/* Right - Price & Edit */}
        <div className="flex flex-row items-center gap-3 sm:gap-4 lg:gap-5 flex-shrink-0">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 whitespace-nowrap">
            ₹{item.price}
          </p>
          <button className="p-1.5 sm:p-2 lg:p-3 hover:bg-orange-50 rounded-lg transition-colors group-hover:bg-orange-100 flex-shrink-0 cursor-pointer" onClick={()=>navigate(`/edit-food-item/${item._id}`)}>
            <FaRegEdit className="text-slate-500 hover:text-orange-500 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>

          <button className="p-1.5 sm:p-2 lg:p-3 hover:bg-orange-50 rounded-lg transition-colors group-hover:bg-orange-100 flex-shrink-0 cursor-pointer" onClick={()=>handleRemoveItem(item._id)}>
              {loading?<ClipLoader size={20}/> : <RiDeleteBin6Line className="text-slate-500 hover:text-orange-500 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopItemCard;