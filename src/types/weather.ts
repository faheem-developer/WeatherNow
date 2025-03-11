
export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  date: number;
  feels_like: number;
  main: string;
}

export interface ForecastItem {
  date: number;
  temperature: number;
  description: string;
  icon: string;
  main: string;
  feels_like: number;
  humidity: number;
  windSpeed: number;
}

export interface ForecastData {
  city: string;
  country: string;
  list: ForecastItem[];
}

export type RecentSearch = {
  city: string;
  timestamp: number;
};
