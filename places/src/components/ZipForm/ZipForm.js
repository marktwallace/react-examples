import React from "react";

function ZipForm({onSubmit}) {
  const [zip,setZip] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(zip);
    setZip("")
  }
  return <form className="zipform" onSubmit={handleSubmit}>
    <input className="zipform-input"
      placeHolder="94903"
      value={zip}
      onChange={(e) => setZip(e.target.value)} />
    <button className="zipform-button" type="submit">Add Zipcode</button>
  </form>;
}

export default ZipForm;
