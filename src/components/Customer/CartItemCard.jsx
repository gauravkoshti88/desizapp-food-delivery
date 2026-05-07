import React from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { useDispatch } from 'react-redux'
import { removeToCart, updateQuantity } from '../../redux/slices/userSlice'

function CartItemCard({ item }) {
  const dispatch = useDispatch()
  const handleIncrease=(id,currentQty)=>{
    dispatch(updateQuantity({id, quantity:currentQty+1}))
  }

  const handleDecrease=(id,currentQty)=>{
    dispatch(updateQuantity({id, quantity:currentQty-1}))
  }
  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-center border-b pb-4"
    >
      {/* Food Info */}
      <div className="flex items-center space-x-4 w-full sm:w-1/2">
        <img
          src={item.image}
          alt={item.dishname}
          className="w-24 h-24 rounded-lg object-cover shadow-md"
        />
        <div>
          <h2 className="font-semibold text-lg text-slate-800">
            {item.name}
          </h2>

          <p className="text-gray-500">
            ₹{item.price}x{item.quantity}
          </p>

          <p className="text-indigo-600 font-bold">
            ₹{item.price * item.quantity}
          </p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <button
          onClick={() =>handleDecrease(item.id,item.quantity)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          disabled={item.quantity <= 1}
        >
          <TiMinus size={12} />
        </button>

        <span className='text-sm'>{item.quantity}</span>

        <button
        onClick={() =>handleIncrease(item.id,item.quantity)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          <TiPlus size={12} />
        </button>

        <button
        onClick={()=> dispatch(removeToCart(item.id))}
          className="ml-4 text-red-600 hover:text-orange-600 active:scale-95 bg-orange-300 py-1 px-1 rounded-md font-medium"
        >
          <FaRegTrashCan size={15} />
        </button>
      </div>
    </div>
  )
}

export default CartItemCard
