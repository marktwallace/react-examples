import React from "react";

function CompletionScrollArea({ completionText }) {
    return (
        <div style={{ 
            border: "1px solid #ccc", 
            padding: "10px", 
            height: "200px", 
            overflowY: "auto" 
        }}>
            <pre>{completionText}</pre>
        </div>
    );
}

export default CompletionScrollArea;
