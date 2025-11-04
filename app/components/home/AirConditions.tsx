import { motion } from "framer-motion";

export default function AirConditions({ darkMode, data }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-5 transition-all ${
        darkMode
          ? "bg-slate-800/70 border border-slate-700"
          : "bg-[#f8fafc] border border-[#d8dee4]"
      }`}
    >
      <h3 className="font-semibold mb-3 text-[#2e384d] dark:text-gray-200">
        Air Conditions
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-[#2e384d] dark:text-gray-200">
        <div>
          🌡️ <p>Real Feel</p>
          <p className="font-bold">{data.realFeel}°</p>
        </div>
        <div>
          💧 <p>Humidity</p>
          <p className="font-bold">{data.humidity}%</p>
        </div>
        <div>
          💨 <p>Wind</p>
          <p className="font-bold">{data.wind} km/h</p>
        </div>
        <div>
          ☁️ <p>Condition</p>
          <p className="font-bold">{data.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
