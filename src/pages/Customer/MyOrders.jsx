import { useDispatch, useSelector } from "react-redux";
import CustomerOrderCard from "../../components/Customer/CustomerOrderCard";
import ShopOrderCard from "../../components/FoodPartner/ShopOrderCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuPackageOpen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  setMyOrders,
  updateDeliveredStatus,
  updateRealtimeOrderStatus,
} from "../../redux/slices/userSlice";
import { getSocket } from "../../utils/socketService";

const MyOrders = () => {
  const { userData, myOrders } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = getSocket();
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    socket.on("newOrder", (data) => {
      if (data.shopOrders?.owner._id == userData._id) {
        dispatch(setMyOrders([data, ...myOrders]));
      }
    });

    socket.on("updateStatus", ({ orderId, shopId, status, userId }) => {
      if (userId === userData._id) {
        dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }));
      }
    });

    socket.on("delivered", ({ orderId, shopId, status, userId }) => {
      if (userId === userData._id) {
        dispatch(updateDeliveredStatus({ orderId, shopId, status }));
      }
    });

    socket.on(
      "acceptOrder",
      ({ orderId, shopId, status, userId, assignTo, acceptedAt }) => {
        dispatch(
          updateRealtimeOrderStatus({
            orderId,
            shopId,
            status,
            assignTo,
            acceptedAt,
          }),
        );
      },
    );

    return () => {
      socket?.off("newOrder");
      socket?.off("updateStatus");
      socket?.off("delivered");
      socket?.off("acceptOrder");
    };
  }, [socket, dispatch, myOrders, userData]);

  const normalizeShopOrders = (order) => {
    if (Array.isArray(order.shopOrders)) {
      return order.shopOrders;
    }
    if (order.shopOrders && typeof order.shopOrders === "object") {
      return [order.shopOrders]; // wrap single object into array
    }
    return [];
  };

  const filteredOrders = myOrders?.filter((order) => {
    const shopOrders = normalizeShopOrders(order);

    if (activeTab === "recent") {
      return shopOrders.some((so) => so.status !== "delivered");
    } else {
      return shopOrders.some((so) => so.status === "delivered");
    }
  });

  const orderCount =
    myOrders?.filter((order) =>
      Array.isArray(order.shopOrders)
        ? order.shopOrders.some((so) => so.status !== "delivered")
        : order.shopOrders?.status !== "delivered",
    ).length || 0;

  const tabs = [
    { id: "recent", label: "Recent", count: orderCount },
    { id: "delivered", label: "Delivered" },
  ];

  const renderEmptyState = () => {
    const isRecent = activeTab === "recent";
    const isCustomer = userData.role === "user";

    let title = "No orders yet";
    let message = isCustomer
      ? "You haven't placed any orders yet. Explore restaurants and place your first order."
      : "Once customers place orders at your shop, they'll appear here.";

    if (myOrders?.length > 0) {
      title = isRecent ? "No active orders" : "No delivered orders yet";
      message = isRecent
        ? "Orders that are still being prepared or delivered will show up here."
        : "Orders you've received will be listed here once they're delivered.";
    }

    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
          <LuPackageOpen size={28} />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-stone-500">{message}</p>
        {isCustomer && (
          <button
            onClick={() => navigate("/home")}
            className="mt-6 rounded-lg bg-orange-500 px-6 py-2.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            Explore food
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => navigate("/home")}
            aria-label="Back to home"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <IoIosArrowRoundBack size={28} />
          </button>
          <h1 className="text-lg font-bold sm:text-xl">My orders</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Order status"
          className="grid grid-cols-2 gap-1 rounded-xl bg-stone-200 p-1"
        >
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:text-base ${
                  selected
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Orders */}
        <div className="mt-6 space-y-4 sm:space-y-6">
          {filteredOrders?.length > 0
            ? filteredOrders.map((order, index) => {
                const shopOrders = normalizeShopOrders(order);

                return userData.role === "user" ? (
                  <CustomerOrderCard
                    order={{ ...order, shopOrders }}
                    key={order._id || index}
                  />
                ) : userData.role === "foodPartner" ? (
                  <ShopOrderCard
                    order={{ ...order, shopOrders }}
                    key={order._id || index}
                  />
                ) : null;
              })
            : renderEmptyState()}
        </div>
      </main>
    </div>
  );
};

export default MyOrders;
