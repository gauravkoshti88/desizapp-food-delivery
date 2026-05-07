import React from "react";
import Logo from "../assets/logo.png"; // adjust path if needed
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-white to-slate-100 px-6 pt-10">
      
      {/* Logo Header - Always Top Center */}
      <header className="mb-10 text-center w-full">
        <div className="flex justify-center">
          <img
            src={Logo}
            alt="DesiZapp Logo"
            className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 max-w-full h-auto drop-shadow-white"
          />
        </div>
        <p className="text-base text-slate-600 mt-2">
          Oops! Page not found.
        </p>
      </header>

      {/* Not Found Card - Alert Style */}
      <div className="w-full max-w-3xl bg-red-100 border border-red-400 rounded-2xl shadow-lg p-12 text-center">
        <h2 className="text-6xl font-bold text-red-700">404</h2>
        <p className="mt-6 text-lg text-red-600 font-medium">
          Sorry, the page you are looking for doesn’t exist.
        </p>

        <Link
          to="/home"
          className="mt-8 inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;