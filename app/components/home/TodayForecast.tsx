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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`rounded-2xl p-4 shadow-md ${
        darkMode ? "bg-slate-800/70" : "bg-white/70"
      } backdrop-blur`}
    >
      <h2 className="text-lg font-semibold mb-3">Today’s Forecast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
        {hourly.map((h: any, i: number) => {
          const time = new Date(h.dt * 1000).getHours();
          const temp = Math.round(h.main.temp);
          const icon = h.weather[0].icon;

          return (
            <div
              key={i}
              className={`rounded-xl p-3 ${
                darkMode ? "bg-slate-700/60" : "bg-blue-100/60"
              }`}
            >
              <p className="text-sm font-medium">{time}:00</p>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="icon"
                className="w-10 h-10 mx-auto"
              />
              <p className="font-semibold">{temp}°C</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
