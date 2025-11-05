// Sidebar.tsx
// Sidebar is translucent with subtle border; toggle button stays simple.
"use client";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ darkMode, setDarkMode }: any) {
  return (
    <aside className="md:w-60 backdrop-blur-xl border-r flex md:flex-col items-center justify-between md:justify-start px-4 py-4 md:py-10 transition-all shadow-sm bg-white/6 border-white/6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-semibold"
      >
        <span className="text-2xl">🌤️</span>
        <span>Weather</span>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full transition bg-white/10 border border-white/6 shadow-sm cursor-pointer"
        title="Toggle dark mode"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>
    </aside>
  );
}
