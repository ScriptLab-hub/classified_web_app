import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';

const SponsoredAds = () => {
  const [sponsoredAds, setSponsoredAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsoredAds = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('sponsored_ads').select('*').order('created_at');
      if (error) {
        console.error('Error fetching sponsored ads:', error);
      } else {
        setSponsoredAds(data);
      }
      setLoading(false);
    };
    fetchSponsoredAds();
  }, []);

  const handleToggle = async (id, currentStatus) => {
    const { error } = await supabase.from('sponsored_ads').update({ is_active: !currentStatus }).eq('id', id);
    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      setSponsoredAds(prev =>
        prev.map(ad => (ad.id === id ? { ...ad, is_active: !currentStatus } : ad))
      );
    }
  };

  const handlePlacement = async (id, newPlacement) => {
    const { error } = await supabase.from('sponsored_ads').update({ placement: newPlacement }).eq('id', id);
    if (error) {
      alert('Error updating placement: ' + error.message);
    } else {
      setSponsoredAds(prev =>
        prev.map(ad => (ad.id === id ? { ...ad, placement: newPlacement } : ad))
      );
    }
  };

  if (loading) {
    return <p>Loading sponsored ads...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sponsored Ads Management</h2>
        <Link
          to="/admin/sponsored/new"
          className="bg-olxOrange text-white px-4 py-2 rounded-md hover:bg-orange-600 font-bold"
        >
          Create New
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">CTA</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Placement</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sponsoredAds.map((ad) => (
              <tr key={ad.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{ad.title}</td>
                <td className="p-4 max-w-xs truncate">{ad.description}</td>
                <td className="p-4">{ad.cta_text}</td>
                <td className="p-4">{ad.is_active ? 'Active' : 'Inactive'}</td>
                <td className="p-4">
                  <select
                    value={ad.placement || ''}
                    onChange={(e) => handlePlacement(ad.id, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="">Select Placement</option>
                    <option value="hero_carousel">Hero Carousel</option>
                    <option value="footer">Footer</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggle(ad.id, ad.is_active)}
                    className={`px-3 py-1 rounded-md text-white ${ad.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {ad.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SponsoredAds;