import React from "react";

function ButtonInput({ onClick }) {
    const [input, setInput] = React.useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onClick(input);
        setInput(""); // Clear the input after sending
    }

    return (
        <form className="button-input" onSubmit={handleSubmit}>
            <textarea
                className="input-field"
                placeholder="Type something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="button-submit">Submit</button>
        </form>
    );
}

export default ButtonInput;
