import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAdById } from '../../services/adService';

const AdDetail = () => {
  const { ad_id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      setLoading(true);
      const { data, error: fetchError } = await getAdById(ad_id);
      if (fetchError) {
        setError(fetchError.message);
        console.error('Error fetching ad details:', fetchError);
      } else {
        setAd(data);
      }
      setLoading(false);
    };

    if (ad_id) {
      fetchAd();
    }
  }, [ad_id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-16 pb-8 px-4">
        <div className="container mx-auto">
          <p className="text-center text-gray-600 text-lg">Loading ad details...</p>
        </div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen bg-gray-100 pt-16 pb-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Ad Not Found
          </h2>
          <p className="text-center text-gray-600 text-lg">
            The ad you're looking for doesn't exist.{' '}
            <Link to="/" className="text-olxOrange hover:underline">
              Go back to Classifieds
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={ad.image_url || 'https://via.placeholder.com/800x600?text=No+Image'}
            alt={ad.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{ad.title}</h2>
            <p className="text-2xl font-semibold text-olxOrange mb-4">
              PKR {ad.price.toLocaleString()}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Category:</span> {ad.categories?.name || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> {ad.locations?.city || 'N/A'}, {ad.locations?.country || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Posted by:</span> {ad.profiles?.username || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Contact:</span> {ad.contact_info || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Description:</span>
                </p>
                <p className="text-gray-700">{ad.description}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                aria-label="Back to Classifieds"
              >
                Back to Classifieds
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-olxOrange text-white rounded-lg hover:bg-orange-600 transition duration-300"
                aria-label="Back to Dashboard"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetail;