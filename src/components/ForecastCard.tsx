
import { ForecastItem } from "@/types/weather";
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Sun, 
  CloudFog, 
  CloudDrizzle, 
  Droplets,
  Wind
} from "lucide-react";

interface ForecastCardProps {
  forecast: ForecastItem;
  index: number;
}

const ForecastCard = ({ forecast, index }: ForecastCardProps) => {
  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <Sun size={32} className="text-yellow-400" />;
      case "clouds":
        return <Cloud size={32} className="text-gray-400" />;
      case "rain":
        return <CloudRain size={32} className="text-blue-400" />;
      case "snow":
        return <CloudSnow size={32} className="text-blue-200" />;
      case "thunderstorm":
        return <CloudLightning size={32} className="text-indigo-500" />;
      case "drizzle":
        return <CloudDrizzle size={32} className="text-blue-300" />;
      case "mist":
      case "fog":
      case "haze":
        return <CloudFog size={32} className="text-gray-300" />;
      default:
        return <Sun size={32} className="text-yellow-400" />;
    }
  };

  const getBackgroundClass = (main: string) => {
    switch (main.toLowerCase()) {
      case "clear":
        return "from-weather-clear/20 to-transparent";
      case "clouds":
        return "from-weather-clouds/20 to-transparent";
      case "rain":
        return "from-weather-rain/20 to-transparent";
      case "snow":
        return "from-weather-snow/20 to-transparent";
      case "thunderstorm":
        return "from-weather-thunderstorm/20 to-transparent";
      case "drizzle":
        return "from-weather-drizzle/20 to-transparent";
      case "mist":
      case "fog":
      case "haze":
        return "from-weather-mist/20 to-transparent";
      default:
        return "from-blue-100/20 to-transparent";
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Add staggered animation delay
  const getAnimationDelay = () => {
    return `${150 + (index * 75)}ms`;
  };

  return (
    <div 
      className={`p-4 rounded-xl glass bg-gradient-to-br ${getBackgroundClass(forecast.main)} transition-all duration-300 hover:shadow-md animate-fade-up text-gray-800`}
      style={{ animationDelay: getAnimationDelay() }}
    >
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-medium mb-2 text-gray-700">{formatDate(forecast.date)}</h3>
        {getWeatherIcon(forecast.main)}
        <p className="mt-3 text-xl font-medium">{forecast.temperature}°C</p>
        <p className="text-xs text-gray-600 mt-1">Feels like {forecast.feels_like}°C</p>
        <p className="text-sm mt-2 text-gray-700 capitalize text-balance">{forecast.description}</p>
        
        <div className="flex w-full justify-between mt-3 pt-3 border-t border-white/30 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Droplets size={12} />
            <span>{forecast.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={12} />
            <span>{forecast.windSpeed}m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
