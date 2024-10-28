import React from "react";

const MODELS_ENDPOINT = "http://localhost:8000/openai/v1/models";

function ModelSelector({ authToken, onSelect }) {
    const [models, setModels] = React.useState([]);
    const [selectedModel, setSelectedModel] = React.useState("");

    React.useEffect(() => {
        async function fetchModels() {
            try {
                const response = await fetch(MODELS_ENDPOINT, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (response.ok) {
                    const modelsData = await response.json();
                    console.log("Fetched models data:", modelsData);

                    // Extract models with a date in the id, sort by date, and take the last 10
                    const datePattern = /\b(\d{4}-\d{2}-\d{2})\b/; // Matches dates in YYYY-MM-DD format
                    const filteredModels = modelsData.data.map((model) => {
                            const match = model.id.match(datePattern);
                            return match
                                ? { ...model, date: new Date(match[0]) }
                                : null;
                        })
                        .filter(item => Boolean(item))
                        .sort((a, b) => b.date - a.date) // descending 
                        .slice(0, 10); // Take the 10 most recent

                    setModels(filteredModels);
                } else {
                    console.error(
                        "Failed to fetch models:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        }

        fetchModels();
    }, [authToken]); // Dependency on authToken, to refetch if it changes

    return (
        <div className="model-selector">
            <label htmlFor="model-select">Select a Model:</label>
            <select
                id="model-select"
                className="select-model"
                value={selectedModel}
                onChange={(e) => {
                    setSelectedModel(e.target.value)
                    onSelect(e.target.value)
                }}>
                <option value="">--Select a model--</option>
                {models.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.id}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ModelSelector;
