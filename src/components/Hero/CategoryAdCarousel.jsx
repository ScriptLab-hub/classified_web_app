import React, { useState, useEffect } from 'react';
import AdCard from './AdCard';
import { ads, users, locations } from '../../data/mockdata';

const CategoryAdCarousel = ({ categoryId, categoryName, isReverse }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Debug logs
  console.log('Imported ads:', ads);
  console.log('categoryId:', categoryId);

  let categoryAds = ads.filter((ad) => ad.category_id === categoryId && ad.status === 'active');
  console.log('Filtered categoryAds:', categoryAds);

  if (isReverse) {
    categoryAds = [...categoryAds].reverse();
  }
  const cardsPerPage = 5;
  const totalSlides = Math.ceil(categoryAds.length / cardsPerPage);

  // Auto-rotate
  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  if (categoryAds.length === 0) {
    return (
      <div className="h-82 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">No {categoryName} ads available</p>
      </div>
    );
  }

  return (
    <div className="relative h-90 bg-gray-100 overflow-hidden py-6">
      <h2 className="text-center text-gray-900 text-2xl font-bold mb-4">{categoryName}</h2>
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div key={slideIndex} className="min-w-full flex shrink-0">
            {categoryAds
              .slice(slideIndex * cardsPerPage, (slideIndex + 1) * cardsPerPage)
              .map((ad) => {
                const username = users.find((u) => u.user_id === ad.user_id)?.username || 'Unknown';
                const city = locations.find((l) => l.location_id === ad.location_id)?.city || 'Unknown';
                return (
                  <div key={ad.ad_id} className="flex-1 px-2 sm:w-full md:w-1/3 lg:w-1/5">
                    <AdCard ad={ad} username={username} city={city} />
                  </div>
                );
              })}
          </div>
        ))}
      </div>
      {totalSlides > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white z-20"
            aria-label={`Previous ${categoryName} ads`}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white z-20"
            aria-label={`Next ${categoryName} ads`}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryAdCarousel;