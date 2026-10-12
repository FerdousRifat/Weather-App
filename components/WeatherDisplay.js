"use client";

import { useEffect, useState } from "react";

const DEFAULT_CITY = { name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125 };

// WMO weather codes -> label + emoji
function describe(code) {
  if (code === 0) return ["Clear sky", "☀️"];
  if ([1, 2].includes(code)) return ["Partly cloudy", "⛅"];
  if (code === 3) return ["Overcast", "☁️"];
  if ([45, 48].includes(code)) return ["Fog", "🌫️"];
  if ([51, 53, 55, 56, 57].includes(code)) return ["Drizzle", "🌦️"];
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return ["Rain", "🌧️"];
  if ([71, 73, 75, 77, 85, 86].includes(code)) return ["Snow", "❄️"];
  if ([95, 96, 99].includes(code)) return ["Thunderstorm", "⛈️"];
  return ["Unknown", "🌡️"];
}

function formatTime(iso) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/15 p-4 text-center backdrop-blur">
      <div className="text-2xl">{icon}</div>
      <div className="mt-1 text-sm text-sky-100">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

export default function WeatherDisplay() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
          `&hourly=temperature_2m,weather_code&forecast_days=2&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather request failed");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError("Could not load weather data. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [city]);

  async function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setError("");
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1&language=en&format=json`
      );
      const json = await res.json();
      if (!json.results || json.results.length === 0) {
        setError(`No city found for "${q}".`);
        return;
      }
      const r = json.results[0];
      setCity({ name: r.name, country: r.country || "", latitude: r.latitude, longitude: r.longitude });
      setQuery("");
    } catch {
      setError("City search failed. Please try again.");
    }
  }

  const current = data?.current;
  const units = data?.current_units;
  const [label, icon] = current ? describe(current.weather_code) : ["", ""];

  // next 12 hours from now
  let upcoming = [];
  if (data) {
    const nowIdx = data.hourly.time.findIndex((t) => new Date(t) >= new Date(current.time));
    const start = nowIdx === -1 ? 0 : nowIdx;
    upcoming = data.hourly.time.slice(start, start + 12).map((t, i) => ({
      time: t,
      temp: data.hourly.temperature_2m[start + i],
      code: data.hourly.weather_code[start + i],
    }));
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-2 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city (e.g. London, Tokyo)"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-sky-600 px-6 py-2 font-medium text-white transition hover:bg-sky-700"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 p-6 text-white shadow-xl sm:p-8">
        {loading && !data ? (
          <p className="py-10 text-center text-lg">Loading weather...</p>
        ) : current ? (
          <>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {city.name}
                  {city.country ? `, ${city.country}` : ""}
                </h2>
                <p className="text-sky-100">{label}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-6xl sm:text-7xl" aria-hidden>{icon}</span>
                <span className="text-5xl font-bold sm:text-6xl">
                  {Math.round(current.temperature_2m)}
                  {units.temperature_2m}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Stat icon="🌡️" label="Temperature" value={`${current.temperature_2m} ${units.temperature_2m}`} />
              <Stat icon="💧" label="Humidity" value={`${current.relative_humidity_2m} ${units.relative_humidity_2m}`} />
              <Stat icon="💨" label="Wind Speed" value={`${current.wind_speed_10m} ${units.wind_speed_10m}`} />
              <Stat icon="⏱️" label="Interval" value={`${current.interval} ${units.interval}`} />
            </div>

            <p className="mt-4 text-center text-sm text-sky-100">
              🕒 Time: {formatTime(current.time)} ({data.timezone_abbreviation})
            </p>
          </>
        ) : null}
      </div>

      {upcoming.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-lg font-semibold">Next 12 hours</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {upcoming.map((h) => (
              <div key={h.time} className="rounded-xl bg-white p-3 text-center shadow">
                <div className="text-xs text-slate-500">
                  {new Date(h.time).toLocaleTimeString("en-US", { hour: "numeric" })}
                </div>
                <div className="my-1 text-2xl">{describe(h.code)[1]}</div>
                <div className="font-semibold">{Math.round(h.temp)}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
