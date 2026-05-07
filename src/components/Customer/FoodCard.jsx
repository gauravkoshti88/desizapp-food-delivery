import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { addToCart } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

function FoodCard({ food }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useSelector(state => state.user);

  const ratingValue = food.rating?.average || 1;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={`full-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={`half-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />);
      } else {
        stars.push(<FaStar key={`empty-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: food._id,
      name: food.dishname,
      price: food.price,
      image: food.image.url,
      shop: food.shop,
      quantity,
      foodType: food.foodType
    }))
    toast("Added to Cart", {
      position: "top-right",
      style: { backgroundColor: "orange", color: "white" },
    });
  }

  return (
    <div className="group relative w-full max-w-[280px] sm:max-w-[300px] mx-auto bg-white rounded-3xl border-2 border-[#ffae18]/20 shadow-lg hover:shadow-2xl hover:border-[#ffae18]/50 overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:scale-[1.02] flex flex-col">

      {/* Food Image */}
      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden rounded-2xl mx-2 sm:mx-3 mt-2 sm:mt-3">
        <img
          src={food.image.url}
          alt={food.dishname}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09L5.64 12.18.76 8.09l6.09-.88L10 2l3.15 5.21 6.09.88-4.88 4.09 1.518 5.91z" />
          </svg>
          <span>{food.rating.average >= 4 ? "Top Rated" : "Spacial"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-4 pb-5 sm:pb-6 flex flex-col">
        {/* Dish + Price */}
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 line-clamp-2 leading-tight pr-1 sm:pr-2">
            {food.dishname}
          </h3>
          <p className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent shrink-0">
            ₹{food.price}
          </p>
        </div>

        {/* Restaurant Info */}
        <div className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3 space-y-1">
          <p className="font-medium truncate">{food.shop.restaurantName}</p>
          <p className="flex items-center line-clamp-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {food.shop.address}
          </p>
        </div>

        {/* Rating + Quantity */}
        <div className="flex sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 gap-2 sm:gap-0">
          <div className="flex items-center bg-slate-100/50 px-2 py-1 rounded-lg space-x-1 min-w-0">
            <div className="flex items-center -space-x-0.5 flex-shrink-0">{renderStars(ratingValue)}</div>
            <span className="ml-1 font-medium text-slate-800 truncate">{ratingValue.toFixed(1)}</span>
            <span className="ml-1 text-slate-500">({food.rating.count})</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-1 sm:space-x-2 ml-auto">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed shadow-sm active:scale-95 transition-all duration-200 border border-slate-200 hover:border-slate-300 flex-shrink-0"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-9 sm:w-10 h-7 sm:h-8 flex items-center justify-center text-center font-bold text-sm sm:text-base text-slate-900 bg-white border-2 border-slate-200 rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800 shadow-sm active:scale-95 transition-all duration-200 border border-emerald-200 hover:border-emerald-300 flex-shrink-0"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="group/btn mt-auto w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 active:scale-95 active:shadow-md transition-all duration-200 border-2 border-transparent hover:border-indigo-500/50 flex items-center justify-center space-x-2"
          onClick={handleAddToCart}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l-1.5 4.5M16.5 13l1.5 4.5M17 13l1.5-4.5M12 13V6a1 1 0 012 0v7h-2z" />
          </svg>
          <span className="whitespace-nowrap">
            {cartItems.some(i => i.id === food._id)
              ? "Added"
              : `Add ${quantity > 1 ? `${quantity}x ` : ""}To Cart`}
          </span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(FoodCard);