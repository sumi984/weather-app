import React, { useState } from 'react';
import { getCurrentWeather, getHistoricalWeather, getMarineWeather } from './api/weatherService';
import { mockHistoricalData, mockMarineData } from './api/mockData';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HistoricalWeather from './components/HistoricalWeather';
import MarineWeather from './components/MarineWeather';
import { CloudRain } from 'lucide-react';

function App() {
  const [data, setData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [marineData, setMarineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current'); // current, historical, marine

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setData(null);
    setHistoricalData(null);
    setMarineData(null);

    try {
      // 1. Fetch Current Weather
      try {
        const current = await getCurrentWeather(query);
        if (current.error) throw new Error(current.error.info);
        setData(current);
      } catch (err) {
        // If it's an API key error, make it very clear
        if (err.message && err.message.toLowerCase().includes('access key')) {
          throw new Error("Invalid or Missing API Key. Please get a free key from weatherstack.com and update your .env file.");
        }
        throw err;
      }

      // 2. Fetch Historical (Example: Yesterday)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split('T')[0];

      try {
        const history = await getHistoricalWeather(query, dateStr);
        if (!history.error) {
          setHistoricalData(history);
        } else {
          // Fallback for plan restriction
          console.warn("Using mock historical data due to API restriction");
          const mock = mockHistoricalData();
          // Update mock date to match request
          const oldKey = Object.keys(mock.historical)[0];
          mock.historical[dateStr] = { ...mock.historical[oldKey], date: dateStr };
          if (oldKey !== dateStr) delete mock.historical[oldKey];
          setHistoricalData(mock);
        }
      } catch (e) {
        console.warn("Historical weather fetch failed, using mock", e);
        const mock = mockHistoricalData();
        // Update mock date to match request
        const oldKey = Object.keys(mock.historical)[0];
        mock.historical[dateStr] = { ...mock.historical[oldKey], date: dateStr };
        if (oldKey !== dateStr) delete mock.historical[oldKey];
        setHistoricalData(mock);
      }

      // 3. Marine
      try {
        const marine = await getMarineWeather(query);
        if (!marine.error) {
          setMarineData(marine);
        } else {
          // Fallback
          console.warn("Using mock marine data due to API restriction");
          setMarineData(mockMarineData());
        }
      } catch (e) {
        console.warn("Marine weather fetch failed, using mock", e);
        setMarineData(mockMarineData());
      }

    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl animate-fade-in">
        <header className="mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <CloudRain size={64} className="text-blue-300" />
            <h1 className="text-6xl font-bold text-gradient tracking-tight">Glass Weather</h1>
          </div>
          <p className="text-secondary text-xl">Detailed forecast with a premium touch</p>
        </header>

        <div className="mb-16">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className="glass-panel border-red-400/30 text-red-200 mb-12 p-8 animate-fade-in flex flex-col items-center gap-4" style={{ borderColor: 'rgba(255, 107, 107, 0.3)' }}>
            <span className="text-3xl">⚠️</span>
            <p className="font-medium text-lg text-center">{error}</p>
          </div>
        )}

        {loading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-200 animate-pulse text-lg">Fetching weather data...</p>
          </div>
        )}

        {data && !loading && (
          <div className="animate-fade-in space-y-12">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
              <button
                className={`glass-btn px-8 py-3 transition-all duration-300 ${activeTab === 'current' ? 'active scale-105 shadow-lg' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveTab('current')}
              >
                Current
              </button>
              <button
                className={`glass-btn px-8 py-3 transition-all duration-300 ${activeTab === 'historical' ? 'active scale-105 shadow-lg' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveTab('historical')}
              >
                Historical
              </button>
              <button
                className={`glass-btn px-8 py-3 transition-all duration-300 ${activeTab === 'marine' ? 'active scale-105 shadow-lg' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveTab('marine')}
              >
                Marine
              </button>
            </div>

            <div className="transition-all duration-300 ease-in-out">
              {activeTab === 'current' && <WeatherCard data={data} />}

              {activeTab === 'historical' && (
                historicalData ? (
                  <HistoricalWeather data={historicalData} />
                ) : (
                  <div className="glass-panel text-center py-20">
                    <p className="opacity-70 text-lg">Historical data not available for this location or plan.</p>
                  </div>
                )
              )}

              {activeTab === 'marine' && (
                marineData ? (
                  <MarineWeather data={marineData} />
                ) : (
                  <div className="glass-panel text-center py-20">
                    <p className="opacity-70 text-lg">Marine data not available for this location.</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
