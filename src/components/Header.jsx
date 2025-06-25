import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/images/logo.png"
              alt="ONGC Logo" 
              className="h-12 w-auto mr-3 bg-white p-1 rounded"
            />
            <h1 className="text-3xl font-bold">Oil Well Monitoring Dashboard</h1>
          </div>
          <div className="flex-grow flex items-center justify-center space-x-6">
            <Link
              to="/dashboard"
              className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                location.pathname === '/dashboard'
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/data-entry"
              className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                location.pathname === '/data-entry'
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              Data Entry
            </Link>
            <Link
              to="/well-map"
              className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                location.pathname === '/well-map'
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              Well Map
            </Link>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login';
              }}
              className="px-4 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 