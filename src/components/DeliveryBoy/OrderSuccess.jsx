import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center bg-gradient-to-br from-orange-50 to-orange-100 relative">
      <div className="relative max-w-100 flex flex-col h-screen bg-gradient-to-br from-green-50 via-white to-green-100 items-center justify-center p-6 overflow-hidden">

        {/* Logo Animation */}
        <motion.img
          src={Logo}
          alt="App Logo"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-40 h-32 mb-8 drop-shadow-lg"
        />

        {/* Success Message */}
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6 z-10"
          role="status"
          aria-live="polite"
        >
          <CheckCircleIcon className="w-28 h-28 text-green-600 drop-shadow-lg" />
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl font-extrabold text-gray-800 text-center tracking-wide"
          >
            Order Delivered Successfully!
          </motion.p>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="mt-12 w-full max-w-xs bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 shadow-lg transition z-10"
        >
          Go To Home
        </motion.button>
      </div>
    </div>

  );
}

export default OrderSuccess;