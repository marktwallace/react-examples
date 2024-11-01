import React from "react";

function PlaceSection({place}) {
  return (
    <section>
      <p>{place["place name"]}, {place.state}</p>
      <p>Lat/Long: {place.latitude}/{place.longitude}</p>
    </section>
  );
}

export default PlaceSection;
