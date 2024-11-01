import React from "react";
import PlaceSection from "../PlaceSection/PlaceSection";
import WeatherSection from "../WeatherSection/WeatherSection";
import ZipForm from "../ZipForm/ZipForm";

function WeatherMain() {
  const [zip, setZip] = React.useState("94903");
  const [place, setPlace] = React.useState();
  const [weather, setWeather] = React.useState();

  React.useEffect(() => {
    async function fetchPlace() {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
      const data = await response.json();
      console.log({ data });
      setPlace(data.places[0]);
    }
    fetchPlace();
  }, [zip]);

  React.useEffect(() => {
    if (!place) {
      return;
    }
    async function fetchWeather() {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true`
      );
      const data = await response.json();
      console.log({ data });
      setWeather(data.current_weather);
    }
    fetchWeather();
  }, [place]);

  return (
    <main>
      <ZipForm onSubmit={(zip) => setZip(zip)} />
      {place && <PlaceSection place={place} />}
      {weather && <WeatherSection weather={weather} />}
    </main>
  );
}

export default WeatherMain;
