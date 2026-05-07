import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';

const images = [banner1, banner2, banner3];

const Slider = ({ slideTexts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="w-full py-16 px-6 lg:px-8 bg-gradient-to-br from-orange-50/70 via-white/80 to-red-50/70">
      <div className="w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left min-h-[300px] flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent mb-6 drop-shadow-xl">
            {slideTexts[currentIndex].title}
          </h3>
          <p className="text-lg md:text-xl text-slate-800 font-semibold leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 bg-white/90 px-6 py-4 rounded-2xl shadow-lg border border-orange-200/50">
            {slideTexts[currentIndex].description}
          </p>
        </div>

        {/* Image Slider */}
        <div className="relative w-full lg:w-1/2 h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-r from-orange-500/10 to-red-500/10">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`w-full h-full object-fit absolute inset-0 transition-all duration-1000 ${
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            />
          ))}

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-125 shadow-md'
                    : 'bg-white/70 hover:bg-orange-400 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;