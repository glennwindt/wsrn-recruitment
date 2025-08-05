// src/utils/portugueseHolidays.js

const API_URL =
  "https://openholidaysapi.org/Holidays?countryIsoCode=PT&regionIsoCode=PT-11&languageIsoCode=EN";

const fallbackHolidays = {
  "2025": [
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-04-20", name: "Easter Sunday" },
    { date: "2025-04-21", name: "Easter Monday" },
    { date: "2025-04-25", name: "Liberty Day" },
    { date: "2025-05-01", name: "Labour Day" },
    { date: "2025-06-10", name: "Portugal Day" },
    { date: "2025-06-13", name: "Saint Anthony's Day" }, // Lisbon only
    { date: "2025-08-15", name: "Assumption Day" },
    { date: "2025-10-05", name: "Republic Day" },
    { date: "2025-11-01", name: "All Saints' Day" },
    { date: "2025-12-01", name: "Restoration of Independence" },
    { date: "2025-12-08", name: "Immaculate Conception" },
    { date: "2025-12-25", name: "Christmas Day" },
  ],
};

let cachedHolidays = {};

export async function fetchLisbonHolidays(year) {
  if (cachedHolidays[year]) return cachedHolidays[year];

  try {
    const response = await fetch(
      `${API_URL}&validFrom=${year}-01-01&validTo=${year}-12-31`
    );
    const data = await response.json();

    const holidays = data
      .filter((h) => h.isPublicHoliday)
      .map((h) => ({
        name: h.name,
        date: h.date,
        isPublicHoliday: h.isPublicHoliday,
      }));

    cachedHolidays[year] = holidays;
    return holidays;
  } catch (error) {
    console.warn(`Holiday API failed for ${year}. Using fallback.`);
    return fallbackHolidays[year] || [];
  }
}

export async function isHoliday(dateStr) {
  const year = dateStr.slice(0, 4);
  const holidays = await fetchLisbonHolidays(year);
  return holidays.some((h) => h.date === dateStr);
}

export async function getUpcomingHolidays(year = new Date().getFullYear(), limit = 5) {
  const holidays = await fetchLisbonHolidays(year);
  const today = new Date().toISOString().split("T")[0];
  return holidays.filter((h) => h.date >= today).slice(0, limit);
}

