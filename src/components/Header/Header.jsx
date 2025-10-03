import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../../data/mockdata';
import { RiUserFill, RiSearchLine } from 'react-icons/ri';

import logo from '../../assets/logo.png';

const Header = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for "${searchQuery}" in "${locationQuery}"`);
    navigate(`/search?q=${searchQuery}&location=${locationQuery}`);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-gray-300 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Classifieds Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-gray-100 tracking-wide hidden md:inline">
            Classifieds
          </span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow items-center justify-center max-w-2xl mx-auto gap-1">
          <input
            type="text"
            placeholder="Search a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-l-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-olxOrange focus:border-transparent"
            aria-label="Search for a product"
          />
          <input
            type="text"
            placeholder="Location..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="w-64 px-4 py-2.5 text-gray-900 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-olxOrange focus:border-transparent"
            aria-label="Search by location"
          />
          <button type="submit" className="p-3 bg-olxOrange text-white rounded-r-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-olxOrange" aria-label="Search">
            <RiSearchLine className="w-5 h-5" />
          </button>
        </form>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to={user ? '/post-ad' : '/signin'}
            className="flex items-center px-3 py-2 rounded-lg bg-olxOrange hover:bg-orange-600 text-white transition duration-300"
            aria-label="Post a new ad"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="ml-2">Post Ad</span>
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center space-x-2" aria-label="Go to user dashboard">
                {user?.profile_image_url ? (
                  <img src={user.profile_image_url} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <RiUserFill className="w-5 h-5 text-gray-300" />
                  </div>
                )}
                <span className="hidden sm:inline">{user?.username || user.email}</span>
              </Link>
              <button
                onClick={handleLogoutClick}
                className="flex items-center px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300"
                aria-label="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span className="ml-2">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="flex items-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition duration-300"
                aria-label="Sign in"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="ml-2">Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition duration-300"
                aria-label="Register"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.5h-1.5a2.25 2.25 0 0 0-2.25 2.25v15a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V9.75"
                  />
                </svg>
                <span className="ml-2">Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-4">
          <form onSubmit={handleSearch} className="space-y-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-olxOrange"
              aria-label="Search for a product"
            />
            <input
              type="text"
              placeholder="Location..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-olxOrange"
              aria-label="Search by location"
            />
          </form>
          <div className="flex flex-col space-y-2">
            {categories.map(category => (
              <Link
                key={category.category_id}
                to={`/categories/${category.slug}`}
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label={`View ${category.name} category`}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
            <Link
              to={user ? '/post-ad' : '/signin'}
              className="text-left px-3 py-2 rounded-lg bg-olxOrange hover:bg-orange-600 text-white transition duration-300"
              aria-label="Post a new ad"
            >
              Post Ad
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-left px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition duration-300"
                  aria-label="Go to user dashboard"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="text-left px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-left px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition duration-300"
                  aria-label="Sign in"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-left px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition duration-300"
                  aria-label="Register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Categories for Desktop */}
      <div className="hidden md:block bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center space-x-8">
          {categories.map(category => (
            <Link
              key={category.category_id}
              to={`/categories/${category.slug}`}
              className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              aria-label={`View ${category.name} category`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;