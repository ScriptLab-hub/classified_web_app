import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiUserFill } from 'react-icons/ri';
import { getAds } from '../../services/adService';
import { getProfile, updateUserProfile } from '../../services/authService';
import { supabase } from '../../services/supabase';

const UserDashboard = ({ user }) => {
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Please Log In
          </h2>
          <p className="text-center text-gray-600 text-lg">
            You need to be logged in to view your dashboard.{' '}
            <Link to="/signin" className="text-olxOrange hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const [profile, setProfile] = useState(null);
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [profileRes, adsRes] = await Promise.all([
        getProfile(user.id),
        getAds({ user_id: user.id })
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (adsRes.data) setUserAds(adsRes.data);

      setLoading(false);
    };
    fetchData();
  }, [user.id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Use a unique file path to prevent caching issues and overwrite existing file.
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Update the public.profiles table
      const { error: updateError } = await updateUserProfile(user.id, {
        profile_image_url: publicUrl,
      });

      if (updateError) {
        alert('Error updating profile: ' + updateError.message);
      } else {
        setProfile(prev => ({ ...prev, profile_image_url: publicUrl }));
        alert('Profile image updated!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4">
      <div className="container mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row items-center">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            {profile?.profile_image_url ? (
              <img src={profile.profile_image_url} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                <RiUserFill className="w-12 h-12 text-gray-500" />
              </div>
            )}
            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-olxOrange text-white p-1 rounded-full cursor-pointer hover:bg-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              <input id="profile-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left">{profile?.username || user.email}'s Dashboard</h2>
        </div>
        <div className="mb-6 text-center">
          <Link
            to="/post-ad"
            className="inline-block px-4 py-2 bg-olxOrange text-white rounded-lg hover:bg-orange-600 transition duration-300"
            aria-label="Post a new ad"
          >
            Post New Ad
          </Link>
        </div>
        {loading ? (
          <div className="text-center">Loading your ads...</div>
        ) : userAds.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">You haven't posted any ads yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userAds.map(ad => {
              const location = ad.locations;
              const category = ad.categories;
              return (
                <div
                  key={ad.ad_id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl"
                >
                  <img
                    src={ad.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={ad.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{ad.title}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Price:</span> PKR {ad.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Category:</span> {category?.name || 'Unknown'}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Location:</span> {location?.city || 'Unknown'}
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;