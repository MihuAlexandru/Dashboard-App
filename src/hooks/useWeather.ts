import { useEffect, useMemo, useState } from "react";
import type { UseWeatherParams, UseWeatherState } from "../types/weatherTypes";
import { fetchWeather, normalizeIcon } from "../services/weatherService";

const CITY_STORAGE_KEY = "weather_city";
const API_KEY_STORAGE_KEY = "weather_api_key";

export function useWeather({
  defaultApiKey,
  defaultCity = "Cluj Napoca",
  persistApiKey = false,
}: UseWeatherParams): UseWeatherState {
  const [apiKey, setApiKey] = useState<string>(() => {
    const saved = persistApiKey
      ? localStorage.getItem(API_KEY_STORAGE_KEY)
      : null;
    if (persistApiKey && !saved && defaultApiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, defaultApiKey);
    }
    return saved || defaultApiKey || "";
  });

  const [city, setCity] = useState<string>(() => {
    const saved = localStorage.getItem(CITY_STORAGE_KEY);
    if (!saved) localStorage.setItem(CITY_STORAGE_KEY, defaultCity);
    return saved || defaultCity;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [iconUrl, setIconUrl] = useState("");
  const [conditionText, setConditionText] = useState("");
  const [tempC, setTempC] = useState<number | null>(null);
  const [windKph, setWindKph] = useState<number | null>(null);
  const [windDir, setWindDir] = useState<string | null>(null);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [locationLabel, setLocationLabel] = useState("");
  const [precipChance, setPrecipChance] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(CITY_STORAGE_KEY, city);
  }, [city]);

  useEffect(() => {
    if (persistApiKey) localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  }, [apiKey, persistApiKey]);

  useEffect(() => {
    if (!apiKey || !city) return;
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchWeather(apiKey, city, controller.signal);

        const loc = data?.location;
        const label = [loc?.name, loc?.region, loc?.country]
          .filter(Boolean)
          .join(", ");
        setLocationLabel(label);
        if (loc?.name && loc?.name !== city) setCity(loc.name);

        const icon = data?.current?.condition?.icon || "";
        setIconUrl(normalizeIcon(icon));
        setConditionText(data?.current?.condition?.text ?? "");
        setTempC(
          typeof data?.current?.temp_c === "number"
            ? data.current.temp_c
            : null,
        );
        setWindKph(
          typeof data?.current?.wind_kph === "number"
            ? data.current.wind_kph
            : null,
        );
        setWindDir(
          typeof data?.current?.wind_dir === "string"
            ? data.current.wind_dir
            : null,
        );

        const astro = data?.forecast?.forecastday?.[0]?.astro;
        setSunrise(astro?.sunrise ?? "");
        setSunset(astro?.sunset ?? "");

        const day = data?.forecast?.forecastday?.[0]?.day;
        const chance = day?.daily_chance_of_rain;
        setPrecipChance(
          typeof chance === "number"
            ? chance
            : typeof chance === "string"
              ? Number(chance)
              : null,
        );
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [apiKey, city]);

  return useMemo(
    () => ({
      loading,
      error,
      city,
      setCity,
      apiKey,
      setApiKey,
      iconUrl,
      conditionText,
      tempC,
      windKph,
      windDir,
      sunrise,
      sunset,
      locationLabel,
      precipChance,
    }),
    [
      loading,
      error,
      city,
      apiKey,
      iconUrl,
      conditionText,
      tempC,
      windKph,
      windDir,
      sunrise,
      sunset,
      locationLabel,
      precipChance,
    ],
  );
}
