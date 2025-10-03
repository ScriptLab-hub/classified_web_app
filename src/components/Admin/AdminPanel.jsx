import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

const AdminPanel = ({ profile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-gray-300 flex flex-col">
        <div className="p-4 text-xl font-bold text-center">Admin Panel</div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="/admin"
                className={`w-full text-left block p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/admin' ? 'bg-olxOrange' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`w-full text-left block p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/admin/users' ? 'bg-olxOrange' : ''}`}
              >
                User Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin/ads"
                className={`w-full text-left block p-2 rounded-md hover:bg-gray-700 ${location.pathname === '/admin/ads' ? 'bg-olxOrange' : ''}`}
              >
                Ads Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin/sponsored"
                className={`w-full text-left block p-2 rounded-md hover:bg-gray-700 ${location.pathname.startsWith('/admin/sponsored') ? 'bg-olxOrange' : ''}`}
              >
                Sponsored Ads
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;