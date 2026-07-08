'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface PromoSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

const promoSlides: PromoSlide[] = [
  {
    id: '1',
    title: 'Discover Radiance',
    subtitle: 'Curated Essentials',
    image: '/custom-slide1.jpg',
    cta: 'Shop Now',
  },
  {
    id: '2',
    title: 'Ultimate Hydration',
    subtitle: 'Meets Pure Formula',
    image: '/custom-slide2.png',
    cta: 'Explore Ingredients',
  },
  {
    id: '3',
    title: 'Serum Collection',
    subtitle: 'Natural Botanicals',
    image: '/custom-slide3.png',
    cta: 'Shop Serums',
  },
];

export default function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlay || !isMountedRef.current) return;

    const interval = setInterval(() => {
      if (isMountedRef.current) {
        setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    if (isMountedRef.current) {
      setCurrentSlide(index);
      setIsAutoPlay(false);
    }
  };

  const nextSlide = () => {
    if (isMountedRef.current) {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
      setIsAutoPlay(false);
    }
  };

  const prevSlide = () => {
    if (isMountedRef.current) {
      setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
      setIsAutoPlay(false);
    }
  };

  const toggleAutoPlay = () => {
    if (isMountedRef.current) {
      setIsAutoPlay((prev) => !prev);
    }
  };

  return (
    <div className="w-full bg-[#F9F5F0] py-4 md:py-6">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Aspect-ratio container — 5:2 matches standard widescreen banner dimensions */}
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{ aspectRatio: '5 / 2' }}
        >
          {/* Slides */}
          {promoSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 md:p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#3D3D3D]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 md:p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#3D3D3D]" />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {promoSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentSlide
                    ? 'bg-[#C87137] w-3 h-3'
                    : 'bg-white bg-opacity-60 hover:bg-opacity-80 w-2 h-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause Control */}
          <button
            onClick={toggleAutoPlay}
            className="absolute bottom-3 right-4 md:bottom-4 md:right-6 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full transition-all"
            aria-label={isAutoPlay ? 'Pause' : 'Play'}
          >
            {isAutoPlay ? (
              <Pause className="w-4 h-4 text-[#3D3D3D]" />
            ) : (
              <Play className="w-4 h-4 text-[#3D3D3D]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

