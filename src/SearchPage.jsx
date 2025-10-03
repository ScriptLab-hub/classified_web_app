import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase } from './services/supabase';

const SearchPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const locationQuery = searchParams.get('location') || '';

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);

      let queryBuilder = supabase
        .from('ads')
        .select(`
          *,
          profiles ( username ),
          locations ( city )
        `)
        .eq('status', 'active');

      // Add text search filter for title and description
      if (query) {
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }

      // Add location filter
      if (locationQuery) {
        queryBuilder = queryBuilder.ilike('locations.city', `%${locationQuery}%`);
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching search results:', error);
      } else {
        setAds(data);
      }
      setLoading(false);
    };

    fetchAds();
  }, [query, locationQuery]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Search Results for "{query}" {locationQuery && `in "${locationQuery}"`}
        </h2>
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : ads.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No ads found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ads.map(ad => (
              <div
                key={ad.ad_id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl"
              >
                <img src={ad.image_url} alt={ad.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{ad.title}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Price:</span> PKR {ad.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Location:</span> {ad.locations?.city || 'Unknown'}
                  </p>
                  <Link to={`/ads/${ad.ad_id}`} className="w-full block text-center bg-olxOrange hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition duration-300">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;