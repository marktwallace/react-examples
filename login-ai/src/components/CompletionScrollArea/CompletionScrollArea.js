import React from "react";
import ReactMarkdown from "react-markdown";

function CompletionScrollArea({ messages }) {
    return (
        <div style={{
            border: "1px solid #ccc",
            padding: "10px",
            height: "200px",
            overflowY: "auto"
        }}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.role === "user" ? "user-message" : "assistant-message"}
                    style={msg.role === "user" ? {
                        border: "1px solid #007bff",
                        borderRadius: "8px",
                        padding: "8px",
                        margin: "8px 0",
                        backgroundColor: "#f0f8ff"
                    } : { margin: "8px 0" }}
                >
                    {msg.role === "assistant" ? (
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                        <pre style={{ margin: 0 }}>{msg.content}</pre>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CompletionScrollArea;
