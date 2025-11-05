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
import toast from "react-hot-toast";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("Hồ Chí Minh");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Lấy city & theme từ localStorage khi load
  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    const savedTheme = localStorage.getItem("pref-dark");

    if (savedCity) setCity(savedCity);
    if (savedTheme) setDarkMode(savedTheme === "1");

    // fetch weather sau khi khôi phục city
    fetchWeather(savedCity || "Hồ Chí Minh");
  }, []);

  // ✅ Lưu theme mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("pref-dark", darkMode ? "1" : "0");
  }, [darkMode]);

  // ✅ Lưu city mỗi khi đổi
  useEffect(() => {
    if (city) localStorage.setItem("lastCity", city);
  }, [city]);

  async function fetchWeather(cityName: string) {
    try {
      setLoading(true);
      const normalized = normalizeVietnamese(cityName);
      const res = await fetch(`/api/weather?city=${encodeURIComponent(normalized)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error fetching weather");

      setWeather(data.weather);
      setForecast(data.forecast);
      toast.success(`Loaded weather for ${cityName}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to load weather data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.995 }}
        transition={{ duration: 0.45 }}
        className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ease-in-out ${darkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-gray-100"
          : "bg-gradient-to-br from-[#EAF3FF] via-[#D9E6F5] to-[#C9D9EE] text-[#1e293b]"
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
                className="flex justify-center items-center mt-20"
              >
                <div
                  className={`w-12 h-12 border-4 rounded-full animate-spin ${darkMode
                      ? "border-gray-600 border-t-white"
                      : "border-gray-300 border-t-blue-500"
                    }`}
                ></div>
              </motion.div>
            ) : weather ? (
              <>
                <WeatherSummary darkMode={darkMode} data={weather} />
                <TodayForecast darkMode={darkMode} data={forecast} />
                <AirConditions darkMode={darkMode} data={weather} />
              </>
            ) : (
              <p className="text-center opacity-80">Search a city</p>
            )}
          </div>

          <WeeklyForecast darkMode={darkMode} forecast={forecast} />
        </section>
      </motion.main>
    </AnimatePresence>
  );
}
