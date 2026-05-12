import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import CartItemCard from "../../components/Customer/CartItemCard";

const CartPage = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-5 mb-5 sm:mb-0">
      <button
        onClick={() => navigate("/home")}
        className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md fixed top-3 left-3"
      >
        <IoIosArrowRoundBack size={24} className="text-orange-600" />
      </button>
      <div className={`max-w-4xl w-full ${cartItems.length == 0 ? "h-[600px]" : ""} bg-white shadow-lg rounded-lg p-4 sm:p-8 m-4`}>
        <h1 className="text-3xl text-center font-extrabold mb-6 text-indigo-700">
          🛒 Your Cart
        </h1>
        <hr className="mb-5" />

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-700 mb-3">Your Cart is Empty 🛒</h2>
            <p className="text-gray-500 text-center mb-6">
              Looks like you haven’t added anything yet.
              Browse shops and add your favorite items to see them here.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 
                 rounded-lg text-white font-semibold transition-all duration-300 cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item, idx) => (
                <CartItemCard item={item} key={item._id + "-" + idx} />
              ))}
            </div>

            {/* Summary Section */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6 shadow-inner">

              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Total:</h2>
                <p className="text-xl font-bold text-indigo-700">₹{totalAmount}</p>
              </div>
            </div>
            {/* Proceed Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/checkout")}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:scale-105 cursor-pointer"
              >
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;