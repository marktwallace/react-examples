import React from "react";

function ZipForm({ onSubmit }) {
  const [zip, setZip] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(zip);
    setZip("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-form">
      <input
        className="input-field"
        placeholder="94903"
        value={zip}
        onChange={(event) => setZip(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="button-submit">Add Zipcode</button>
    </form>
  );
}

export default ZipForm;
