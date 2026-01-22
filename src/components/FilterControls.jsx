// src/components/FilterControls.jsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterControls = ({
  searchTerm,
  onSearchChange,
  weatherUnit,
  onUnitChange,
  cryptoCount,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search cryptocurrencies by name or symbol..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Temperature Unit:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onUnitChange('metric')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  weatherUnit === 'metric'
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onUnitChange('imperial')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  weatherUnit === 'imperial'
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          <div className="hidden md:block h-6 w-px bg-gray-300"></div>

          <div className="text-sm">
            <span className="text-gray-600">Showing </span>
            <span className="font-bold text-blue-600">{cryptoCount}</span>
            <span className="text-gray-600"> results</span>
          </div>
        </div>
      </div>

      {searchTerm && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-gray-600">Searching for: </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
            "{searchTerm}"
          </span>
          <button
            onClick={() => onSearchChange('')}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterControls;