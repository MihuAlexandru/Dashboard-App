import type { WeatherAPIResponse, WeatherApiError } from "../types/weather";

export function normalizeIcon(icon?: string): string {
  if (!icon) return "";
  return icon.startsWith("//") ? `https:${icon}` : icon;
}

function isWeatherApiError(x: unknown): x is WeatherApiError {
  if (typeof x !== "object" || x === null) return false;
  if (!("error" in x)) return false;

  const err = (x as { error?: unknown }).error;
  if (typeof err !== "object" || err === null) return false;

  const maybeMsg = (err as { message?: unknown }).message;
  if (maybeMsg !== undefined && typeof maybeMsg !== "string") return false;

  const maybeCode = (err as { code?: unknown }).code;
  if (maybeCode !== undefined && typeof maybeCode !== "number") return false;

  return true;
}

export async function fetchWeather(
  apiKey: string,
  query: string,
  signal?: AbortSignal,
): Promise<WeatherAPIResponse> {
  const url = new URL("https://api.weatherapi.com/v1/forecast.json");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("q", query);
  url.searchParams.set("days", "1");
  url.searchParams.set("aqi", "no");
  url.searchParams.set("alerts", "no");

  const res = await fetch(url.toString(), { signal });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let msg = `Request failed (${res.status})`;
    try {
      const parsed = JSON.parse(text) as unknown;
      if (isWeatherApiError(parsed) && parsed.error?.message) {
        msg = parsed.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(msg);
  }

  return res.json();
}
