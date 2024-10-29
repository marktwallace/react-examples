import React from "react";

function ButtonInput({ onClick }) {
    const [input, setInput] = React.useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onClick(input);
        setInput(""); // Clear the input after sending
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    return (
        <form className="button-input" onSubmit={handleSubmit}>
            <textarea
                className="input-field"
                placeholder="Type something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown} // Listen for Enter key

            />
            <button type="submit" className="button-submit">Submit</button>
        </form>
    );
}

export default ButtonInput;
