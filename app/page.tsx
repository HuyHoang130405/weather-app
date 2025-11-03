"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const apiKey = "YOUR_API_KEY"; // thay bằng key thật

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setWeather(null);
        setForecast([]);
        return;
      }

      setWeather(data);

      // forecast 5 ngày
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter((_: any, idx: number) => idx % 8 === 0); // mỗi 24h
      setForecast(daily);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white flex flex-col items-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 mt-6"
      >
        🌦️ Weather Forecast
      </motion.h1>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-md mb-10 bg-white/20 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition"
        >
          Search
        </button>
      </form>

      {weather ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/20 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
          <p className="text-6xl font-extrabold mb-2">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize mb-4 text-xl">
            {weather.weather[0].description}
          </p>

          <div className="flex justify-around text-sm text-white/90">
            <p>💧 {weather.main.humidity}%</p>
            <p>🌬️ {weather.wind.speed} m/s</p>
            <p>🌡️ {weather.main.feels_like}°C</p>
          </div>
        </motion.div>
      ) : (
        <p className="text-white/80 text-lg">
          Enter a city name to see the weather 🌍
        </p>
      )}

      {/* Forecast section */}
      {forecast.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-10 max-w-3xl">
          {forecast.map((day, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/20 p-4 rounded-2xl text-center backdrop-blur-lg shadow-lg"
            >
              <p className="font-semibold">
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <p className="text-2xl font-bold">
                {Math.round(day.main.temp)}°C
              </p>
              <p className="capitalize text-sm">{day.weather[0].main}</p>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
