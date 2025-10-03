import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalAds: 0, totalUsers: 0, pendingAds: 0 });
  const [recentAds, setRecentAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      // Fetch all stats in parallel
      const [adCountRes, userCountRes, recentAdsRes] = await Promise.all([
        supabase.from('ads').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('ads')
          .select('ad_id, title, status, profiles(username)')
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      const { count: adCount, error: adError } = adCountRes;
      const { count: userCount, error: userError } = userCountRes;
      const { data: recentAdsData, error: recentAdsError } = recentAdsRes;

      // Fetch pending ads count separately
      const { count: pendingCount, error: pendingError } = await supabase
        .from('ads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (adError) console.error('Error fetching ad count:', adError);
      if (userError) console.error('Error fetching user count:', userError);
      if (recentAdsError) console.error('Error fetching recent ads:', recentAdsError);
      if (pendingError) console.error('Error fetching pending ads count:', pendingError);

      setStats({
        totalAds: adCount || 0,
        totalUsers: userCount || 0,
        pendingAds: pendingCount || 0,
      });
      setRecentAds(recentAdsData || []);

      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900">Total Ads</h3>
              <p className="text-2xl text-olxOrange">{stats.totalAds}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900">Total Users</h3>
              <p className="text-2xl text-olxOrange">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900">Pending Ads</h3>
              <p className="text-2xl text-red-500">{stats.pendingAds}</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Ads</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">User</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAds.map(ad => (
                    <tr key={ad.ad_id} className="border-t">
                      <td className="py-2">{ad.title}</td>
                      <td className="py-2">{ad.profiles?.username || 'N/A'}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ad.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : ad.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {ad.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;