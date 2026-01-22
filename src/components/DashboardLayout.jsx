// src/components/DashboardLayout.jsx
import React, { useState } from 'react';
import Header from './Header';
import DataCard from './DataCard';
import ChartComponent from './ChartComponent';
import FilterControls from './FilterControls';
import LoadingErrorState from './LoadingErrorState';
import { useApiData } from '../hooks/useApiData';
import { 
  Thermometer, 
  Cloud, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Globe
} from 'lucide-react';

const DashboardLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherUnit, setWeatherUnit] = useState('metric');

  // Fetch data from two different APIs
  const { 
    data: weatherData, 
    isLoading: weatherLoading, 
    error: weatherError,
    refetch: refetchWeather 
  } = useApiData('weather', 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York');

  const { 
    data: cryptoData, 
    isLoading: cryptoLoading, 
    error: cryptoError,
    refetch: refetchCrypto 
  } = useApiData('crypto', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');

  // Filter crypto data based on search
  const filteredCryptoData = cryptoData?.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (weatherLoading || cryptoLoading) {
    return <LoadingErrorState type="loading" message="Loading dashboard data..." />;
  }

  if (weatherError || cryptoError) {
    return (
      <LoadingErrorState 
        type="error" 
        message="Failed to load data"
        onRetry={() => {
          refetchWeather();
          refetchCrypto();
        }}
      />
    );
  }

  // Process weather data for chart
  const weatherChartData = weatherData?.hourly?.time?.slice(0, 24).map((time, index) => ({
    hour: new Date(time).getHours(),
    temperature: weatherData.hourly.temperature_2m[index],
  })) || [];

  // Process crypto data for chart
  const cryptoChartData = cryptoData?.slice(0, 7).map(crypto => ({
    name: crypto.symbol.toUpperCase(),
    price: crypto.current_price,
    change: crypto.price_change_percentage_24h,
  })) || [];

  // Calculate dashboard stats
  const currentTemp = weatherData?.current?.temperature_2m || 0;
  const avgCryptoPrice = cryptoData?.reduce((sum, crypto) => sum + crypto.current_price, 0) / cryptoData?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DataCard
            title="Current Temperature"
            value={`${currentTemp}°${weatherUnit === 'metric' ? 'C' : 'F'}`}
            icon={<Thermometer className="h-6 w-6" />}
            change={`${weatherData?.daily?.temperature_2m_max[0]}° max`}
            changeType="positive"
          />
          <DataCard
            title="Weather Condition"
            value={weatherData?.current?.weather_code === 0 ? 'Clear' : 'Cloudy'}
            icon={<Cloud className="h-6 w-6" />}
            change={`${weatherData?.current?.relative_humidity_2m}% humidity`}
          />
          <DataCard
            title="Avg Crypto Price"
            value={`$${avgCryptoPrice.toFixed(2)}`}
            icon={<DollarSign className="h-6 w-6" />}
            change={`${cryptoData?.length} coins`}
          />
          <DataCard
            title="Top Gainer"
            value={cryptoData?.[0]?.symbol?.toUpperCase() || 'N/A'}
            icon={<TrendingUp className="h-6 w-6" />}
            change={`${cryptoData?.[0]?.price_change_percentage_24h?.toFixed(2)}%`}
            changeType={cryptoData?.[0]?.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}
          />
        </div>

        {/* Filter Controls */}
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          weatherUnit={weatherUnit}
          onUnitChange={setWeatherUnit}
          cryptoCount={filteredCryptoData.length}
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartComponent
            title="24-Hour Temperature Forecast"
            data={weatherChartData}
            dataKey="temperature"
            xAxisKey="hour"
            type="line"
            unit="°C"
            color="#3b82f6"
          />
          <ChartComponent
            title="Cryptocurrency Prices"
            data={cryptoChartData}
            dataKey="price"
            xAxisKey="name"
            type="bar"
            unit="$"
            color="#10b981"
          />
        </div>

        {/* Crypto Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Activity className="h-6 w-6" />
              Cryptocurrency Market
            </h2>
            <span className="text-sm text-gray-500">
              Showing {filteredCryptoData.length} of {cryptoData?.length} coins
            </span>
          </div>

          {filteredCryptoData.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No cryptocurrencies found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Rank</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Symbol</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Price</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">24h Change</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCryptoData.map((crypto, index) => (
                    <tr 
                      key={crypto.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          #{index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={crypto.image} 
                            alt={crypto.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="font-medium text-gray-800">{crypto.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-mono">
                          {crypto.symbol.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium">
                        ${crypto.current_price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          crypto.price_change_percentage_24h >= 0 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {crypto.price_change_percentage_24h >= 0 ? '↗' : '↘'}
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        ${(crypto.market_cap / 1000000000).toFixed(2)}B
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-8 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          <p>Data provided by Open-Meteo and CoinGecko APIs • Updated in real-time</p>
          <p className="mt-2">Dashboard built with React, TanStack Query, and Recharts</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;