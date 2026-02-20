import { useWeather } from "../../../hooks/useWeather";
import "./Weather.css";

export default function Weather() {
  const {
    loading,
    error,
    city,
    iconUrl,
    conditionText,
    tempC,
    windKph,
    windDir,
    sunrise,
    sunset,
    locationLabel,
    precipChance,
  } = useWeather({
    defaultApiKey: "70e486c353404e4090073202261802",
    defaultCity: "Cluj Napoca",
    persistApiKey: false,
  });

  return (
    <div style={{ minWidth: "300px" }}>
      <div className="weather-header">
        <strong className="weather-title">Weather</strong>
        <small className="weather-subtle">{locationLabel || city}</small>
      </div>

      {loading && <p className="weather-loading">Loading…</p>}
      {error && <p className="weather-error">Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="weather-main">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {iconUrl ? (
                <img
                  className="weather-icon"
                  src={iconUrl}
                  alt={conditionText || "Weather icon"}
                  width={64}
                  height={64}
                />
              ) : (
                <div className="weather-icon-placeholder" aria-hidden="true" />
              )}
              <div className="weather-temp">
                {tempC != null ? `${Math.round(tempC)}°C` : "—"}
              </div>
            </div>
            <div className="weather-condition">{conditionText || "—"}</div>
          </div>

          <div className="weather-grid">
            <div>
              <div className="label">Sunrise</div>
              <div>🌅 {sunrise || "—"}</div>
            </div>
            <div>
              <div className="label">Sunset</div>
              <div>🌇 {sunset || "—"}</div>
            </div>
            <div>
              <div className="label">Wind</div>
              <div>
                {windKph != null ? `💨 ${Math.round(windKph)} km/h` : "—"}
                {windDir ? ` ${windDir}` : ""}
              </div>
            </div>
            <div>
              <div className="label">Precipitation</div>
              <div>{precipChance != null ? `🌧️ ${precipChance}%` : "—"}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
