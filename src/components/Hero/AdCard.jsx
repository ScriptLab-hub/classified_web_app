import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdCard = ({ ad, username, city }) => {
  const [showContact, setShowContact] = useState(false);

  // Fallback image
  const imageSrc = ad?.image_url || 'https://via.placeholder.com/280x200?text=No+Image';
  const altText = ad?.alt || 'No Image Available';

  // Props validation
  if (!ad || !username || !city) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 w-64 flex flex-col items-center">
        <p className="text-red-500 text-xs">Error: Missing ad data</p>
      </div>
    );
  }

  return (
    <Link to={`/ads/${ad.ad_id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md p-4 w-64 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow h-full">
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-32 object-cover rounded-t-lg"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/280x200?text=No+Image';
        }}
      />
      <h3 className="text-base font-bold mt-2 truncate">{ad.title || 'No Title'}</h3>
      <p className="text-gray-600 text-xs mt-1 truncate">{ad.description || 'No Description'}</p>
      <p className="text-olxOrange font-bold mt-1 text-sm">
        Rs {ad.price ? ad.price.toLocaleString() : 'N/A'}
      </p>
      <p className="text-gray-500 text-xs mt-1">Posted By: {username}</p>
      <p className="text-gray-500 text-xs mt-1">Location: {city}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowContact(!showContact);
        }}
        className="mt-2 bg-olxOrange text-white px-3 py-1 text-sm rounded-md hover:bg-orange-600"
      >
        {showContact ? 'Hide Contact' : 'Show Contact'}
      </button>
      {showContact && (
        <p className="text-gray-700 text-xs mt-1">
          Contact: {ad.fake_contact || 'N/A'}
        </p>
      )}
      </div>
    </Link>
  );
};

export default AdCard;
