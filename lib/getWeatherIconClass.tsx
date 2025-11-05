// app/lib/getWeatherIconClass.ts
export function getWeatherIconClass(iconUrl: string, darkMode: boolean) {
  if (!darkMode) return "";

  // ☀️ Trời quang ban ngày
  if (iconUrl.includes("01d"))
    return "brightness-[180%] sepia saturate-[700%] hue-rotate-[15deg] contrast-[120%]";

  // 🌙 Trời quang ban đêm (cam đậm hoàng hôn)
  if (iconUrl.includes("01n"))
    return "brightness-[230%] saturate-[200%] hue-rotate-[320deg] contrast-[125%] sepia-[80%]";

  // ⛅ Mây
  if (iconUrl.match(/02|03|04/))
    return "brightness-[180%] contrast-[110%] saturate-[90%]";

  // 🌧️ Mưa / dông
  if (iconUrl.match(/09|10|11/))
    return "brightness-[250%] contrast-[120%] saturate-[120%]";

  // ❄️ Tuyết
  if (iconUrl.includes("13"))
    return "brightness-[260%] contrast-[120%] saturate-[120%]";

  return "";
}
