"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar({ darkMode, city, setCity, onSearch }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
      className="w-full rounded-xl p-3 mbl:flex items-center gap-3 transition-all bg-white/6 backdrop-blur-sm shadow-sm border border-white/6"
    >
      <div className="mbs:flex mbs:items-center mbl:flex mbl:items-center w-full">
        <Search size={18} className="opacity-80" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for city..."
          className="flex-1 bg-transparent outline-none px-2 text-current placeholder:opacity-60"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </div>
      <button
        onClick={onSearch}
        className={`mbs:mt-4 mbs:w-full mbl:w-auto mbl:mt-0 mbl:ml-2 px-4 py-2 rounded-xl font-medium backdrop-blur-md transition-all duration-300 cursor-pointer
    ${darkMode
            ? "bg-slate-800/60 hover:bg-slate-700/70 text-slate-100 border border-slate-700 shadow-sm hover:shadow-slate-700/30"
            : "bg-white/70 hover:bg-white/90 text-slate-800 border border-slate-200 shadow-sm hover:shadow-slate-300/50"
          }`}
      >
        Search
      </button>
    </motion.div>
  );
}
