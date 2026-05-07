import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

function ContactSection() {
    return (
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent mb-8">
                Get In Touch
            </h2>
            <p className="text-xl text-slate-700 mb-12 max-w-2xl mx-auto">
                Ready to join the DesiZapp revolution? Let's talk!
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {/* Email */}
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 
                  border border-orange-200 hover:border-orange-400 hover:bg-orange-500/20 
                  transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-center">
                    <div className="flex justify-center items-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                        <MdEmail />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Email</h3>
                    <p className="text-slate-600 font-semibold">support@DesiZapp.com</p>
                </div>

                {/* Phone */}
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 
                  border border-orange-200 hover:border-orange-400 hover:bg-orange-500/20 
                  transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-center">
                    <div className="flex justify-center items-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                        <FaPhoneAlt />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Phone</h3>
                    <p className="text-slate-600 font-semibold">+91 98765 43210</p>
                </div>

                {/* Location */}
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 
                  border border-orange-200 hover:border-orange-400 hover:bg-orange-500/20 
                  transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-center">
                    <div className="flex justify-center items-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                        <MdLocationOn />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Location</h3>
                    <p className="text-slate-600 font-semibold">India 🇮🇳</p>
                </div>
            </div>
        </div>
    )
}

export default ContactSection
