import React from "react";
import PlaceDetail from "../PlaceDetail/PlaceDetail";
import ZipForm from "../ZipForm/ZipForm";

function PlacesMain() {
  const [zip, setZip] = React.useState("94903");
  const [places, setPlaces] = React.useState({});

  React.useEffect(() => {
    async function fetchPlace() {
      if(!zip || places[zip]) {
        return;
      }
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        console.log({response})
        if (!response.ok) {
          throw new Error(`Zip code not found: ${zip}`);
        }
        const data = await response.json();
        if(!data.places || data.places.length === 0) {
          throw new Error(`Zip code has no places: ${zip}`);          
        }
        const newPlace = data.places[0]
        setPlaces((current) => {
          const nextPlaces = structuredClone(current);
          nextPlaces[zip] = newPlace;
          return nextPlaces;
        })
      } catch (err) {
        alert(err.message);
      }
    }
    fetchPlace();
  }, [zip]);

  return (
    <main>
      <ZipForm onSubmit={(newZip) => setZip(newZip)}/>
      <div className="main-list-detail">
        <section className="main-list">
          <ul>
            {Object.keys(places).map((key) => (
              <li
                key={key}
                onClick={() => setZip(key)}
                style={{
                  cursor: "pointer",
                  fontWeight: zip === key ? "bold" : "normal",
                }}
              >{key}</li>
            ))}
          </ul>
        </section>
        <PlaceDetail className="main-detail" place={places[zip]} />
      </div>
    </main>
  );
}

export default PlacesMain;
