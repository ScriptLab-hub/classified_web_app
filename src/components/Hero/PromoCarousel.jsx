import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const PromoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('sponsored_ads')
        .select('*')
        .eq('is_active', true)
        .eq('placement', 'hero_carousel');

      if (error) {
        console.error('Error fetching hero promos:', error);
      } else {
        setPromotions(data || []);
      }
      setLoading(false);
    };
    fetchPromos();
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (promotions.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promotions.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, promotions.length]);

  if (loading || promotions.length === 0) {
    return <div className="absolute inset-0 bg-gray-700"></div>; // Fallback for loading or no promos
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {promotions.map((promo, index) => (
        <a
          key={promo.id} // Unique key to prevent re-rendering issues
          href={promo.cta_action}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 absolute z-0'
          }`}
        >
          <img
            src={promo.image_url}
            alt={promo.title}
            className="w-full h-full object-cover"
          />
          {/* Promo text and CTA */}
          <div className="absolute bottom-10 left-10 text-left">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-2">{promo.title}</h2>
            <p className="text-gray-200 text-sm md:text-base mb-4">{promo.description}</p>
          </div>
        </a>
      ))}
      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white z-20"
        aria-label="Previous promotion"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % promotions.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white z-20"
        aria-label="Next promotion"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default PromoCarousel;
