import React from "react";

function WeatherSection({weather}) {
  return (
    <section>
      {JSON.stringify(weather)}
    </section>
  );
}

export default WeatherSection;
