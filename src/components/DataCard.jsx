// src/components/DataCard.jsx
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const DataCard = ({ title, value, icon, change, changeType = 'neutral' }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
        <div className={`p-2 rounded-lg ${
          changeType === 'positive' ? 'bg-green-50 text-green-600' :
          changeType === 'negative' ? 'bg-red-50 text-red-600' :
          'bg-blue-50 text-blue-600'
        }`}>
          {icon}
        </div>
      </div>
      
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      
      {change && (
        <div className="flex items-center gap-2">
          {changeType === 'positive' && <ArrowUp className="h-4 w-4 text-green-500" />}
          {changeType === 'negative' && <ArrowDown className="h-4 w-4 text-red-500" />}
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' :
            changeType === 'negative' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {change}
          </span>
        </div>
      )}
    </div>
  );
};

export default DataCard;