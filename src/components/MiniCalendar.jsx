import { useState } from 'react';
import { ChevLIcon, ChevRIcon } from './Icons';

const MONTHS   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_ABBR = ['Mo','Tu','We','Th','Fr','Sa','Su'];
const EVENT_DAYS = [3, 7, 11, 15, 18, 22, 26]; // demo event days

/**
 * Interactive mini calendar widget.
 * Highlights today and shows demo event dots.
 */
export default function MiniCalendar() {
  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth    = new Date(year, month + 1, 0).getDate();

  // Build cell array: nulls for leading blanks, then day numbers
  const cells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      {/* Header */}
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth}><ChevLIcon /></button>
        <h4>{MONTHS[month]} {year}</h4>
        <button className="cal-nav" onClick={nextMonth}><ChevRIcon /></button>
      </div>

      {/* Day name row + day cells */}
      <div className="cal-grid">
        {DAY_ABBR.map(d => (
          <div key={d} className="cal-dayname">{d}</div>
        ))}

        {cells.map((day, i) => {
          if (day === null) return <div key={i} className="cal-day empty" />;

          const isToday = (
            day === now.getDate() &&
            month === now.getMonth() &&
            year  === now.getFullYear()
          );
          const hasEvent = EVENT_DAYS.includes(day);

          return (
            <div
              key={i}
              className={[
                'cal-day',
                isToday   ? 'today'     : '',
                hasEvent  ? 'has-event' : '',
              ].filter(Boolean).join(' ')}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
