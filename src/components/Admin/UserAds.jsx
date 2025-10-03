import React from 'react';
import { ads, users, locations, categories } from '../../data/mockdata';

const UserAds = ({ role }) => {
  const userAds = ads.filter((ad) => ad.status === 'active' || ad.status === 'pending');

  const handleApprove = (adId) => {
    console.log(`Approved ad: ${adId}`);
  };

  const handleReject = (adId) => {
    console.log(`Rejected ad: ${adId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Ads Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Posted By</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userAds.map((ad) => {
              const user = users.find((u) => u.user_id === ad.user_id) || { username: 'Unknown' };
              const location = locations.find((l) => l.location_id === ad.location_id) || { city: 'Unknown' };
              const category = categories.find((c) => c.category_id === ad.category_id) || { name: 'Unknown' };
              return (
                <tr key={ad.ad_id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">{ad.title}</td>
                  <td className="p-4">{category.name}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{location.city}</td>
                  <td className="p-4">Rs {ad.price.toLocaleString()}</td>
                  <td className="p-4 capitalize">{ad.status}</td>
                  <td className="p-4">
                    {ad.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(ad.ad_id)}
                          className="bg-olxOrange text-white px-3 py-1 rounded-md hover:bg-orange-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(ad.ad_id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAds;