import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

function CartButton() {
    const navigate = useNavigate()
      const { cartItems } = useSelector(state => state.user)
    
    
    return (
        <button className="relative cursor-pointer mr-2 lg:mr-5" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="w-6 h-6 text-slate-700 hover:text-indigo-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length || 0}
            </span>
        </button>
    )
}

export default memo(CartButton)