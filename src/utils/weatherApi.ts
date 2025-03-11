
import { CurrentWeather, ForecastData, ForecastItem } from "@/types/weather";
import { supabase } from "@/integrations/supabase/client";

export const fetchCurrentWeather = async (city: string): Promise<CurrentWeather> => {
  try {
    const { data, error } = await supabase.functions.invoke("weather", {
      body: { city, path: "current" },
      method: "POST"
    });
    
    if (error) {
      throw new Error(error.message || "City not found");
    }
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      date: data.dt,
      feels_like: Math.round(data.main.feels_like),
      main: data.weather[0].main,
    };
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  try {
    const { data, error } = await supabase.functions.invoke("weather", {
      body: { city, path: "forecast" },
      method: "POST"
    });
    
    if (error) {
      throw new Error(error.message || "City not found");
    }
    
    // Get one forecast per day (at noon)
    const dailyForecasts: ForecastItem[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime() / 1000;
    
    // Group forecasts by day
    const forecastsByDay: { [key: string]: ForecastItem[] } = {};
    
    data.list.forEach((item: any) => {
      if (item.dt > todayTimestamp) {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toISOString().split('T')[0];
        
        if (!forecastsByDay[dayKey]) {
          forecastsByDay[dayKey] = [];
        }
        
        forecastsByDay[dayKey].push({
          date: item.dt,
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          main: item.weather[0].main,
          feels_like: Math.round(item.main.feels_like),
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        });
      }
    });
    
    // Take the noon forecast for each day or the one closest to noon
    Object.values(forecastsByDay).forEach((dayForecasts) => {
      if (dayForecasts.length > 0) {
        // Sort by time to find the one closest to noon
        const sortedForecasts = [...dayForecasts].sort((a, b) => {
          const dateA = new Date(a.date * 1000);
          const dateB = new Date(b.date * 1000);
          const timeA = Math.abs(dateA.getHours() - 12);
          const timeB = Math.abs(dateB.getHours() - 12);
          return timeA - timeB;
        });
        
        dailyForecasts.push(sortedForecasts[0]);
      }
    });
    
    // Limit to 5 days
    const limitedForecasts = dailyForecasts.slice(0, 5);
    
    return {
      city: data.city.name,
      country: data.city.country,
      list: limitedForecasts,
    };
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};
