import React from 'react'
import { FcBusinessman } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { FcShop } from "react-icons/fc";

function ServiceSection() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent mb-6">
                    Our Services
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                    Complete food ecosystem for everyone
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Customers */}
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 
                  border border-orange-200 hover:border-orange-400 shadow-xl hover:shadow-2xl 
                  hover:-translate-y-4 transition-all duration-500 backdrop-blur-sm text-center">
                    <div className="flex justify-center items-center text-5xl mb-6 group-hover:scale-110 transition-transform">
                        <FcBusinessman />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Customers</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Order from favorite restaurants, watch food reels, track deliveries in real-time.
                    </p>
                </div>

                {/* Food Partners */}
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 
                  border border-orange-200 hover:border-orange-400 shadow-xl hover:shadow-2xl 
                  hover:-translate-y-4 transition-all duration-500 backdrop-blur-sm text-center">
                    <div className="flex justify-center items-center text-5xl mb-6 group-hover:scale-110 transition-transform">
                        <FcShop />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Food Partners</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Showcase menus with reels, manage orders, grow your business effortlessly.
                    </p>
                </div>

                {/* Delivery */}
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 
                  border border-orange-200 hover:border-orange-400 shadow-xl hover:shadow-2xl 
                  hover:-translate-y-4 transition-all duration-500 backdrop-blur-sm text-center">
                    <div className="flex justify-center items-center text-5xl mb-6 group-hover:scale-110 transition-transform">
                        <FcShipped />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Delivery</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Accept jobs, optimize routes, update status, earn more with every delivery.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ServiceSection
