import React from "react";
import CompletionScrollArea from "../CompletionScrollArea/CompletionScrollArea";
import ButtonInput from "../ButtonInput/ButtonInput";

function CompletionArea({ authToken, selectedModel }) {
    const [completionText, setCompletionText] = React.useState('')

    function handleCompletion(input) {
        console.log({ input })
        setCompletionText((value) => (value + "\n" + input) )
    }

    return (
        <div>
            <CompletionScrollArea completionText={completionText} />
            <ButtonInput onClick={(input) => handleCompletion(input)} />
        </div>
    );
}

export default CompletionArea;
