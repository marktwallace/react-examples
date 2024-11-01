import React from "react";

function ZipForm({ onSubmit }) {
  const [zip,setZip] = React.useState('')
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(zip)
    setZip('')
  }
  function handleKeyDown(event) {
    if(event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='94903'
        value={zip}
        onChange={event => setZip(event.target.value)}
        onKeyDown={handleKeyDown}></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ZipForm;
