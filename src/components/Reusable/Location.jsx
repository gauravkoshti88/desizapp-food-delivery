import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

function Location() {
    const { city } = useSelector(state => state.user)
  return (
    <div className="
      inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 
      rounded-2xl font-bold text-sm text-white shadow-lg shadow-orange-400/60
      ring-2 ring-orange-400/50 ring-offset-2 ring-offset-white scale-105 -translate-y-1
      hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/70
      active:scale-100 active:shadow-lg transition-all duration-300 cursor-pointer
    ">
      <div className="h-6 flex items-center justify-center">
        <FaLocationDot size={16} />
      </div>
      <span className='ml-2'>{city}</span>
    </div>
  )
}

export default Location
