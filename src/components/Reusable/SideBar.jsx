import React from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { MdHelpOutline, MdOutlineSettings } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaRegEdit, FaStore, FaTimes } from "react-icons/fa";
import userProfile from "../../assets/User.png";
import { Link, useNavigate } from 'react-router-dom';

function SideBar({ userData, menuOpen, setMenuOpen, handleLogout }) {
  const navigate = useNavigate()
  return (
    <div
      className={`md:hidden fixed top-0 left-0 h-screen w-72 
                  bg-gradient-to-b from-orange-500 to-yellow-500 
                  text-white font-semibold shadow-2xl z-60 
                  transform transition-transform duration-300 
                  ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-orange-400/50 flex items-center justify-between">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="cursor-pointer">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Profile */}
          <div className="flex items-center justify-between gap-3 py-2 bg-white/10 rounded-xl px-2 cursor-pointer" onClick={() => navigate("/edit-profile")}>
            <img
              src={userData?.profileImage?.url || userProfile}
              alt="Profile"
              className="w-10 h-9 rounded-full object-cover ring-3 ring-slate-300"
            />
            <div>
              <p className="font-bold">{userData?.fullname || "User"}</p>
              <p className="text-sm opacity-90">{userData?.email}</p>
            </div>
            <FaRegEdit size={20}/>
          </div>

          {/* Edit Shop */}
          {userData.role == "foodPartner" && (
            <Link
              to="/create-edit-shop"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/35 hover:bg-white/20 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <FaStore className="w-5 h-5 text-blue-500" />
              </div>
              Edit Shop
            </Link>
          )}

          {/* Orders */}
  
            <Link
              to="/my-orders"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/35 hover:bg-white/20 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <GiCardboardBoxClosed className="w-5 h-5 text-orange-500" />
              </div>
              My Orders
            </Link>
  

          {/* Notifications */}
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/35 hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <IoNotificationsOutline className="w-5 h-5 text-blue-500" />
            </div>
            Notifications
          </Link>

          {/* Help & Support */}
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/35 hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <MdHelpOutline className="w-5 h-5 text-green-500" />
            </div>
            Help & Support
          </Link>

          {/* Settings */}
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/35 hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <MdOutlineSettings className="w-5 h-5 text-purple-500" />
            </div>
            Settings
          </Link>

          {/* Reports */}
          <Link
            to="#"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/35 hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <HiOutlineDocumentReport className="w-5 h-5 text-red-500" />
            </div>
            Reports
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500 border-2 border-[#c4b0b0] hover:bg-red-500/40 text-white transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <TbLogout className="w-5 h-5 text-red-400" />
            </div>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;