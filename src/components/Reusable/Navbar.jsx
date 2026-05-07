import { FaRegEdit, FaSearch } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomerLogo from "../../assets/customer_logo.png";
import RestaurantLogo from "../../assets/restaurant_logo.png";
import DeliveryLogo from "../../assets/delivery_logo.png";
import userProfile from "../../assets/User.png";
import { FaBars } from "react-icons/fa";
import { useCallback } from "react";
import CartButton from "../Customer/CartButton";
import axios from "axios";
import { serverUrl } from "../../App";
import { setSearchItems, setUserData } from "../../redux/slices/userSlice";
import BottomNav from "./BottomBar";
import SideBar from "./SideBar";
import { BsPlusCircleFill } from "react-icons/bs";
import Location from "./Location";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const { userData, myOrders, city } = useSelector(state => state.user)
  const { shopData } = useSelector(state => state.shop)
  const [selected, setSelected] = useState()
  const [query, setQuery] = useState("")

  const orderCount = myOrders?.filter(order =>
    Array.isArray(order.shopOrders)
      ? order.shopOrders.some(so => so.status !== "delivered")
      : order.shopOrders?.status !== "delivered"
  ).length || 0

  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.post(serverUrl + "/api/auth/user/logout", {}, { withCredentials: true });
      dispatch(setUserData(null))
    } catch (error) {
      toast.error("Logout Error", {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
        autoClose: 4000,
      });
    }
  }, [dispatch]);

  const handleSearchItems = async () => {
    try {
      const response = await axios.get(serverUrl + `/api/food/search-items?query=${query}&city=${city}`, { withCredentials: true })

      dispatch(setSearchItems(response.data));

    } catch (error) {
      toast.error("No Items", {
        position: "top-right",
        style: { backgroundColor: "orange", color: "white", fontWeight: "bold" },
        autoClose: 4000,
      });
    }
  }

  useEffect(() => {
    if (query.length > 1) {
      handleSearchItems()
    } else {
      dispatch(setSearchItems(null))
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Navbar - Fixed Top */}
      <header className="hidden md:fixed md:top-0 md:left-0 md:right-0 md:w-full md:bg-white/90 md:backdrop-blur-sm md:shadow-sm md:border-b md:border-orange-200/30 md:z-50 px-3 md:flex md:items-center md:justify-between">

        {/* Logo */}
        <div className="cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate("/home")}>
          {userData.role === "user" && <img src={CustomerLogo} alt="Customer Logo" className="w-25 h-20" />}
          {userData.role === "foodPartner" && <img src={RestaurantLogo} alt="Restaurant Logo" className="w-25 h-20" />}
          {userData.role === "deliveryBoy" && <img src={DeliveryLogo} alt="Delivery Logo" className="w-25 h-20" />}
        </div>

        {/* Search */}
        {userData.role == "user" && <div className="flex-1 max-w-lg mx-6">
          <div className="relative bg-orange-50/80 rounded-xl px-4 py-2 border border-orange-200/50 hover:border-orange-300 transition-all">
            <input
              type="text"
              placeholder="Search food..."
              className="w-full pl-10 pr-4 py-1 bg-transparent outline-none text-slate-700 placeholder-slate-500 text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
          </div>
        </div>}

        {userData.role == "foodPartner" && shopData && <div className="flex items-center gap-4 max-w-2xl mx-auto">
          {/* My Orders - Tertiary */}
          <button
            onClick={() => { setSelected("orders"); navigate("/my-orders") }}
            className={`group flex items-center gap-1 px-3 py-2 rounded-2xl font-semibold relative text-sm tracking-tight
          transition-all duration-300
          ${selected === "orders"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                : "bg-white/80 text-slate-800 hover:text-slate-900 shadow-md hover:shadow-lg border border-slate-200/60 hover:border-slate-300/80"
              }`}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center">
              <MdReceiptLong size={18} />
            </div>
            <span>My Orders</span>
            <div className={`absolute -top-2 -right-2 text-xs font-bold min-w-[24px] h-6 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${selected === "orders"
              ? "bg-gray-500 text-white shadow-red-400/50 ring-2 ring-white/50"
              : "bg-gradient-to-br from-red-400/90 to-red-500/90 text-white shadow-red-400/40 hover:shadow-red-500/60"
              }`}>
              {orderCount}
            </div>
          </button>

          {/* Add Items - Primary Action */}
          <button
            onClick={() => { navigate("/add-food-item"); setSelected("add") }}
            className={`group flex items-center gap-1 px-3 py-2 rounded-2xl font-semibold text-sm tracking-tight
          transition-all duration-300 backdrop-blur-sm
          ${selected === "add"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                : "bg-white/80 text-slate-800 hover:text-slate-900 shadow-md hover:shadow-lg border border-amber-200/60 hover:border-amber-300/80"
              }`}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center">
              <BsPlusCircleFill size={20} />
            </div>
            <span>Add Items</span>
          </button>
        </div>}

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Location */}
          <div className="">
            <Location />
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              className="relative p-1.5 rounded-2xl bg-gradient-to-br from-slate-50 to-white/80
              shadow-md shadow-slate-200/50 hover:shadow-lg hover:shadow-slate-300/60 hover:bg-orange-50/60 hover:scale-[1.05] hover:-translate-y-px
              active:scale-98 active:shadow-sm transition-all duration-250 border border-slate-200/50 hover:border-orange-200/70"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img
                src={userData?.profileImage?.url || userProfile}
                alt="Profile"
                className="
                w-8 h-8 rounded-2xl object-cover shadow-md ring-2 ring-white/60
                hover:shadow-lg hover:shadow-orange-300/50 hover:ring-orange-400/50
                transition-all duration-300 hover:scale-110"
              />

              {/* Status Dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-70 bg-white rounded-xl shadow-lg border border-orange-200 py-2 z-50">
                {/* Profile */}
                <div className="flex items-center justify-between gap-3 py-2 bg-orange-500 text-white rounded-md px-2 cursor-pointer" onClick={() => navigate("/edit-profile")}>
                  <img src={userData?.profileImage?.url || userProfile} alt="Profile" className="w-10 h-10 rounded-full ring-3 ring-slate-300 object-cover " />
                  <div>
                    <p className="font-bold">{userData?.fullname || "User"}</p>
                    <p className="text-sm opacity-90">{userData?.email}</p>
                  </div>
                  <FaRegEdit size={20} className="text-blue-600" />
                </div>
                {userData.role == "foodPartenr" && <Link
                  to="/create-edit-shop"
                  className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 rounded-lg mx-1 transition-all relative"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Edit Shop
                  <FaRegEdit className="absolute left-21 top-2.5 text-blue-600" size={17} />
                </Link>}

                {/* Your Orders */}
                <Link
                  to="/my-orders"
                  className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 rounded-lg mx-1 transition-all"
                  onClick={() => { setShowProfileMenu(false) }}
                >
                  My Orders
                </Link>

                {/* Notifications */}
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 rounded-lg mx-1 transition-all"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Notifications
                </Link>

                {/* Help & Support */}
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 rounded-lg mx-1 transition-all"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Help & Support
                </Link>

                {/* Settings */}
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 rounded-lg mx-1 transition-all"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Settings
                </Link>

                {/* Reports */}
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 rounded-lg mx-1 transition-all"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Reports
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg mx-1 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {userData.role == "user" && <CartButton />}
        </div>
      </header>

      {/* Mobile Top Bar - Fixed Top */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-200/30 z-50 px-5 flex flex-col items-center justify-between">
        <div className="w-full flex items-center justify-between">
          <button onClick={() => setMenuOpen(true)} className="p-1 rounded-lg hover:bg-orange-50">
            <FaBars size={22} className="text-orange-600" />
          </button>

          {userData.role === "user" && <img src={CustomerLogo} alt="Customer Logo" className="w-20 h-20"
            onClick={() => navigate("/home")} />}
          {userData.role === "foodPartner" && <img src={RestaurantLogo} alt="Restaurant Logo" className="w-20 h-20"
            onClick={() => navigate("/home")} />}
          {userData.role === "deliveryBoy" && <img src={DeliveryLogo} alt="Delivery Logo" className="w-20 h-20"
            onClick={() => navigate("/home")} />}
          <Location />
          {userData.role == "user" && <CartButton />}
        </div>
        {userData.role == "user" && <div className="flex-1 w-full mb-3">
          <div className="relative bg-orange-50/80 rounded-xl px-4 py-2 border border-orange-200/50 hover:border-orange-300 transition-all">
            <input
              type="text"
              placeholder="Search food..."
              className="w-full pl-10 pr-4 py-1 bg-transparent outline-none text-slate-700 placeholder-slate-500 text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
          </div>
        </div>}
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <SideBar menuOpen={menuOpen} userData={userData} setMenuOpen={setMenuOpen} handleLogout={handleLogout} />

      {/* Mobile Bottom Nav - Fixed Bottom */}
      <BottomNav userData={userData} myOrders={myOrders} />
    </>
  );
}

export default Navbar;