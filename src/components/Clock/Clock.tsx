import { useEffect, useMemo, useState } from "react";
import "./Clock.css";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hourNumbers = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    [],
  );

  return (
    <div aria-live="polite">
      <div
        className="clock"
        aria-label={`Analog clock showing ${formatTime(time)}`}
      >
        <div
          className="hand hour"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />
        <div
          className="hand second"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />

        {hourNumbers.map((n) => {
          const angle = n * 30 - 90;

          return (
            <div
              key={n}
              className="number"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) var(--number-translate) rotate(${-angle}deg)`,
              }}
            >
              {n}
            </div>
          );
        })}
        <div className="center-dot" />
      </div>

      <div className="time-text">{formatTime(time)}</div>
      <div className="date-text">{formatDate(time)}</div>
    </div>
  );
}
