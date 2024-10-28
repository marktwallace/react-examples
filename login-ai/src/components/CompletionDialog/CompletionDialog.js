import React, { useState, useEffect } from 'react';

const MODELS_ENDPOINT="http://localhost:8000/openai/v1/models"

function CompletionDialog({ userId, authToken }) {
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");

    useEffect(() => {
        async function fetchModels() {
            try {
                const response = await fetch(MODELS_ENDPOINT, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });

                if (response.ok) {
                    const modelsData = await response.json();
                    setModels(modelsData); // Assuming the response is an array of models
                } else {
                    console.error("Failed to fetch models:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        }

        fetchModels();
    }, [authToken]); // Dependency on authToken, to refetch if it changes

    return (
        <div>
            <p>User Id: {userId}</p>
            <label htmlFor="model-select">Select a Model:</label>
            <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
            >
                <option value="">--Select a model--</option>
                {models.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.name || model.id} {/* Display model name or ID */}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CompletionDialog;
