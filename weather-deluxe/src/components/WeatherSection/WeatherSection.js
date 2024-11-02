import React from "react";

function WeatherSection({ weatherDetail, ...delegated }) {
  if (!weatherDetail) return <p>No weather data available.</p>;

  return (
    <section {...delegated}>
      <h2>Weather</h2>
      <ul>
        <li><strong>Place:</strong> {weatherDetail.placename}</li>
        <li><strong>State:</strong> {weatherDetail.state}</li>
        <li><strong>Zipcode:</strong> {weatherDetail.zipcode}</li>        
        <li><strong>Latitude:</strong> {weatherDetail.latitude}</li>
        <li><strong>Longitude:</strong> {weatherDetail.longitude}</li>
        <li><strong>Temperature:</strong> {weatherDetail.temperature}°C</li>
        <li><strong>Time:</strong> {new Date(weatherDetail.time).toLocaleString()}</li>
        <li><strong>Weather Code:</strong> {weatherDetail.weathercode}</li>
        <li><strong>Wind Direction:</strong> {weatherDetail.winddirection}°</li>
        <li><strong>Wind Speed:</strong> {weatherDetail.windspeed} km/h</li>
      </ul>
    </section>
  );
}

export default WeatherSection;
