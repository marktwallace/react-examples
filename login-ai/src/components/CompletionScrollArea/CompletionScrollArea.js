import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function CompletionScrollArea({ messages }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={scrollRef} className="completion-scroll-area">
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
