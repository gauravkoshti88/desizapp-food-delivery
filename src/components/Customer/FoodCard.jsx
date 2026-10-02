import { FaStar } from "react-icons/fa";
import {
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiCheck,
  FiMapPin,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { addToCart } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

function FoodCard({ food }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useSelector((state) => state.user);

  const ratingAverage = food.rating?.average || 0;
  const ratingCount = food.rating?.count || 0;
  const hasRating = ratingCount > 0 && ratingAverage > 0;
  const isTopRated = ratingAverage >= 4;
  const inCart = cartItems.some((i) => i.id === food._id);

  // Assumes foodType holds values like "veg" / "non-veg"; hidden if it isn't set.
  const foodType = food.foodType ? String(food.foodType).toLowerCase() : null;
  const isNonVeg = foodType ? foodType.includes("non") : false;

  const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: food._id,
        name: food.dishname,
        price: food.price,
        image: food.image.url,
        shop: food.shop,
        quantity,
        foodType: food.foodType,
      }),
    );
    toast("Added to cart", {
      position: "top-right",
      style: { backgroundColor: "orange", color: "white" },
    });
  };

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={food.image.url}
          alt={food.dishname}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {isTopRated && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
            Top rated
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        {/* Name + price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-2">
            {foodType && (
              <span
                aria-label={isNonVeg ? "Non-veg" : "Veg"}
                title={isNonVeg ? "Non-veg" : "Veg"}
                className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ${
                  isNonVeg ? "border-red-600" : "border-green-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isNonVeg ? "bg-red-600" : "bg-green-600"}`}
                />
              </span>
            )}
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-stone-900">
              {food.dishname}
            </h3>
          </div>
          <p className="shrink-0 text-lg font-extrabold text-orange-600">
            ₹{food.price}
          </p>
        </div>

        {/* Shop + rating */}
        <div className="space-y-1 text-sm text-stone-500">
          <p className="truncate font-medium text-stone-700">
            {food.shop?.restaurantName}
          </p>
          {food.shop?.address && (
            <p className="flex items-center gap-1 text-xs">
              <FiMapPin className="shrink-0" size={12} />
              <span className="line-clamp-1">{food.shop.address}</span>
            </p>
          )}
          <p className="flex items-center gap-1 text-xs">
            {hasRating ? (
              <>
                <FaStar className="text-amber-400" size={12} />
                <span className="font-semibold text-stone-800">
                  {ratingAverage.toFixed(1)}
                </span>
                <span>({ratingCount})</span>
              </>
            ) : (
              <span>No ratings yet</span>
            )}
          </p>
        </div>

        {/* Quantity + add to cart */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <div
            role="group"
            aria-label="Quantity"
            className="flex shrink-0 items-center rounded-lg border border-stone-200 bg-stone-50"
          >
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center rounded-l-lg text-stone-700 transition hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:text-stone-300 disabled:hover:bg-transparent"
            >
              <FiMinus size={14} />
            </button>
            <span
              aria-live="polite"
              className="w-7 text-center text-sm font-bold"
            >
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center rounded-r-lg text-stone-700 transition hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <FiPlus size={14} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
              inCart
                ? "border border-orange-500 bg-orange-50 text-orange-700 hover:bg-orange-100"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {inCart ? (
              <FiCheck size={16} className="shrink-0" />
            ) : (
              <FiShoppingCart size={16} className="shrink-0" />
            )}
            <span className="truncate">{inCart ? "Added" : "Add to cart"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default React.memo(FoodCard);
