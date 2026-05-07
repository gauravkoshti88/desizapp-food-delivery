import React, { useState } from "react";
import Logo from '../../assets/logo2.png'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ userData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="w-full 
      /* 🔥 DesiZapp THEME - Matching Footer */
      bg-gradient-to-r from-orange-500/95 via-amber-500/80 to-red-500/95 
      shadow-2xl backdrop-blur-xl sticky top-0 z-50 border-b border-orange-400/40 shadow-orange-500/30">

            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 group">
                        <img
                            src={Logo}
                            alt="DesiZapp Logo"
                            className="w-24 sm:w-28 md:w-32 lg:w-36 
                         hover:scale-110 transition-all duration-300 ease-out 
                         hover:drop-shadow-2xl filter"
                        />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
                        {[
                            { label: "Home", href: "#home" },
                            { label: "Services", href: "#services" },
                            { label: "About", href: "#about" },
                            { label: "Contact", href: "#contact" }
                        ]
                            .map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="group relative text-lg font-medium text-white/95 hover:text-white transition-all duration-300 ease-out px-3 py-2 rounded-full hover:bg-white/20 backdrop-blur-sm hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105 hover:-translate-y-1 drop-shadow-lg"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full group-hover:w-full transition-all duration-300 ease-out"></span>
                                </a>
                            ))}
                    </div>

                    {/* Desktop CTA Button */}

                    <div className="hidden lg:flex items-center space-x-4">
                        <button
                            className="px-6 py-1.5 bg-orange-200 hover:bg-orange-300 backdrop-blur-sm text-black font-semibold rounded-full border border-orange-300 hover:border-orange-400 shadow-xl hover:shadow-2xl hover:shadow-orange-300/30 hover:scale-105 transition-all duration-300 ease-out drop-shadow-2xl"
                            onClick={() => navigate("/login")}
                        >
                            {userData ? "Get Stated" : "Login"}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="group relative p-2 text-white/95 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl hover:shadow-orange-500/25"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                                {isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 stroke-white stroke-2 drop-shadow-md"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 stroke-white stroke-2 drop-shadow-md"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className="transition-all duration-300"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Matching Theme */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-out transform origin-top ${isOpen
                    ? 'max-h-96 opacity-100 scale-y-100'
                    : 'max-h-0 opacity-0 scale-y-95'
                    }`}
            >
                <div className="bg-gradient-to-b from-orange-500/95 via-amber-500/85 to-red-500/95 backdrop-blur-xl border-t border-white/20 shadow-2xl shadow-orange-500/30">
                    <div className="flex flex-col items-center space-y-1 py-6 px-4">
                        {[
                            { label: "Home", href: "#home" },
                            { label: "About", href: "#about" },
                            { label: "Services", href: "#services" },
                            { label: "Contact", href: "#contact" }
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="w-full group text-lg font-semibold text-white/95 hover:text-white px-6 py-4 rounded-2xl hover:bg-white/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 ease-out hover:translate-x-2 border-l-4 border-transparent hover:border-orange-400 drop-shadow-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <button className="mt-4 w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 ease-out border border-white/30 hover:border-white/50 drop-shadow-2xl" onClick={() => navigate("/login")}>
                            {userData ? "Get Stated" : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;