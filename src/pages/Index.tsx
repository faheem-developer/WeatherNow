
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fetchCurrentWeather, fetchForecast } from "@/utils/weatherApi";
import { CurrentWeather, ForecastData, RecentSearch } from "@/types/weather";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import RecentSearches from "@/components/RecentSearches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MAX_RECENT_SEARCHES = 5;
const STORAGE_KEY = "recent-weather-searches";

const Index = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem(STORAGE_KEY);
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error("Failed to parse recent searches:", e);
      }
    }
  }, []);

  const addToRecentSearches = (city: string) => {
    const newSearch: RecentSearch = {
      city,
      timestamp: Date.now(),
    };

    const updatedSearches = [
      newSearch,
      ...recentSearches.filter((search) => search.city.toLowerCase() !== city.toLowerCase()),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updatedSearches);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
  };

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      addToRecentSearches(city);
      
      // Scroll to weather card
      const weatherSection = document.getElementById("weather-section");
      if (weatherSection) {
        weatherSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setError((err as Error).message || "Failed to fetch weather data");
      toast.error("City not found. Please try another city name.");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />
      
      <div className="w-full max-w-4xl px-4 py-12 mx-auto mt-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-800 mb-2 animate-fade-up">
            Weather <span className="font-normal text-primary">Forecast</span>
          </h1>
          <p className="text-gray-600 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "100ms" }}>
            Search for a city to get current weather and 5-day forecast
          </p>
        </header>

        <RecentSearches searches={recentSearches} onSelect={handleSearch} />
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {loading && (
          <div className="flex justify-center my-12">
            <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center my-12 p-8 rounded-xl border border-red-100 bg-red-50">
            <p className="text-red-600">{error}</p>
            <p className="text-gray-600 mt-2">Please try another city name or check your connection.</p>
          </div>
        )}

        {currentWeather && !loading && !error && (
          <div id="weather-section" className="mt-6 space-y-8">
            <WeatherCard weather={currentWeather} />
            
            {forecast && forecast.list.length > 0 && (
              <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
                <h2 className="text-xl font-medium mb-4 text-gray-800">5-Day Forecast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {forecast.list.map((item, index) => (
                    <ForecastCard 
                      key={item.date} 
                      forecast={item} 
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
