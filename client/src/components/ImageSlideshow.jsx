import React, { useRef, useState, useEffect, useCallback } from "react";


const ImageSlideshow = () => {
  // Array of images for the slideshow - using your existing images
  const images = [
    { src: "about_us.jpg", alt: "AppinSciences Innovation Hub" },
    { src: "about_us2.png", alt: "Team Meeting" },
    { src: "about_us3.png", alt: "Group Photo" },
    { src: "about_us4.png", alt: "Event Photo" }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  // Auto-advance slideshow
  const startSlideshow = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300);
    }, 4000); // Change image every 4 seconds
  }, [images.length]);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Manual navigation
  const goToSlide = useCallback((index) => {
    if (index !== currentImageIndex && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentImageIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    goToSlide(nextIndex);
  }, [currentImageIndex, images.length, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    goToSlide(prevIndex);
  }, [currentImageIndex, images.length, goToSlide]);

  // Start slideshow on mount
  useEffect(() => {
    startSlideshow();
    return () => stopSlideshow();
  }, [startSlideshow, stopSlideshow]);

  // Pause on hover, resume on leave
  const handleMouseEnter = () => stopSlideshow();
  const handleMouseLeave = () => startSlideshow();

  return (
    <div 
      className="relative overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image Container */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-all duration-700 ease-in-out
              ${index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
              }
              ${isTransitioning ? 'blur-sm' : 'blur-0'}
              group-hover:scale-110 group-hover:brightness-110
              group-hover:contrast-110
            `}
            style={{
              zIndex: index === currentImageIndex ? 2 : 1
            }}
          />
        ))}
      </div>

      {/* Enhanced Scan Lines */}
      <div className="
        absolute inset-0
        bg-[linear-gradient(transparent_50%,rgba(0,170,255,0.05)_50%)]
        bg-[size:100%_3px]
        animate-scan-rotate
        pointer-events-none
        z-10
      "></div>
      
      {/* Enhanced Glitch Overlay */}
      <div className="
        absolute inset-0
        bg-gradient-to-r from-transparent via-cyber-blue/15 to-transparent
        translate-x-full animate-glitch-slide
        pointer-events-none
        z-10
      "></div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="
          absolute left-4 top-1/2 transform -translate-y-1/2
          w-10 h-10 rounded-full
          bg-black/50 hover:bg-black/70
          border border-cyber-blue/50 hover:border-cyber-blue
          text-cyber-blue hover:text-cyan-400
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          flex items-center justify-center
          backdrop-blur-sm
          z-20
        "
        aria-label="Previous image"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 18L9 12L15 6V18Z" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="
          absolute right-4 top-1/2 transform -translate-y-1/2
          w-10 h-10 rounded-full
          bg-black/50 hover:bg-black/70
          border border-cyber-blue/50 hover:border-cyber-blue
          text-cyber-blue hover:text-cyan-400
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          flex items-center justify-center
          backdrop-blur-sm
          z-20
        "
        aria-label="Next image"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18L15 12L9 6V18Z" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="
        absolute bottom-4 left-1/2 transform -translate-x-1/2
        flex space-x-2
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        z-20
      ">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index === currentImageIndex
                ? 'bg-cyber-blue shadow-lg shadow-cyber-blue/60 scale-125'
                : 'bg-gray-500 hover:bg-gray-400'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="
        absolute top-4 right-4
        font-fira text-xs text-cyber-blue
        bg-black/70 px-3 py-1 rounded-md
        border border-cyber-blue/40
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        backdrop-blur-sm
        z-20
      ">
        {currentImageIndex + 1} / {images.length}
      </div>

      {/* Progress Bar */}
      <div className="
        absolute bottom-0 left-0 w-full h-1
        bg-gray-800/50
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        z-20
      ">
        <div 
          className="
            h-full bg-gradient-to-r from-cyber-blue to-cyan-400
            transition-all duration-300
            shadow-lg shadow-cyber-blue/60
          "
          style={{
            width: `${((currentImageIndex + 1) / images.length) * 100}%`
          }}
        />
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyber-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
    </div>
  );
};

export default ImageSlideshow;