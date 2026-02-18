import { useState } from "react";
import { generateCalendar } from "../../services/calendarService";
import "./Calendar.css";

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const weeks = generateCalendar(year, month);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const changeMonth = (offset: number) => {
    let newMonth = month + offset;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const flatDays = weeks.flat();

  return (
    <div>
      <header className="cal__header">
        <button
          type="button"
          className="cal__nav cal__nav--prev"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
          title="Previous month"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="cal__title">
          <span className="cal__month">{monthNames[month]}</span>{" "}
          <span className="cal__year">{year}</span>
        </div>

        <button
          type="button"
          className="cal__nav cal__nav--next"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          title="Next month"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.5 5l7 7-7 7" />
          </svg>
        </button>
      </header>

      <div className="cal__weekdays" aria-hidden="true">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="cal__weekday">
            {d}
          </div>
        ))}
      </div>

      <div
        className="cal__grid"
        role="grid"
        aria-label={`${monthNames[month]} ${year}`}
      >
        {flatDays.map((day, idx) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={idx}
              role="gridcell"
              className={`cal__cell ${day ? "cal__cell--in" : "cal__cell--out"} ${
                isToday ? "cal__cell--today" : ""
              }`}
              aria-selected={isToday ? "true" : "false"}
            >
              <span className="cal__date">{day ?? ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
