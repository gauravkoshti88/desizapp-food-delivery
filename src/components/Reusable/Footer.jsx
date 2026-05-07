import Logo from "../../assets/Logo.png";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-50/95 via-amber-50/95 to-red-50/95 backdrop-blur-sm shadow-lg border-t border-orange-200/50 py-3">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        
        {/* Logo */}
        <div 
          className="cursor-pointer group hover:scale-105 transition-all duration-300"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <img
            src={Logo}
            alt="DesiZapp Logo"
            className="w-24 h-auto object-contain drop-shadow-lg group-hover:drop-shadow-xl"
          />
        </div>

        {/* Social Icons - React Icons */}
        <div className="flex gap-5">
          <a href="#" className="w-12 h-12 bg-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 rounded-2xl flex items-center justify-center border border-orange-200/50 hover:border-orange-300 group">
            <FaInstagram className="w-7 h-7 text-pink-600 group-hover:text-pink-700" />
          </a>
          <a href="#" className="w-12 h-12 bg-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 rounded-2xl flex items-center justify-center border border-orange-200/50 hover:border-orange-300 group">
            <FaFacebookSquare className="w-7 h-7 text-blue-600 group-hover:text-blue-700" />
          </a>
          <a href="#" className="w-12 h-12 bg-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 rounded-2xl flex items-center justify-center border border-orange-200/50 hover:border-orange-300 group">
            <FaSquareXTwitter className="w-7 h-7 text-black group-hover:text-slate-800" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs font-medium text-slate-700 tracking-wide drop-shadow-sm">
          © {new Date().getFullYear()} DesiZapp-Foods. All rights reserved.
        </p>
      </div>
    </footer>
  );
}