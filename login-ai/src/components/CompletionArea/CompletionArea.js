import React, { useState } from "react";
import CompletionScrollArea from "../CompletionScrollArea/CompletionScrollArea";
import ButtonInput from "../ButtonInput/ButtonInput";

const CHAT_COMPLETION_ENDPOINT = "http://localhost:8000/openai/v1/chat/completions";

function CompletionArea({ authToken, selectedModel }) {
    const [completionText, setCompletionText] = useState('');
    const [messages, setMessages] = useState([]);

    async function handleCompletion(input) {
        const newMessage = { role: "user", content: input };
        const updatedMessages = [...messages, newMessage];
        
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
                    messages: updatedMessages // Include conversation history with new message
                })
            });

            if (response.ok) {
                const data = await response.json();
                const completion = data.choices[0].message.content; // Assuming OpenAI response format

                setCompletionText((prevText) => prevText + "\n" + completion);
                setMessages(updatedMessages.concat({ role: "assistant", content: completion }));
            } else {
                console.error("Failed to fetch chat completion:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching chat completion:", error);
        }
    }

    return (
        <div>
            <CompletionScrollArea completionText={completionText} />
            <ButtonInput onClick={(input) => handleCompletion(input)} />
        </div>
    );
}

export default CompletionArea;
