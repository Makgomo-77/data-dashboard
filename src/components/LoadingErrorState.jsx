// src/components/LoadingErrorState.jsx
import React from 'react';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

const LoadingErrorState = ({ type = 'loading', message = '', onRetry }) => {
  if (type === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">{message || 'Fetching real-time data from APIs...'}</p>
        </div>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 p-6 rounded-2xl mb-6">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              {message || 'Unable to load dashboard data. Please check your connection and try again.'}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Loading Data
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">
            If the problem persists, please ensure you have an internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingErrorState;