const mockWeather = {
    city: "Madrid",
    temp: 31,
    desc: "Sunny",
    rainChance: 0,
    realFeel: 30,
    wind: 0.2,
    uv: 3,
    today: [
      { time: "6:00 AM", temp: 25, icon: "☁️" },
      { time: "9:00 AM", temp: 28, icon: "🌤️" },
      { time: "12:00 PM", temp: 33, icon: "☀️" },
      { time: "3:00 PM", temp: 34, icon: "☀️" },
      { time: "6:00 PM", temp: 32, icon: "☀️" },
      { time: "9:00 PM", temp: 30, icon: "🌤️" },
    ],
    forecast: [
      { day: "Today", desc: "Sunny", max: 36, min: 22, icon: "☀️" },
      { day: "Tue", desc: "Sunny", max: 37, min: 21, icon: "☀️" },
      { day: "Wed", desc: "Sunny", max: 37, min: 21, icon: "☀️" },
      { day: "Thu", desc: "Cloudy", max: 37, min: 21, icon: "☁️" },
      { day: "Fri", desc: "Cloudy", max: 37, min: 21, icon: "☁️" },
      { day: "Sat", desc: "Rainy", max: 37, min: 21, icon: "🌧️" },
      { day: "Sun", desc: "Storm", max: 37, min: 21, icon: "⚡" },
    ],
  };
export default function WeeklyForecast({ darkMode, forecast }: any) {
  return (
    <div
      className={`w-full md:w-64 rounded-2xl p-5 flex flex-col transition-all ${
        darkMode
          ? "bg-slate-800/70 border border-slate-700"
          : "bg-[#f8fafc] border border-[#d8dee4]"
      }`}
    >
      <h3 className="font-semibold mb-3 text-[#2e384d] dark:text-gray-200">
        7-Day Forecast
      </h3>
      <div className="flex flex-col gap-2">
        {mockWeather.forecast.map((d: any, i: number) => (
          <div
            key={i}
            className={`flex justify-between items-center p-3 rounded-xl transition-all ${
              darkMode
                ? "bg-slate-700/60"
                : "bg-[#ffffff] shadow-[0_2px_6px_rgba(0,0,0,0.05)]"
            }`}
          >
            <p className="w-1/3">{d.day}</p>
            <p className="w-1/3 text-center">{d.icon}</p>
            <p className="w-1/3 text-right text-[#2e384d] dark:text-gray-300 text-sm">
              {d.max}/{d.min}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}