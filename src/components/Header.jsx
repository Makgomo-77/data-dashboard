// src/components/Header.jsx
import React from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';

const Header = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">API Dashboard</h1>
              <p className="text-sm text-gray-500">Real-time data from multiple public APIs</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </button>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-600">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;