import { useDispatch, useSelector } from "react-redux";
import CustomerOrderCard from "../../components/Customer/CustomerOrderCard";
import ShopOrderCard from "../../components/FoodPartner/ShopOrderCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setMyOrders, updateDeliveredStatus, updateRealtimeOrderStatus } from "../../redux/slices/userSlice";
import { getSocket } from "../../utils/socketService";

const MyOrders = () => {
  const { userData, myOrders } = useSelector(state => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const socket = getSocket();
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    socket.on("newOrder", (data) => {
      if (data.shopOrders?.owner._id == userData._id) {
        dispatch(setMyOrders([data, ...myOrders]));
      }
    })

    socket.on("updateStatus", ({ orderId, shopId, status, userId }) => {
      if (userId === userData._id) {
        dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }))
      }
    })

    socket.on("delivered", ({ orderId, shopId, status, userId }) => {
      console.log(orderId, shopId, userId, status);
      if (userId === userData._id) {
        dispatch(updateDeliveredStatus({ orderId, shopId, status }))
      }
    })

    socket.on("acceptOrder", ({ orderId, shopId, status, userId, assignTo, acceptedAt }) => {
      dispatch(updateRealtimeOrderStatus({ orderId, shopId, status, assignTo, acceptedAt }));
    });

    return () => {
      socket?.off("newOrder")
      socket?.off("updateStatus")
      socket?.off("delivered")
      socket?.off("acceptOrder")
    }
  }, [socket, dispatch, myOrders, userData])

  const normalizeShopOrders = (order) => {
    if (Array.isArray(order.shopOrders)) {
      return order.shopOrders;
    }
    if (order.shopOrders && typeof order.shopOrders === "object") {
      return [order.shopOrders]; // wrap single object into array
    }
    return [];
  };


  const filteredOrders = myOrders?.filter(order => {
    const shopOrders = normalizeShopOrders(order);

    if (activeTab === "recent") {
      return shopOrders.some(so => so.status !== "delivered");
    } else {
      return shopOrders.some(so => so.status === "delivered");
    }
  });

const orderCount = myOrders?.filter(order =>
        Array.isArray(order.shopOrders)
            ? order.shopOrders.some(so => so.status !== "delivered")
            : order.shopOrders?.status !== "delivered"
    ).length || 0


  // Show empty state when no orders available
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-orange-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {userData.role === "user"
          ? "You haven't placed any orders yet. Start exploring restaurants and place your first order!"
          : "No orders received yet. Once customers place orders at your shop, they'll appear here."
        }
      </p>
      <div className="flex gap-4">
        {userData.role === "user" && (
          <button
            onClick={() => navigate("/home")}
            className="px-8 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Explore Food
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        <div className="flex items-center justify-around gap-[20px] mb-6">
          <div
            onClick={() => navigate("/home")}
            className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md absolute top-3 left-3"
          >
            <IoIosArrowRoundBack size={24} className="text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-center">My Orders</h1>
        </div>

        <div className="flex justify-center mt-12 w-full">
          <div className="w-full max-w-2xl mx-4">
            <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl rounded-3xl p-1 relative overflow-hidden">
              {/* Active Indicator - Sliding Bar */}
              <div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-2xl shadow-lg transition-all duration-400 ease-out transform"
                style={{
                  left: activeTab === "recent" ? '1%' : '49%',
                  width: '50%'
                }}
              />

              <button
                onClick={() => setActiveTab("recent")}
                className="relative z-10 flex-1 px-6 py-3.5 font-semibold rounded-2xl transition-colors duration-300 hover:scale-[1.02]"
              >
                📦 Recent Orders
              </button>

              <button
                onClick={() => setActiveTab("delivered")}
                className="relative z-10 flex-1 px-6 py-3.5 font-semibold rounded-2xl transition-colors duration-300 hover:scale-[1.02]"
              >
                ✅ Delivered
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-10">
          {filteredOrders?.length > 0 ? (
            filteredOrders.map((order, index) => {
              const shopOrders = normalizeShopOrders(order);

              return userData.role === "user" ? (
                <CustomerOrderCard order={{ ...order, shopOrders }} key={order._id || index} />
              ) : userData.role === "foodPartner" ? (
                <ShopOrderCard order={{ ...order, shopOrders }} key={order._id || index} />
              ) : null;
            })
          ) : (
            renderEmptyState()
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;