import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../../data/mockdata'; // We can still use this for category info
import { supabase } from '../../services/supabase';

const CategoryPage = () => {
  const { category } = useParams();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryData = categories.find(cat => cat.slug.toLowerCase() === category.toLowerCase());
  const categoryName = categoryData ? categoryData.name : category.charAt(0).toUpperCase() + category.slice(1);
  const categoryId = categoryData ? categoryData.category_id : null;

  useEffect(() => {
    const fetchAds = async () => {
      if (!categoryId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      // Fetch ads and join with profiles and locations tables
      const { data, error } = await supabase
        .from('ads')
        .select(`
          *,
          profiles ( username ),
          locations ( city )
        `)
        .eq('category_id', categoryId)
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching ads:', error);
      } else {
        setAds(data);
      }
      setLoading(false);
    };

    fetchAds();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {categoryName} Listings
        </h2>
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : ads.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No active ads found in the {categoryName} category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map(ad => (
              <div
                key={ad.ad_id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl"
              >
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{ad.title}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Price:</span> PKR {ad.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Location:</span> {ad.locations?.city || 'Unknown City'}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Posted by:</span> {ad.profiles?.username || 'Unknown User'}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Contact:</span> {ad.contact_info}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{ad.description}</p>
                  <Link
                    to={`/ads/${ad.ad_id}`}
                    className="w-full block text-center bg-olxOrange hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition duration-300"
                    aria-label={`View details for ${ad.title}`}
                  >
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

export default CategoryPage;