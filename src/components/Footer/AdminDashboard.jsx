import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const AdminDashboard = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAds = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('ads')
        .select(`
          ad_id,
          title,
          price,
          status,
          created_at,
          profiles ( username ),
          locations ( city )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all ads:', error);
      } else {
        setAds(data);
      }
      setLoading(false);
    };

    fetchAllAds();
  }, []);

  const handleDeleteAd = async (adId) => {
    if (window.confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
      // First, delete from storage if there's an image_url
      // Note: This is a simplified delete. For production, you'd parse the URL to get the file path.
      
      // Then, delete the ad record from the database
      const { error } = await supabase.from('ads').delete().eq('ad_id', adId);

      if (error) {
        alert('Error deleting ad: ' + error.message);
      } else {
        // Remove the ad from the local state to update the UI
        setAds(ads.filter(ad => ad.ad_id !== adId));
        alert('Ad deleted successfully.');
      }
    }
  };

  if (loading) {
    return <div className="pt-24 text-center">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard - All Ads</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ads.map(ad => (
                <tr key={ad.ad_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ad.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.profiles?.username || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.locations?.city || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PKR {ad.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleDeleteAd(ad.ad_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;