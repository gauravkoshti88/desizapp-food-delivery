import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { SlCalender, SlCheck, SlHome, SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const DeliveredOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveredOrders = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/user/delivered-orders", {
        withCredentials: true,
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching delivered orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4 shadow-lg"></div>
          <p className="text-gray-700 font-semibold text-base">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-16">
      {/* Header with Back Button - Left Aligned */}
      <div className="px-4 pt-3 pb-3">
        <div className="flex items-center space-x-3 mb-3">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200 hover:shadow-md flex-shrink-0"
          >
            <SlArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Title & Count - Left Aligned */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md p-1.5">
              <SlCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
                Delivered Orders
              </h1>
              <p className="text-blue-700 font-medium text-xs">{orders.length} deliveries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 max-w-4xl mx-auto">
        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-xl p-8 text-center max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <SlCheck className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No deliveries yet</h3>
            <p className="text-gray-600 text-sm">Great job keeping things moving!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/90 backdrop-blur-sm border border-blue-200/60 rounded-xl shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-200 overflow-hidden"
              >
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex items-start sm:items-center space-x-2 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                        <SlHome className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base font-bold text-white truncate">
                          {order.customer?.fullname || "Customer"}
                        </h2>
                        <div className="flex items-center space-x-2 text-blue-100 text-xs mt-0.5 flex-wrap">
                          <span>₹{order.totalAmount}</span>
                          <span className="flex items-center">
                            <SlCalender className="w-3 h-3 mr-1" />
                            <span className="truncate">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-white/20 text-white text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                      Delivered
                    </span>
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-4">
                  {/* Payment & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide flex-shrink-0 mr-2">Payment</span>
                      <span className="font-semibold text-gray-900 text-sm capitalize truncate">{order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-xs text-gray-500 font-medium flex-shrink-0 mr-2">Time</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-gray-900 flex items-center mb-2">
                      Items Delivered 
                      <span className="ml-1 text-blue-600 font-semibold bg-blue-100 px-1.5 py-0.5 rounded text-xs">
                        {order.shopOrders.filter(so => so.status === "delivered").length}
                      </span>
                    </h3>
                    
                    {order.shopOrders
                      .filter((so) => so.status === "delivered")
                      .map((so) => (
                        <div key={so._id} className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/70 rounded-lg p-3">
                          {/* Restaurant */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 pb-1">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                              {so.shop?.restaurantName || "Restaurant"}
                            </h4>
                            <div className="flex items-center justify-between sm:justify-start mt-1 sm:mt-0">
                              <span className="text-xs text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded-full mr-2">
                                Delivered
                              </span>
                              <span className="text-xs text-gray-500 truncate">
                                {so.deliveredAt ? new Date(so.deliveredAt).toLocaleDateString() : "Recent"}
                              </span>
                            </div>
                          </div>
                          
                          {/* Items List */}
                          <div className="space-y-1.5 divide-y divide-blue-100">
                            {so.shopOrderItems.map((item) => (
                              <div key={item._id} className="flex justify-between items-center py-1.5 px-1 rounded hover:bg-white/60 transition-colors">
                                <div className="flex-1 min-w-0 pr-2">
                                  <div className="flex items-center">
                                    <span className="font-medium text-gray-900 text-xs truncate max-w-[80%]">{item.item.dishname}</span>
                                    <span className="text-gray-500 text-xs ml-1.5 flex-shrink-0">×{item.quantity}</span>
                                  </div>
                                </div>
                                <span className="font-bold text-blue-600 text-xs bg-blue-100 px-1.5 py-0.5 rounded">
                                  ₹{item.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveredOrders;