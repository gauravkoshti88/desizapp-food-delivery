import { useLocation, useNavigate } from "react-router-dom";
import { GiShoppingBag, GiCardboardBoxClosed } from "react-icons/gi";
import { FaStore, FaClipboardList } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdAddCircleOutline } from "react-icons/md";
import userProfile from "../../assets/User.png";
import Grocery from "../../assets/grocery.png";
import { GiTwoCoins } from "react-icons/gi";

export default function BottomBar({ userData, myOrders }) {
    const location = useLocation();
    const navigate = useNavigate();

    const orderCount = myOrders?.filter(order =>
      Array.isArray(order.shopOrders)
        ? order.shopOrders.some(so => so.status !== "delivered")
        : order.shopOrders?.status !== "delivered"
    ).length || 0
    
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full h-20 bg-white/95 backdrop-blur-md shadow-lg border-t border-slate-200/50 z-50 px-2 py-3">
            <div className="flex items-end justify-between h-full mx-auto">

                {/* Home / Shop */}
                <button
                    onClick={() => navigate("/home")}
                    className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 h-full flex-1
            ${isActive("/home")
                            ? "text-orange-600 scale-105"
                            : "text-slate-600 hover:text-orange-500 hover:bg-slate-100/50 hover:scale-105 active:scale-95"}
          `}
                >
                    <div className={`w-10 h-10 flex items-center justify-center mb-1 rounded-xl 
            ${isActive("/home") ? "bg-orange-100" : "bg-slate-100 hover:bg-orange-50"}`}>
                        {userData.role === "user" ? (
                            <GiShoppingBag size={24} />
                        ) : (
                            <FaStore size={24} />
                        )}
                    </div>
                    <span className="text-xs font-medium">Home</span>
                    {isActive("/home") && (
                        <div className="absolute -bottom-2 w-full h-1 bg-orange-500 shadow-md" />
                    )}
                </button>

                {/* Explore / Items */}
                {userData.role === "user" ? (
                    <button
                        onClick={() => navigate("/zapp-shorts")}
                        className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 h-full flex-1
              ${isActive("/zapp-shorts")
                                ? "text-orange-600 scale-105"
                                : "text-slate-600 hover:text-orange-500 hover:bg-slate-100/50 hover:scale-105 active:scale-95"}
            `}
                    >
                        <div className={`w-10 h-10 flex items-center justify-center mb-1 rounded-xl 
              ${isActive("/zapp-shorts") ? "bg-orange-100" : "bg-slate-100 hover:bg-orange-50"}`}>
                            <SiYoutubeshorts size={24} />
                        </div>
                        <span className="text-xs font-medium">ZappShots</span>
                        {isActive("/zapp-shorts") && (
                            <div className="absolute -bottom-2 w-full h-1 bg-orange-500 shadow-md" />
                        )}
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/earning")}
                        className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 h-full flex-1
              ${isActive("/earning")
                                ? "text-orange-600 scale-105"
                                : "text-slate-600 hover:text-orange-500 hover:bg-slate-100/50 hover:scale-105 active:scale-95"}
            `}
                    >
                        <div className={`w-10 h-10 flex items-center justify-center mb-1 rounded-xl 
              ${isActive("/earning") ? "bg-orange-200" : "bg-slate-100 hover:bg-orange-50"}`}>
                            <GiTwoCoins size={24} color="#FFD700" />

                        </div>
                        <span className="text-xs font-medium">Earning</span>
                        {isActive("/earning") && (
                            <div className="absolute -bottom-2 w-full h-1 bg-orange-500 shadow-md" />
                        )}
                    </button>
                )}

                {/* Add Item FAB (Food Partner only) */}
                {userData.role === "foodPartner" ? (
                    <button
                        onClick={() => navigate("/add-food-item")}
                        className="relative flex flex-col items-center p-2 mx-2 h-16 rounded-2xl bg-orange-500 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200"
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <MdAddCircleOutline size={28} />
                        </div>
                        <span className="text-xs font-medium mt-1">Add</span>
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/grocery")}
                        className={`flex flex-col items-center rounded-xl transition-all duration-200 h-full flex-1 px-2`}
                    >
                        <div className={`w-20 h-20 flex items-center justify-center absolute -top-7 bg-gray-200 hover:bg-amber-300 border-5 border-orange-300 rounded-full hover:scale-105`}>
                            <img src={Grocery} alt="grocery" className="w-35 h-35 pt-7" />
                        </div>
                        <span className="text-md font-medium absolute bottom-1">Grocery</span>
                        {isActive("/grocery") && (
                            <div className="absolute -bottom-2 w-full h-1 bg-orange-500 shadow-md" />
                        )}
                    </button>
                )}

                {/* Instamart / Orders */}

                <button
                    onClick={() => navigate("/my-orders")}
                    className={`flex flex-col items-center relative p-2 rounded-xl transition-all duration-200 h-full flex-1
    ${isActive("/my-orders")
                            ? "text-orange-600 scale-105"
                            : "text-slate-600 hover:text-orange-500 hover:bg-slate-100/50 hover:scale-105 active:scale-95"}
  `}
                >
                    {/* Icon wrapper with badge */}
                    <div
                        className={`relative w-10 h-10 flex items-center justify-center mb-1 rounded-xl 
      ${isActive("/my-orders") ? "bg-orange-200" : "bg-slate-100 hover:bg-orange-50"}`}
                    >
                        <GiCardboardBoxClosed size={24} color="#DD9E10"/>
                        {/* Badge always top-right */}
                        <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[12px] px-1.5 py-0.5 rounded-full">
                            {orderCount}
                        </span>
                    </div>

                    {/* Label */}
                    <p className="text-xs font-medium">Orders</p>

                    {/* Active indicator dot */}
                    {isActive("/my-orders") && (
                        <div className="absolute -bottom-2 w-full h-1 bg-orange-500 shadow-md" />
                    )}
                </button>


                {/* Profile */}
                <button
                    onClick={() => navigate("/edit-profile")}
                    className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 h-full flex-1
            ${isActive("/profile")
                            ? "text-orange-600 scale-105"
                            : "text-slate-600 hover:text-orange-500 hover:bg-slate-100/50 hover:scale-105 active:scale-95"}
          `}
                >
                    <div className={`w-10 h-10 flex items-center justify-center mb-1 rounded-xl 
            ${isActive("/edit-profile") ? "bg-orange-100" : "bg-slate-100 hover:bg-orange-50"}`}>
                        <img
                            src={userData?.profileImage?.url || userProfile}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover ring-3 ring-slate-300"
                        />
                    </div>
                    <span className="text-xs font-medium">Profile</span>
                    {isActive("/edit-profile") && (
                        <div className="absolute -bottom-2 w-full h-1 bg-orange-500 shadow-md" />
                    )}
                </button>
            </div>
        </nav>
    );
}