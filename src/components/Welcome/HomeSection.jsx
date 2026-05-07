import React from 'react';

function HomeSection({scrollToSection}) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent mb-6 drop-shadow-lg">
        Welcome to DesiZapp
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-gray-800/95 font-semibold mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
        Discover amazing food. Watch reels. Order instantly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
        <button
          onClick={() => scrollToSection('services')}
          className="w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white text-lg font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border border-orange-400/50 drop-shadow-2xl"
        >
          Explore Services
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className="w-auto px-10 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-gray-800 text-lg font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/30 hover:border-white/50"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default HomeSection;