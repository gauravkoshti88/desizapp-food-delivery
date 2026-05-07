import React from 'react'
import { motion } from 'framer-motion'
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function OrderPlaced() {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center p-8'>
      {/* Animated Checkmark Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 border-8 border-green-300'
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
          className='text-4xl'
        >
          <FaCircleCheck className='w-16 h-16 text-green-400 transition duration-300' />
        </motion.span>
      </motion.div>

      {/* Title */}
      <motion.h1 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight'
      >
        Order Placed!
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className='text-xl md:text-2xl text-gray-600 font-medium max-w-md text-center mb-12 leading-relaxed'
      >
        Your order has been successfully placed! We'll notify you once it's ready for delivery.
      </motion.p>

      {/* Animated Button */}
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 20px 40px rgba(6, 78, 59, 0.3)",
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        onClick={() => navigate("/my-orders")}
        className='px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-lg rounded-xl shadow-xl hover:from-orange-400 hover:to-orange-500 cursor-pointer transition-all duration-300 transform-gpu'
      >
        Back to My Orders
      </motion.button>

      {/* Floating particles for extra magic */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: [null, 100, -50, 80],
            opacity: [0, 0.3, 0.2, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatDelay: 2 
          }}
          className='absolute top-20 left-10 w-3 h-3 bg-emerald-300/50 rounded-full blur-sm'
        />
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ 
            x: [null, -80, 50, -100],
            opacity: [0, 0.4, 0.2, 0.4]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            delay: 1,
            repeatDelay: 3 
          }}
          className='absolute bottom-32 right-20 w-2 h-2 bg-green-400/60 rounded-full blur-sm'
        />
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: [null, -60, 30, -80],
            opacity: [0, 0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            delay: 2,
            repeatDelay: 4 
          }}
          className='absolute top-1/2 left-1/4 w-4 h-4 bg-emerald-200/40 rounded-full blur-sm'
        />
      </div>
    </div>
  )
}

export default OrderPlaced