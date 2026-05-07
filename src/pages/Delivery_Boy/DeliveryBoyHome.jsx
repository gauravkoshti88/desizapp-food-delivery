import React, { useCallback, useEffect, useState } from "react";
import DeliveryLogo from "../../assets/delivery_logo.png";
import BoxImg from '../../assets/DaliveryBoy/box.png';
import OrdersImg from '../../assets/DaliveryBoy/checklist.png';
import EarningImg from '../../assets/DaliveryBoy/earnings.png';
import ProfileImg from '../../assets/DaliveryBoy/user.png';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../../App";
import { setUserData } from "../../redux/slices/userSlice";
import { FaSignOutAlt } from "react-icons/fa";
import AcceptOrderCard from "../../components/DeliveryBoy/AcceptOrderCard";
import DeliveryBoyTracking from "../../components/DeliveryBoy/DeliveryBoyTracking";
import NavigateButton from "../../components/Reusable/NavigateButton";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getSocket } from "../../utils/socketService";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function DeliveryBoyHome() {
  const [isOnline, setIsOnline] = useState(true);
  const { userData, city } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [availableAssign, setAvailableAssign] = useState([])
  const [currentOrder, setCurrentOrder] = useState(null)
  const [showMap, setShowMap] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [deliveryOtp, setDeliveryOtp] = useState("");
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState()
  const [todayDeliveries, setTodayDeliveries] = useState([])
  const socket = getSocket()

  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setDeliveryBoyLocation({ lat: latitude, long: longitude })
        socket.emit("updateLocation", {
          latitude,
          longitude,
          userId: userData._id
        })
      }), (error) => {
        toast.error("Watching Position ❌", {
          position: "top-right",
          style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
          autoClose: 4000,
        });
      }, {
        enableHighAccuracy: true
      }
    }
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    }
  }, [socket, userData])


  const ratePerDelivery = 45;
  const totalEarning = (todayDeliveries?.reduce((acc, curr) => acc + curr.count, 0) || 0) * ratePerDelivery;

  const getAssignments = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/order/get-assignment", { withCredentials: true })
      setAvailableAssign(response.data);
    } catch (error) {
      setAvailableAssign([])
    }
  }

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(serverUrl + "/api/auth/user/logout", {}, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const getCurrentOrder = async () => {
    try {
      const response = await axios.get(serverUrl + `/api/order/current-order`, { withCredentials: true });
      setCurrentOrder(response.data);
    } catch (error) {
      setCurrentOrder(null);
    }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      await axios.get(serverUrl + `/api/order/accept-order/${assignmentId}`, { withCredentials: true });
      await getCurrentOrder();
      await getAssignments();
    } catch (error) {
      toast.error("Order Not Accepted Try Again ❌", {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
        autoClose: 4000,
      });
    }
  }

  const handleWallet = () => {
    toast("You not verified to DesiZapp ❌", {
      position: "top-right",
      style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
      autoClose: 4000,
      transition: Bounce,
    });
  }

  // const handleSendOtp = async () => {
  //   try {
  //     const response = await axios.post(serverUrl + "/api/order/send-delivery-otp", { orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id }, { withCredentials: true });
  //     toast(`OTP Sent Successfully ✅`, {
  //       position: "top-right",
  //       style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
  //     });
  //     setShowOtpBox(true)
  //   } catch (error) {
  //     toast.error(`Resent OTP`, {
  //       position: "top-right",
  //       style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
  //     });
  //   }
  // }

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(serverUrl + "/api/order/verify-delivery-otp", { orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, deliveryOtp }, { withCredentials: true });
      navigate("/order-delivered")
    } catch (error) {
      toast.error(`Wrong OTP`, {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
      });
    }
  }

  useEffect(() => {
    socket.on("newAssignment", (data) => {
      if (data.sentTo == userData._id) {
        setAvailableAssign(prev => [...prev, data])
      }
    })
    return () => {
      socket?.off("newAssignment")
    }
  }, [socket])

  const handleTodayDeliveries = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/order/get-today-deliveries", { withCredentials: true });
      setTodayDeliveries(response.data)
    } catch (error) {
      setTodayDeliveries([])
    }
  }

  useEffect(() => {
    getAssignments()
    getCurrentOrder()
    handleTodayDeliveries()
  }, [userData])

  return (
    <>
      <div className="max-w-100 min-h-screen mx-auto flex flex-col bg-gradient-to-br from-orange-50 to-orange-100 relative">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        {/* Header */}
        <header className="w-full max-w-100 flex fixed top-0 justify-between items-center p-3 bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg rounded-b-xl border-b border-orange-200/50 mb-3 z-50">
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-white leading-tight">
              Hi, {userData.fullname?.split(" ")[0] || 'Delivery Boy'} !
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 bg-white/20 rounded-full px-2.5 py-1.5 border border-white/50 min-w-0">
              <FaLocationDot className="text-orange-200 text-xs flex-shrink-0" />
              <span className="font-semibold text-xs text-white truncate">{city}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full border border-white/50 hover:border-white/70 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 group"
              title="Logout"
            >
              <FaSignOutAlt className="text-white text-sm group-hover:text-orange-200 transition-colors duration-200" />
            </button>
          </div>
        </header>

        <main className="flex-1 space-y-3 px-2 mt-20 mb-30">
          {/* Current Order Card (when there's an active order) */}
          {currentOrder && !showMap && (
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200/60 rounded-2xl p-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-black bg-gradient-to-r from-blue-400 via-grren-600 to-purple-400 bg-clip-text text-transparent">
                  Current Order 📦
                </h2>
                {/* Navigate Button */}
                <div onClick={() => setShowMap(true)}>
                  <NavigateButton />
                </div>
                <span className="px-3 py-1 bg-orange-200 text-orange-800 text-xs font-bold rounded-full">
                  Active
                </span>
              </div>

              {/* Shop Details */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 mb-3 border border-orange-200/50">
                <h3 className="font-semibold text-orange-800 text-sm mb-1">🛒 Shop Details</h3>
                <p className="font-bold text-sm text-gray-800">{currentOrder.shop.restaurantName}</p>
                <p className="text-xs text-gray-600 mb-2 truncate">{currentOrder.shop.address}</p>
                <div className="flex items-center gap-2 text-xs text-orange-700 font-medium">
                  <span>{currentOrder.shopOrder.shopOrderItems.length} Items</span>
                  <span>•</span>
                  <span>₹{currentOrder.shopOrder.subtotal}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 mb-4 border border-orange-200/50">
                <h3 className="font-semibold text-orange-800 text-sm mb-1">👤 Customer</h3>
                <p className="font-bold text-sm text-gray-800">{currentOrder.customer.fullname}</p>
                <p className="text-xs text-gray-600 mb-1 truncate">{currentOrder.deliveryAddress.text}</p>
                <p className="text-xs text-orange-700 flex items-center gap-1">
                  📞 {currentOrder.customer.phone}
                </p>
              </div>
              {!showOtpBox ? (
                <button
                  onClick={() => handleVerifyOtp()}
                  className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  ✅ Mark As Delivered
                </button>
              ) : (
                <div className="mt-3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/50 shadow-xl">
                  <div className="flex items-center justify-center gap-2 mb-3 pb-2 border-b border-orange-200/30">
                    <p className="text-sm font-semibold text-orange-800">
                      Enter OTP sent to <span className="font-bold">{currentOrder.customer.fullname}</span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      maxLength="6"
                      name="deliveryOtp"
                      value={deliveryOtp}
                      onChange={(e) => setDeliveryOtp(e.target.value)}
                      className="w-full h-12 px-4 py-2 text-center text-lg font-bold bg-white border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100/50 focus:outline-none shadow-sm text-orange-800 placeholder:text-orange-400"
                      placeholder="Enter OTP"
                    />

                    <button
                      // onClick={() => handleVerifyOtp()}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                    >
                      Verify OTP
                    </button>

                    <button
                      type="button"
                      className="w-full text-xs text-orange-500 hover:text-orange-600 font-medium py-2 px-3 rounded-lg bg-orange-100 hover:bg-orange-100 border border-orange-200/50 transition-colors"
                      onClick={() => setShowOtpBox(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Available Orders (only show when no current order) */}
          {!currentOrder && (
            <AcceptOrderCard availableAssign={availableAssign} acceptOrder={acceptOrder} />
          )}

          {/* Progress Card */}
          <div className="bg-white p-3 rounded-xl shadow-md border border-orange-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mb-3 flex flex-col gap-3">
            <h1 className="text-sm font-black bg-gradient-to-r from-orange-700 via-orange-600 to-orange-800 bg-clip-text text-transparent">
              Today Deliveries
            </h1>
            <div className="border-b border-gray-300" />
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/70 to-orange-100/50 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={todayDeliveries} margin={{ top: 10, right: 15, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="70%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#fdf2f8"
                    vertical={false}
                    strokeOpacity={0.7}
                  />

                  <XAxis
                    dataKey='hour'
                    tickFormatter={(h) => `${h}:00`}
                    tick={{
                      fontSize: 12,
                      fontWeight: 600,
                      fill: '#64748b',
                      fontFamily: 'inherit'
                    }}
                    axisLine={true}
                    tickLine={true}
                    tickMargin={10}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fontSize: 11,
                      fill: '#94a3b8',
                      fontWeight: 500
                    }}
                    axisLine={true}
                    tickLine={true}
                    tickMargin={10}
                    width={30}
                  />

                  <Tooltip
                    formatter={(v) => [v, "orders"]}
                    labelFormatter={(l) => `${l}:00`}
                    contentStyle={{
                      borderRadius: '12px',
                      background: 'white',
                      border: '1px solid #f8fafc',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: '13px',
                      fontWeight: '600',
                      padding: '12px 16px'
                    }}
                    labelStyle={{
                      fontWeight: '700',
                      color: '#1e293b',
                      padding: '0'
                    }}
                  />

                  <Bar
                    dataKey="count"
                    fill="url(#barGrad)"
                    radius={[8, 8, 0, 0]}
                    barSize={26}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Today's Earning</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  ₹{totalEarning}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">+12%</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 max-w-100 mx-auto left-0 right-0 w-full px-4 py-3 bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50/80 backdrop-blur-sm shadow-xl border-t border-orange-200/50 rounded-t-xl z-50">
          <div className="max-w-sm mx-auto flex items-end justify-between gap-10">

            {/* Delivered */}
            <button className="w-full p-1.5 flex flex-col items-center gap-2 rounded-lg bg-gradient-to-t from-blue-300 to-blue-100 border-2 border-purple-300/80 shadow-md cursor-pointer -translate-y-0.5 relative z-10 active:scale-98" onClick={()=>navigate("/delivered-orders")}>
              <img src={OrdersImg} alt="Delivered" className="w-7 h-7 object-contain" />
            </button>

            {/* Wallet */}
            <button className="w-full h-23 p-1.5 flex flex-col items-center justify-center gap-2 cursor-pointer rounded-full bg-gradient-to-t from-blue-300 to-blue-500 border-5 active:scale-98 hover:bg-blue-600 border-purple-300/80 shadow-md -translate-y-0.5 relative z-10" onClick={handleWallet}>
              <img src={EarningImg} alt="Wallet" className="w-10 h-10 object-contain" />
            </button>

            {/* Profile - Active */}
            <button className="w-full p-1.5 flex cursor-pointer active:scale-98 flex-col items-center gap-2 rounded-lg bg-gradient-to-t from-blue-300 to-blue-100 border-2 border-purple-300/80 shadow-md -translate-y-0.5" onClick={() => navigate("/edit-profile")}>
              <img src={userData?.profileImage?.url || ProfileImg} alt="Profile" className="w-8 h-8 rounded-full object-cover ring-3 ring-slate-300" />
            </button>

          </div>
        </footer>
      </div>
      {/* Full Screen Map Overlay */}
      {showMap && currentOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <DeliveryBoyTracking info={currentOrder} order={{
            deliveryBoyLocation: deliveryBoyLocation || {
              lat: userData.location.coordinates[1],
              long: userData.location.coordinates[0]
            },
            customerLocation: {
              lat: currentOrder.deliveryAddress.latitude,
              long: currentOrder.deliveryAddress.longitude
            }
          }} setShowMap={setShowMap} />
        </div>
      )}
    </>
  );
}