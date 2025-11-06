// WeeklyForecast.tsx
// Uses grouped 3h forecast to calculate daily max/min.
// Boxes are translucent and text inherits color.
"use client";
import { getWeatherIconClass } from "@/lib/getWeatherIconClass";
import { motion } from "framer-motion";

export default function WeeklyForecast({ darkMode, forecast }: any) {
  if (!forecast || !forecast.list) {
    return (
      <div className="w-full md:w-64 rounded-2xl p-5 flex flex-col transition-all bg-white/6 backdrop-blur-sm border border-white/6">
        <h3 className="font-semibold mb-3">7-Day Forecast</h3>
        <p className="text-sm opacity-80">No forecast data available</p>
      </div>
    );
  }

  // Gom nhóm dữ liệu theo ngày (YYYY-MM-DD)
  const dailyGroups: Record<string, any[]> = {};
  forecast.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyGroups[date]) dailyGroups[date] = [];
    dailyGroups[date].push(item);
  });

  // Tạo mảng dailyData (max/min, icon đại diện)
  const dailyData = Object.entries(dailyGroups)
    .slice(0, 7)
    .map(([date, items]: [string, any[]]) => {
      const tempsMax = items.map((i) => i.main.temp_max);
      const tempsMin = items.map((i) => i.main.temp_min);
      const max = Math.round(Math.max(...tempsMax));
      const min = Math.round(Math.min(...tempsMin));

      // Lấy mốc giữa ngày làm đại diện (hoặc gần 12:00)
      const middleIndex = Math.floor(items.length / 2);
      const weather = items[middleIndex].weather[0];
      const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;

      const day = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      return { day, desc: weather.main, max, min, iconUrl };
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full md:w-64 rounded-2xl p-5 flex flex-col transition-all bg-white/6 backdrop-blur-sm shadow-sm border border-white/6"
    >
      <h3 className="text-lg font-semibold mb-3">7-Day Forecast</h3>
      <div className="flex flex-col gap-2">
        {dailyData.map((d: any, i: number) => (
          <div key={i} className="shadow-sm flex justify-between items-center p-3 rounded-xl bg-white/8">
            <p className="w-1/3">{d.day}</p>
            <div className="w-1/3 text-center">
              <img 
                src={d.iconUrl} 
                alt={d.desc} 
                className={`inline-block w-12 h-12 ${getWeatherIconClass(d.iconUrl, darkMode)}`}
              />
            </div>
            <p className="w-1/3 text-right text-sm">
              {d.max}/{d.min}°C
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
