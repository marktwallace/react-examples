import React from "react";
import WeatherSection from "../WeatherSection/WeatherSection";
import ZipForm from "../ZipForm/ZipForm";

function WeatherMain() {
  const [zip, setZip] = React.useState("94903");
  const [place, setPlace] = React.useState();
  const [placeWeather, setPlaceWeather] = React.useState({});
  const [selectedPlaceName, setSelectedPlaceName] = React.useState("");

  React.useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) {
          throw new Error("Zip code not found");
        }  
        const data = await response.json();
        console.log({ data });
        if (!data.places || data.places.length === 0) {
          throw new Error("Zip code not found");
        }  
        const newPlace = data.places[0];
        newPlace.zipcode = zip;
        setPlace(newPlace);
        setSelectedPlaceName(newPlace["place name"]);
      } catch (error) {
        alert(error.message);
      }
    }  
    if (zip) {
      fetchPlace();
    }
  }, [zip]);
  
  React.useEffect(() => {
    if (!place) {
      return;
    }
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log({ data });
        const placeWeatherEntry = {
          placename: place["place name"],
          state: place.state,
          zipcode: place.zipcode,
          latitude: place.latitude,
          longitude: place.longitude,
          temperature: data.current_weather.temperature,
          time: data.current_weather.time,
          weathercode: data.current_weather.weathercode,
          winddirection: data.current_weather.winddirection,
          windspeed: data.current_weather.windspeed,
        };
        setPlaceWeather((current) => {
          const clonedData = structuredClone(current);
          const updateKey = place["place name"];
          clonedData[updateKey] = placeWeatherEntry;
          return clonedData;
        });
        setSelectedPlaceName(place["place name"]);
      } catch (error) {
        console.error("Fetch weather failed:", error);
      }
    }
    fetchWeather();
  }, [place]);

  return (
    <main>
      <ZipForm onSubmit={(zip) => setZip(zip)} />
      <div className="main-list-detail">
        <section className="main-list">
          <ul>
            {Object.keys(placeWeather).map((name) => (
              <li
                key={name}
                onClick={() => setSelectedPlaceName(name)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedPlaceName === name ? "bold" : "normal",
                  color: selectedPlaceName === name ? "#007bff" : "#000",
                }}>
                {name}
              </li>
            ))}
          </ul>
        </section>
        <WeatherSection
          className="main-detail"
          weatherDetail={placeWeather[selectedPlaceName]}
        />
      </div>
    </main>
  );
}
export default WeatherMain;
