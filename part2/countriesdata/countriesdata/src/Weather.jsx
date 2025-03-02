import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;  // Secure API Key

  useEffect(() => {
    if (!capital) return;
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
      .then(response => setWeather(response.data))
      .catch(error => console.error("Weather API error:", error));
  }, [capital]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p><b>Temperature:</b> {weather.main.temp}°C</p>
      <p><b>Condition:</b> {weather.weather[0].description}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
    </div>
  );
};

export default Weather;
