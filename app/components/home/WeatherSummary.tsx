import { motion } from "framer-motion";

export default function WeatherSummary({ darkMode, data }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-6 flex flex-col items-center text-center transition-all ${
        darkMode
          ? "bg-slate-800/70 border border-slate-700"
          : "bg-[#f8fafc] border border-[#d8dee4] shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
      }`}
    >
      <h2 className="text-3xl font-bold mb-2">{data.city}</h2>
      <p className="text-gray-500 dark:text-gray-300 mb-4">{data.desc}</p>
      <div className="text-7xl mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.desc}
          className="w-20 h-20"
        />
      </div>
      <p className="text-5xl font-extrabold">{data.temp}°C</p>
    </motion.div>
  );
}
