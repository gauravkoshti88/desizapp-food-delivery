import React from 'react'
import { FaLocationArrow } from "react-icons/fa";

function NavigateButton() {
    return (
        <button
            type="button"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
        >
            <FaLocationArrow className="text-lg" />
        </button>
    )
}

export default NavigateButton
