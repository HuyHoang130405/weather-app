export async function getWeatherByCity(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error("Missing API key");

  // Lấy tọa độ thành phố qua OpenWeather Geocoding API
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},VN&limit=1&appid=${apiKey}`
  );

  const geoData = await geoRes.json();
  if (!geoData?.length) throw new Error("City not found");

  const { lat, lon, name } = geoData[0];

  // Lấy dữ liệu thời tiết hiện tại
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const weatherData = await weatherRes.json();

  // Lấy dự báo 5 ngày (3 giờ/lần)
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const forecastData = await forecastRes.json();

  return {
    city: name,
    weather: {
      city: name,
      temp: Math.round(weatherData.main.temp),
      realFeel: Math.round(weatherData.main.feels_like),
      humidity: weatherData.main.humidity,
      wind: weatherData.wind.speed,
      desc: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon,
      coord: { lat, lon },
    },
    forecast: forecastData,
  };
}
