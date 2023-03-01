import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({
    main: {},
    weather: [{}],
});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    if (!searchTerm) {
      console.log("Please enter a search term");
      return;
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&&units=metric&appid=276efd8c97b9c3ca5c1432de5e0b87e7`
    );
    const data = await response.json();
    console.log(data);
    setWeather(data);
  };

  return (
    <div className="home-container">
      <div className="header">
        <img src="https://static.vecteezy.com/system/resources/previews/010/989/526/original/rainy-weather-3d-rendering-isolated-on-transparent-background-ui-ux-icon-design-web-and-app-trend-png.png" alt="icon" />
        <h2>weather app</h2>
      </div>
      <div className="main-container">
        <div className="search">
          <input
            type="text"
            placeholder="search for cities"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={fetchData}>Search</button>
        </div>

        {
        weather && Object.keys(weather.main).length !== 0 ?
        (
          <div className="card">
            <h2>{weather.name}</h2>
            <h1>{`${Math.round(weather.main.temp_max)}`}&deg;C</h1>
            <h2>{weather.weather[0].main}</h2>
            {/* <img src={`${weather.weather[0].icon}`} alt=""  /> */}
            <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
            <h6>{weather.weather[0].description}</h6>
          </div>
        ) : (
          <h2>.</h2>
        )}
      </div>
    </div>
  );
}

export default App;
