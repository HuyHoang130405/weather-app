// AirConditions.tsx
// Minimal theme: box uses translucent background, text inherits root color.
// Keep "darkMode" prop (no longer used for styling heavy changes).
"use client";
import { motion } from "framer-motion";

export default function AirConditions({ darkMode, data }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl p-5 transition-all bg-white/6 backdrop-blur-sm shadow-sm border border-white/6"
    >
      <h2 className="font-semibold mb-3 text-lg">Air Conditions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div>
          <div className="text-sm opacity-80">🌡️ Real Feel</div>
          <div className="font-bold mt-1">{data?.realFeel ?? "--"}°</div>
        </div>
        <div>
          <div className="text-sm opacity-80">💧 Humidity</div>
          <div className="font-bold mt-1">{data?.humidity ?? "--"}%</div>
        </div>
        <div>
          <div className="text-sm opacity-80">💨 Wind</div>
          <div className="font-bold mt-1">{data?.wind ?? "--"} km/h</div>
        </div>
        <div>
          <div className="text-sm opacity-80">☁️ Condition</div>
          <div className="font-bold mt-1">{data?.desc ?? "--"}</div>
        </div>
      </div>
    </motion.div>
  );
}
