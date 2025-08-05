// src/components/MemoBoard.jsx

import React, { useEffect, useState } from 'react';
import { getUpcomingHolidays } from '../utils/portugueseHolidays';

const MemoBoard = () => {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const upcoming = await getUpcomingHolidays();
        setHolidays(upcoming);
      } catch (err) {
        setError("Failed to load holidays.");
        console.error(err);
      }
    };

    fetchHolidays();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-PT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <section className="memo-board">
      <h3>📌 Upcoming Holidays in Portugal</h3>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : holidays.length === 0 ? (
        <p>No holidays in the next 30 days.</p>
      ) : (
        <ul>
          {holidays.map((holiday, idx) => (
            <li key={idx}>
              <strong>{holiday.name}</strong> — {formatDate(holiday.date)}
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: '1em', fontStyle: 'italic' }}>
        ⚠️ Consider adjusting shift schedules and coverage.
      </p>
    </section>
  );
};

export default MemoBoard;

