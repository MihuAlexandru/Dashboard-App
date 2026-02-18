export type WeatherApiError = {
  error?: { code?: number; message?: string };
};

export type WeatherAPIResponse = {
  location?: {
    name?: string;
    region?: string;
    country?: string;
  };
  current?: {
    temp_c?: number;
    wind_kph?: number;
    wind_dir?: string;
    condition?: { text?: string; icon?: string };
  };
  forecast?: {
    forecastday?: Array<{
      astro?: { sunrise?: string; sunset?: string };
      day?: { daily_chance_of_rain?: number | string };
    }>;
  };
};

export type UseWeatherParams = {
  defaultApiKey: string;
  defaultCity?: string;
  persistApiKey?: boolean;
};

export type UseWeatherState = {
  loading: boolean;
  error: string;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  iconUrl: string;
  conditionText: string;
  tempC: number | null;
  windKph: number | null;
  windDir: string | null;
  sunrise: string;
  sunset: string;
  locationLabel: string;
  precipChance: number | null;
};
