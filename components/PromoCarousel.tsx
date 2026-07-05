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
    title: 'SPECIAL DISCOUNT',
    subtitle: 'UP TO 50% OFF',
    image: 'https://images.unsplash.com/photo-1631730486073-b7635bd45e5f?w=1200&h=500&fit=crop',
    cta: 'Valid Until 31st July',
  },
  {
    id: '2',
    title: 'SUMMER COLLECTION',
    subtitle: 'NEW ARRIVALS',
    image: 'https://images.unsplash.com/photo-1599599810694-b3ae3ac7b0f4?w=1200&h=500&fit=crop',
    cta: 'Shop Now',
  },
  {
    id: '3',
    title: 'EXCLUSIVE OFFER',
    subtitle: 'GET BEAUTY BUNDLE',
    image: 'https://images.unsplash.com/photo-1610601916025-404dbb551ce7?w=1200&h=500&fit=crop',
    cta: 'Limited Time Only',
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
    <div className="w-full bg-[#F9F5F0] py-6">
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 h-96 overflow-hidden rounded-xl">
        {/* Slides */}
        <div className="relative w-full h-full">
          {promoSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-start px-12">
                <div className="max-w-xl">
                  <h2 className="text-5xl md:text-6xl font-bold text-[#C87137] mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-6">
                    {slide.subtitle}
                  </p>
                  <div className="bg-[#C87137] text-white px-6 py-3 rounded-full inline-block font-semibold">
                    {slide.cta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#3D3D3D]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-[#3D3D3D]" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {promoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide
                  ? 'bg-[#C87137] w-3 h-3'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-70 w-2 h-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Control */}
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-6 right-6 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full transition-all"
          aria-label={isAutoPlay ? 'Pause' : 'Play'}
        >
          {isAutoPlay ? (
            <Pause className="w-5 h-5 text-[#3D3D3D]" />
          ) : (
            <Play className="w-5 h-5 text-[#3D3D3D]" />
          )}
        </button>
      </div>
    </div>
  );
}
