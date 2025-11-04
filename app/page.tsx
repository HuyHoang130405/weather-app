"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/home/Sidebar";
import SearchBar from "./components/home/SearchBar";
import WeatherSummary from "./components/home/WeatherSummary";
import TodayForecast from "./components/home/TodayForecast";
import AirConditions from "./components/home/AirConditions";
import WeeklyForecast from "./components/home/WeeklyForecast";
import { normalizeVietnamese } from "@/lib/utils";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("Hồ Chí Minh");
  const [weather, setWeather] = useState<unknown>(null);
  const [forecast, setForecast] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  async function fetchWeather(cityName: string) {
    try {
      setLoading(true);
      const normalized = normalizeVietnamese(cityName);
      const res = await fetch(`/api/weather?city=${encodeURIComponent(normalized)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error fetching weather");

      setWeather(data.weather);
      setForecast(data.forecast);
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        alert(err.message);
      } else {
        console.error(err);
        alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={darkMode ? "dark" : "light"}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ease-in-out ${darkMode
            ? "dark bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-gray-100"
            : "bg-[#CFDFEF] text-[#1a1f2b]"
          }`}
      >
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        <section className="flex-1 flex flex-col md:flex-row gap-6 p-6 overflow-y-auto">
          <div className="flex-1 flex flex-col gap-6">
            <SearchBar
              darkMode={darkMode}
              city={city}
              setCity={setCity}
              onSearch={() => fetchWeather(city)}
            />

            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-lg mt-10"
              >
                ⏳ Loading weather...
              </motion.div>
            ) : weather ? (
              <>
                <WeatherSummary darkMode={darkMode} data={weather} />
                <TodayForecast darkMode={darkMode} data={forecast} />
                <AirConditions darkMode={darkMode} data={weather} />
              </>
            ) : (
              <p className="text-center text-gray-500">Search a city</p>
            )}
          </div>

          <WeeklyForecast darkMode={darkMode} />
        </section>
      </motion.main>
    </AnimatePresence>
  );
}
