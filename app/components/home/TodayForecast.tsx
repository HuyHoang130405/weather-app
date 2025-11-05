// TodayForecast.tsx
// Hourly cards use translucent backgrounds and inherit text color.
"use client";
import { getWeatherIconClass } from "@/lib/getWeatherIconClass";
import { motion } from "framer-motion";

interface Props {
  darkMode: boolean;
  data: any;
}

export default function TodayForecast({ darkMode, data }: Props) {
  if (!data || !data.list) return null;

  // Lấy 6 mốc thời gian đầu tiên (3h mỗi mốc)
  const hourly = data.list.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-4 shadow-sm bg-white/6 backdrop-blur-sm border border-white/6"
    >
      <h2 className="text-lg font-semibold mb-3">Today’s Forecast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
        {hourly.map((h: any, i: number) => {
          const time = new Date(h.dt * 1000).getHours();
          const temp = Math.round(h.main.temp);
          const icon = h.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          const filterClass = getWeatherIconClass(iconUrl, darkMode);

          return (
            <div key={i} className="rounded-xl p-3 bg-white/8">
              <p className="text-sm font-medium opacity-85">{time}:00</p>
              <img
                src={iconUrl}
                alt="icon"
                className={`w-12 h-12 mx-auto ${filterClass}`}
              />
              <p className="font-semibold">{temp}°C</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
