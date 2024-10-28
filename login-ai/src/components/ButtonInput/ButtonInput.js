import React from "react";

function ButtonInput({ onClick }) {
    const [input, setInput] = React.useState("");

    function handleButtonClick() {
        onClick(input);
        setInput(""); // Clear the input after sending
    }

    return (
        <div className="button-input">
            <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type something..."
            />
            <button onClick={handleButtonClick}>Submit</button>
        </div>
    );
}

export default ButtonInput;
