import React, { useState } from 'react';
import { categories } from '../data/mockData';

const CategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 rounded-md px-4 py-3 text-gray-800 text-base hover:border-olxOrange"
      >
        All Categories
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-gray-200 rounded-md w-72 max-h-96 overflow-y-auto shadow-lg mt-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={() => console.log('Category:', category.name)}
            >
              <img src={category.icon} alt={`${category.name} icon`} className="w-4 h-4 mr-2" />
              <span className="text-gray-800 text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;