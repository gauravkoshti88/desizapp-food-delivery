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
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        serverUrl + `/api/food/remove-item/${id}`,
        { withCredentials: true }
      );
      dispatch(setShopData(response.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 w-full flex flex-col sm:flex-row h-auto sm:h-56 lg:h-60">
      
      {/* Image */}
      <div className="w-full sm:w-40 h-40 sm:h-full relative overflow-hidden flex-shrink-0 bg-gray-50">
        <img
          src={item.image.url}
          alt={item.dishname}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 px-5 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-between gap-4">
        
        {/* Text Info */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-2 group-hover:text-orange-600 transition-colors">
            {item.dishname}
          </h3>
          <div className="flex flex-row items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-slate-500 font-medium flex-wrap">
            <span className="capitalize">{item.category}</span>
            <span className="text-orange-400">|</span>
            <span>{item.foodType}</span>
          </div>
        </div>
        
        {/* Price + Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
            ₹{item.price}
          </p>
          <div className="flex flex-row items-center gap-5">
            {/* Edit */}
            <button
              className="p-2 lg:p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer shadow-sm hover:shadow-md"
              onClick={() => navigate(`/edit-food-item/${item._id}`)}
            >
              <FaRegEdit className="text-slate-600 hover:text-orange-600 w-5 h-5 lg:w-6 lg:h-6" />
            </button>

            {/* Delete */}
            <button
              className="p-2 lg:p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors cursor-pointer shadow-sm hover:shadow-md"
              onClick={() => handleRemoveItem(item._id)}
            >
              {loading ? (
                <ClipLoader size={20} color="#f97316" />
              ) : (
                <RiDeleteBin6Line className="text-slate-600 hover:text-red-600 w-5 h-5 lg:w-6 lg:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopItemCard;
