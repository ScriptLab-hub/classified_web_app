import React from 'react';

const PostAdButton = () => {
  return (
    <button
      onClick={() => console.log('Post Ad clicked')}
      className="bg-olxOrange text-white font-bold px-4 py-3 rounded-md text-base hover:bg-orange-600"
    >
      Post Free Ad
    </button>
  );
};

export default PostAdButton;