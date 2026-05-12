import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { IoIosArrowRoundBack } from 'react-icons/io';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function ShopEarning() {
    const navigate = useNavigate();
    const { shopData } = useSelector(state => state.shop);
    const [earningData, setEarningData] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const visibleOrders = showAll ? earningData?.orders : earningData?.orders.slice(0, 5);

    useEffect(() => {
        const fetchEarning = async () => {
            let response = await axios.get(serverUrl + `/api/shop/earnings/${shopData._id}`, { withCredentials: true })
            setEarningData(response.data);
        }
        if (shopData?._id) fetchEarning();
    }, [shopData]);

    if (!earningData) return <p className="text-center mt-20">Loading earnings...</p>;

    // COD & ONLINE totals
    const codAmount = earningData.orders
        .filter(o => o.paymentMethod === "COD")
        .reduce((sum, o) => sum + o.totalAmount, 0);

    const onlineAmount = earningData.orders
        .filter(o => o.paymentMethod === "ONLINE")
        .reduce((sum, o) => sum + o.totalAmount, 0);

    // Bar Chart (Total Revenue + COD + Online)
    const barData = {
        labels: ["Total Revenue", "COD Amount", "Online Amount"],
        datasets: [
            {
                label: "Shop Earnings",
                data: [earningData.totalRevenue, codAmount, onlineAmount],
                backgroundColor: ["#6366F1", "#22C55E", "#3B82F6"], // purple, green, blue
                borderRadius: 8
            }
        ]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false, // ✅ responsive height
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Revenue, COD & Online Overview" }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    // Doughnut Chart (COD vs ONLINE)
    const doughnutData = {
        labels: ["COD Amount", "Online Amount"],
        datasets: [
            {
                data: [codAmount, onlineAmount],
                backgroundColor: ["#22C55E", "#3B82F6"], // green & blue
                borderColor: "#fff",
                borderWidth: 2
            }
        ]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false, // ✅ responsive height
        plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "COD vs Online Earnings" }
        }
    };

    return (
        <>
            <div
                onClick={() => navigate("/home")}
                className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl hover:scale-105 transition-all duration-200 shadow-md absolute top-3 left-3"
            >
                <IoIosArrowRoundBack size={24} className="text-orange-600" />
            </div>

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 sm:px-6 lg:px-8 pt-20">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
                        Shop Earnings
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Track your shop's revenue, orders, and growth with real-time analytics
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                    {/* Stats Cards */}
                    <div className="lg:col-span-2 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

                        {/* Total Revenue */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase">Total Revenue</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">₹{earningData.totalRevenue}</p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                                    <FaRupeeSign className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase">Total Orders</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{earningData.totalOrders}</p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                                    <FaShoppingCart className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="lg:col-span-2 xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-md h-64 sm:h-80">
                        <Bar data={barData} options={barOptions} />
                    </div>

                    {/* COD vs Online Doughnut */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-md h-64 sm:h-80 lg:col-span-1 xl:col-span-1">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-md">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Recent Orders</h3>

                <div className="space-y-3">
                    {visibleOrders.map((order) => (
                        <div
                            key={order._id}
                            className="flex items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-xs sm:text-sm">₹</span>
                            </div>

                            {/* Order Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                    Order #{order._id.slice(-5)}
                                </p>
                                <p className="text-xs text-gray-500">{order.customer?.email}</p>
                                <p className="text-xs text-gray-500 truncate">{order.deliveryAddress?.text}</p>
                            </div>

                            {/* Amount + Payment Method */}
                            <div className="text-right">
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                    ₹{order.totalAmount}
                                </p>
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${order.paymentMethod === "COD"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                        }`}
                                >
                                    {order.paymentMethod}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All / Show Less Button */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-full max-w-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                    >
                        {showAll ? "Show Less Orders" : "View All Orders"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ShopEarning;
