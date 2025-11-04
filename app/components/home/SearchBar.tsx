import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar({ darkMode, city, setCity, onSearch }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full rounded-xl shadow p-3 flex items-center transition-all ${
        darkMode
          ? "bg-slate-800/70 border border-slate-700"
          : "bg-[#f8fafc] border border-[#d8dee4]"
      }`}
    >
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for city..."
        className="flex-1 bg-transparent outline-none px-2 text-[#1a1f2b] dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <button
        onClick={onSearch}
        className="ml-2 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
      >
        Search
      </button>
    </motion.div>
  );
}
