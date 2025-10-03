import React, { useState, useEffect } from 'react';
import AdCard from '../Hero/AdCard';
import { getAds } from '../../services/adService';

const GeneralItemsSection = () => {
  const [allAds, setAllAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialVisible = 15; // 3 rows x 5 cards = 15
  const loadMore = 5; // Har click pe 5 more cards
  const [visibleCards, setVisibleCards] = useState(initialVisible);

  useEffect(() => {
    const fetchAllAds = async () => {
      const { data } = await getAds({ status: 'active' });
      if (data) setAllAds(data);
      setLoading(false);
    };
    fetchAllAds();
  }, []);

  const handleShowMore = () => {
    setVisibleCards((prev) => Math.min(prev + loadMore, allAds.length));
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">General Items</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allAds.slice(0, visibleCards).map((ad) => {
              const username = ad.users?.username || 'Unknown';
              const city = ad.locations?.city || 'Unknown';
              return <AdCard key={ad.ad_id} ad={ad} username={username} city={city} />;
            })}
          </div>
        )}
        {visibleCards < allAds.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              className="bg-olxOrange text-white px-6 py-2 rounded-md hover:bg-orange-600 font-bold"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GeneralItemsSection;