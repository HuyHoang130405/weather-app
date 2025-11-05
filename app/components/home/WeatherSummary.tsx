// WeatherSummary.tsx
// Big summary card; text & icon inherit color. Card is translucent.
"use client";
import { motion } from "framer-motion";

export default function WeatherSummary({ darkMode, data }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl p-6 flex flex-col items-center text-center transition-all bg-white/6 backdrop-blur-sm shadow-sm border border-white/6"
    >
      <h2 className="text-3xl font-bold mb-2">{data?.city ?? "--"}</h2>
      <p className="text-sm opacity-80 mb-4">{data?.desc ?? ""}</p>
      <div className="text-7xl mb-2">
        {data?.icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.desc}
            className="w-20 h-20"
          />
        ) : (
          <div className="w-20 h-20" />
        )}
      </div>
      <p className="text-5xl font-extrabold">{data?.temp ?? "--"}°C</p>
    </motion.div>
  );
}
