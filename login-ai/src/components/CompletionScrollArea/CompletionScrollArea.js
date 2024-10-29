import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function CompletionScrollArea({ messages, isTyping }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]); // Add isTyping to ensure scrolling updates

    return (
        <div ref={scrollRef} className="completion-scroll-area" style={{ overflowY: "auto", maxHeight: "400px" }}>
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
            {isTyping && (
                <div className="typing-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            )}
        </div>
    );
}

export default CompletionScrollArea;
