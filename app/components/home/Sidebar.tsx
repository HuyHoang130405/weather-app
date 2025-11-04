import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ darkMode, setDarkMode }: any) {
  return (
    <aside
      className={`md:w-60 backdrop-blur-xl border-r flex md:flex-col items-center justify-between md:justify-start px-4 py-4 md:py-10 shadow-md transition-all ${
        darkMode
          ? "bg-slate-800/50 border-slate-700"
          : "bg-[#f8fafc]/90 border-[#d8dee4] shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-semibold"
      >
        <span className="text-2xl">🌤️</span>
        <span>Weather</span>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full transition ${
          darkMode
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-[#e2e8f0] hover:bg-[#cbd5e1]"
        }`}
        title="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </aside>
  );
}
