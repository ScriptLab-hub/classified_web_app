import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const logo = '/assets/logo.png'; // Place logo in public/assets/ or update to src/assets/

const UserNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostAdPage = location.pathname === '/post-ad';

  const handleLogoutClick = () => {
    onLogout();
    navigate("/"); // Redirect to landing page
  };

  return (
    <nav className="bg-gray-800 text-gray-300 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Classifieds Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-gray-100 tracking-wide">Classifieds</span>
        </Link>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition duration-300"
                aria-label="Go to user dashboard"
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
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
                <span className="ml-2">Dashboard</span>
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
                aria-label="Sign in to your account"
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
                aria-label="Register a new account"
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
          {/* Show Post Ad button only if not on /post-ad */}
          {!isPostAdPage && (
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;