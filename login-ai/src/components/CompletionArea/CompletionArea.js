import React, { useState } from "react";
import CompletionScrollArea from "../CompletionScrollArea/CompletionScrollArea";
import ButtonInput from "../ButtonInput/ButtonInput";

const CHAT_COMPLETION_ENDPOINT = "http://localhost:8000/openai/v1/chat/completions";

function CompletionArea({ authToken, selectedModel }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    async function handleCompletion(input) {
        const userMessage = { role: "user", content: input };
        
        // Display the user message immediately
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Show typing indicator without adding "..." content
        setIsTyping(true);

        try {
            const response = await fetch(CHAT_COMPLETION_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    model: selectedModel,
                    temperature: 0.7,
                    top_p: 1.0,
                    max_tokens: 150,
                    presence_penalty: 0.5,
                    frequency_penalty: 0.5,
                    messages: [...messages, userMessage]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch chat completion:", errorData);
                alert(`Error: ${errorData.message}`);
                return;
            }

            const data = await response.json();
            const assistantMessage = { role: "assistant", content: data.choices[0].message.content };

            // Remove typing indicator and add assistant's response
            setIsTyping(false);
            setMessages((prevMessages) => [
                ...prevMessages,
                assistantMessage
            ]);
        } catch (error) {
            console.error("Error fetching chat completion:", error);
            alert("An error occurred while fetching the completion. Please try again.");
            setIsTyping(false);
        }
    }

    return (
        <div>
            <CompletionScrollArea messages={messages} isTyping={isTyping} />
            <ButtonInput onClick={(input) => handleCompletion(input)} />
        </div>
    );
}

export default CompletionArea;
