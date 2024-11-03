import React from "react";

function PlaceDetail({place,...delegated}) {
  if(!place) {
    return <p>No Place Data!</p>;
  }
  return <section {...delegated}>
    <h2>Place Detail</h2>
    <ul>
      <li><strong>City:</strong> {place["place name"]}</li>
      <li><strong>State:</strong> {place.state}</li>
      <li><strong>Latitude:</strong> {place.latitude}</li>
      <li><strong>Longitude:</strong> {place.longitude}</li>
    </ul>
  </section>;
}

export default PlaceDetail;
