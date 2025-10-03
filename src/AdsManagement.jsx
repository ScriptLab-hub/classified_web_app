import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';

const AdsManagement = () => {
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

  const handleUpdateStatus = async (adId, newStatus) => {
    const { data, error } = await supabase
      .from('ads')
      .update({ status: newStatus })
      .eq('ad_id', adId)
      .select()
      .single();

    if (error) {
      alert('Error updating ad status: ' + error.message);
    } else {
      setAds(ads.map(ad => (ad.ad_id === adId ? { ...ad, status: data.status } : ad)));
      alert(`Ad status updated to ${newStatus}.`);
    }
  };

  const handleDeleteAd = async (adId) => {
    if (window.confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
      const { error } = await supabase.from('ads').delete().eq('ad_id', adId);

      if (error) {
        alert('Error deleting ad: ' + error.message);
      } else {
        setAds(ads.filter(ad => ad.ad_id !== adId));
        alert('Ad deleted successfully.');
      }
    }
  };

  if (loading) {
    return <p>Loading ads...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ads Management</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map(ad => (
              <tr key={ad.ad_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ad.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.profiles?.username || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ad.status === 'active' ? 'bg-green-100 text-green-800' :
                    ad.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ad.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {ad.status !== 'active' && (
                    <button onClick={() => handleUpdateStatus(ad.ad_id, 'active')} className="text-green-600 hover:text-green-900">Approve</button>
                  )}
                  {ad.status !== 'rejected' && (
                    <button onClick={() => handleUpdateStatus(ad.ad_id, 'rejected')} className="text-yellow-600 hover:text-yellow-900">Reject</button>
                  )}
                  <button onClick={() => handleDeleteAd(ad.ad_id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdsManagement;
