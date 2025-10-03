import React, { useState, useEffect } from 'react';
import AdCard from '../Hero/AdCard';
import { supabase } from '../../services/supabase';

const CategoryCarousel = ({ categoryId, categoryName, isReverse }) => {
  const [categoryAds, setCategoryAds] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchCategoryAds = async () => {
      // Fetch latest 10 active ads for the given category
      const { data, error: fetchError } = await supabase
        .from('ads')
        .select(`
          *,
          profiles ( username ),
          locations ( city )
        `)
        .eq('category_id', categoryId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(10);

      if (fetchError) {
        setError(fetchError.message);
      } else if (data) {
        setCategoryAds(data); // We will handle reverse logic in auto-rotation
      }
      setLoading(false);
    };
    fetchCategoryAds();
  }, [categoryId, isReverse]);

  const cardsPerPage = 5;
  const totalSlides = Math.ceil(categoryAds.length / cardsPerPage);

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        if (isReverse) {
          setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        } else {
          setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  if (loading) {
    return <div className="h-96 bg-gray-100 flex items-center justify-center">Loading {categoryName} ads...</div>;
  }

  if (error) {
    return <div className="h-96 bg-gray-100 flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (categoryAds.length === 0) {
    return <div className="h-96 bg-gray-100 flex items-center justify-center">No {categoryName} ads available</div>;
  }

  return (
    <div className="relative h-96 bg-gray-100 overflow-hidden py-6">
      <h2 className="text-center text-gray-900 text-2xl font-bold mb-4">{categoryName}</h2>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div key={slideIndex} className="min-w-full flex shrink-0">
            {categoryAds
              .slice(slideIndex * cardsPerPage, (slideIndex + 1) * cardsPerPage)
              .map((ad) => {
                const username = ad.profiles?.username || 'Unknown';
                const city = ad.locations?.city || 'Unknown';
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

export default CategoryCarousel;