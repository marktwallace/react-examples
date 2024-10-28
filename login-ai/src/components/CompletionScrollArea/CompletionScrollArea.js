import React from "react";
import ReactMarkdown from "react-markdown";

function CompletionScrollArea({ messages }) {
    return (
        <div className="completion-scroll-area">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.role === "user" ? "user-message" : "assistant-message"}
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
