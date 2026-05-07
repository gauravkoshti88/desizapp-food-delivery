import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


const Footer = () => {
    const socialLinks = [
        { name: "Instagram", href: "#", icon: <FaInstagram size={22} /> },
        { name: "Facebook", href: "#", icon: <FaFacebookSquare size={22} /> },
        { name: "Twitter", href: "#", icon: <FaSquareXTwitter size={22} /> },
    ];

    const quickLinks = [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "FAQs", href: "/faq" },
    ];

    return (
        <footer className="w-full relative overflow-hidden 
      bg-gradient-to-br from-orange-500/95 via-amber-500/70 to-red-500/95 
      backdrop-blur-xl border-t border-orange-400/40 shadow-2xl shadow-orange-500/25">

            {/* Background accents */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-orange-400/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-amber-400/30 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-10 lg:py-12">

                    {/* Brand */}
                    <div className="space-y-3">
                        <p className="text-sm text-white/95 font-semibold leading-tight drop-shadow-md">
                            Discover food. Order instantly.
                        </p>
                        <div className="flex space-x-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl 
                             border border-white/30 hover:border-white/50 hover:scale-110 
                             transition-all duration-300 shadow-lg hover:shadow-xl 
                             hover:shadow-orange-500/25"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="group text-sm text-white/90 hover:text-white font-medium py-1.5 px-2 
                               rounded-lg hover:bg-white/20 backdrop-blur-sm hover:shadow-lg 
                               hover:shadow-orange-500/20 hover:scale-105 hover:translate-x-1 
                               transition-all duration-300 block drop-shadow-md"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                            Contact
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="group flex items-center py-1">
                                <span className="w-6 h-6 bg-white/20 hover:bg-white/40 rounded-lg flex items-center justify-center mr-2 
                       group-hover:scale-110 transition-all duration-300 drop-shadow-md text-white">
                                    <MdEmail size={16} />
                                </span>
                                <span className="text-white/95 font-medium drop-shadow-md">support@DesiZapp.com</span>
                            </div>
                            <div className="group flex items-center py-1">
                                <span className="w-6 h-6 bg-emerald-400/20 hover:bg-emerald-400/40 rounded-lg flex items-center justify-center mr-2 
                       group-hover:scale-110 transition-all duration-300 drop-shadow-md text-white">
                                    <FaPhoneAlt size={14} />
                                </span>
                                <span className="text-white/95 font-medium drop-shadow-md">+91 98765 43210</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                            Stay Updated
                        </h3>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl 
                           text-white/95 placeholder-white/70 font-medium text-sm focus:outline-none 
                           focus:ring-2 focus:ring-orange-400/60 focus:border-white/50 transition-all 
                           duration-300 shadow-xl shadow-orange-500/20 hover:shadow-2xl"
                            />
                            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 
                                 hover:from-orange-400 hover:to-red-400 text-white px-4 py-1.5 rounded-lg 
                                 font-semibold text-sm shadow-lg hover:shadow-xl shadow-orange-500/30 
                                 hover:scale-105 transition-all duration-300 border border-white/30">
                                Go
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-5 pb-4 text-center">
                    <p className="text-white/80 text-xs font-semibold tracking-wide drop-shadow-md">
                        © {new Date().getFullYear()} DesiZapp App. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;