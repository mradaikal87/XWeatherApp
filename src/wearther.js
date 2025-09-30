import React, { useState } from "react";
import "./weather.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const Api_key = "533da7d399a14185843191759253009";

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);
    setError(false);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${Api_key}&q=${city}`
      );

      const data = await response.json();

      // Handle invalid city errors
      if (data.error) {
        throw new Error(data.error.message);
      }

      setWeather(data);
    } catch (err) {
      alert("Failed to fetch weather data");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading data...</p>}

      {weather && !error && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
