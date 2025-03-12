
import { CurrentWeather } from "@/types/weather";
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Sun, 
  CloudFog, 
  CloudDrizzle, 
  Thermometer,
  Droplets,
  Wind
} from "lucide-react";

interface WeatherCardProps {
  weather: CurrentWeather;
  className?: string;
}

const WeatherCard = ({ weather, className = "" }: WeatherCardProps) => {
  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <Sun size={64} className="text-yellow-400 animate-pulse-slow" />;
      case "clouds":
        return <Cloud size={64} className="text-gray-400 animate-pulse-slow" />;
      case "rain":
        return <CloudRain size={64} className="text-blue-400 animate-pulse-slow" />;
      case "snow":
        return <CloudSnow size={64} className="text-blue-200 animate-pulse-slow" />;
      case "thunderstorm":
        return <CloudLightning size={64} className="text-indigo-500 animate-pulse-slow" />;
      case "drizzle":
        return <CloudDrizzle size={64} className="text-blue-300 animate-pulse-slow" />;
      case "mist":
      case "fog":
      case "haze":
        return <CloudFog size={64} className="text-gray-300 animate-pulse-slow" />;
      default:
        return <Sun size={64} className="text-yellow-400 animate-pulse-slow" />;
    }
  };

  const getBackgroundClass = (main: string) => {
    switch (main.toLowerCase()) {
      case "clear":
        return "from-weather-clear/40 to-blue-50/20 dark:from-weather-clear/30 dark:to-blue-900/20";
      case "clouds":
        return "from-weather-clouds/40 to-gray-100/20 dark:from-weather-clouds/30 dark:to-gray-800/20";
      case "rain":
        return "from-weather-rain/40 to-blue-100/20 dark:from-weather-rain/30 dark:to-blue-900/20";
      case "snow":
        return "from-weather-snow/40 to-blue-50/20 dark:from-weather-snow/30 dark:to-blue-900/20";
      case "thunderstorm":
        return "from-weather-thunderstorm/40 to-indigo-100/20 dark:from-weather-thunderstorm/30 dark:to-indigo-900/20";
      case "drizzle":
        return "from-weather-drizzle/40 to-blue-100/20 dark:from-weather-drizzle/30 dark:to-blue-900/20";
      case "mist":
      case "fog":
      case "haze":
        return "from-weather-mist/40 to-gray-100/20 dark:from-weather-mist/30 dark:to-gray-800/20";
      default:
        return "from-blue-100/40 to-blue-50/20 dark:from-blue-900/30 dark:to-blue-950/20";
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`p-6 rounded-2xl glass bg-gradient-to-br ${getBackgroundClass(weather.main)} shadow-xl transition-all duration-500 animate-fade-up dark:text-gray-100 ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 flex flex-col items-center">
          {getWeatherIcon(weather.main)}
          <p className="mt-2 text-xl font-medium capitalize text-balance">{weather.description}</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-1">
            <span className="text-6xl md:text-7xl font-light">{weather.temperature}</span>
            <span className="text-3xl font-light self-start mt-2">°C</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Feels like: {weather.feels_like}°C</p>
          <h2 className="text-2xl md:text-3xl font-medium mt-1">{weather.city}, {weather.country}</h2>
          <p className="text-gray-600 dark:text-gray-400">{formatDate(weather.date)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="flex items-center gap-3 bg-white/30 dark:bg-white/10 p-4 rounded-xl">
          <Thermometer className="text-red-400" size={24} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
            <p className="font-medium">{weather.temperature}°C</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/30 dark:bg-white/10 p-4 rounded-xl">
          <Droplets className="text-blue-400" size={24} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/30 dark:bg-white/10 p-4 rounded-xl">
          <Wind className="text-teal-400" size={24} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</p>
            <p className="font-medium">{weather.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
