import React from 'react';

const UserIcons = () => {
  return (
    <div className="flex items-center space-x-3">
      <button onClick={() => console.log('Favorites clicked')}>
        <svg className="w-6 h-6 text-gray-600 hover:text-olxOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <button onClick={() => console.log('Messages clicked')}>
        <svg className="w-6 h-6 text-gray-600 hover:text-olxOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-4l-3-3 3-3v-4h4l3-3 3 3h4v4l3 3-3 3v4h-4l-3 3-3-3z" />
        </svg>
      </button>
      <button onClick={() => console.log('Profile clicked')}>
        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 hover:border-olxOrange"></div>
      </button>
    </div>
  );
};

export default UserIcons;