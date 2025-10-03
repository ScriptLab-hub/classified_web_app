import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Search:', query);
  };

  return (
    <div className="flex items-center bg-white border-2 border-gray-300 rounded-md w-[600px] h-12">
      <svg className="w-4 h-4 mx-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What are you looking for?"
        className="flex-grow text-gray-600 text-base outline-none"
      />
      <select className="border-l border-gray-300 px-2 text-gray-600 text-base">
        <option>Pakistan</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-olxOrange text-white px-4 rounded-r-md hover:bg-orange-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;