import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/Carousel.css';

export const Carousel = ({ carouselSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full lg:flex-1 h-64 sm:h-80 lg:h-auto bg-[#0075BE] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="carousel-container flex w-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            width: `${carouselSlides.length * 100}%`,
          }}
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex items-center justify-center"
            >
              <div className="text-center text-white px-4 sm:px-8 lg:px-12 max-w-xs sm:max-w-md lg:max-w-lg">
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <img
                    src={slide.image || '/placeholder.svg'}
                    alt="Illustration"
                    className="w-32 h-24 sm:w-48 sm:h-36 lg:w-80 lg:h-60 mx-auto object-contain"
                  />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold mb-2 sm:mb-4 lg:mb-6 text-[#FAB900]">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed opacity-90">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronRight size={24} className="sm:w-8 sm:h-8" />
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-[#FAB900]' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
