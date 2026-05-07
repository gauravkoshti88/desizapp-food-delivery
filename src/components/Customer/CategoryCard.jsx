import React from "react";

function CategoryCard({name,image,onClick}) {
  return (
    <div className="relative w-[110px] h-[90px] sm:w-[150px] sm:h-[120px] md:w-[180px] md:h-[150px] lg:w-[220px] lg:h-[180px] rounded-xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay text */}
      <div className="absolute bottom-0 w-full bg-white/80 px-2 py-1 text-center text-xs sm:text-sm md:text-base font-semibold text-gray-800 backdrop-blur-md">
        {name}
      </div>
    </div>
  );
}

export default CategoryCard;