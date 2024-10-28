import React from 'react';
import Header from "../Header";
import LoginDialog from '../LoginDialog';
import NewAccountDialog from '../NewAccountDialog/NewAccountDialog';
import ModelSelector from '../ModelSelector/ModelSelector';
import CompletionArea from '../CompletionArea/CompletionArea';

function App() {
    const [userId, setUserID] = React.useState("");
    const [authToken, setAuthToken] = React.useState("");
    const [inRegistration, setInRegistration] = React.useState(false);
    const [selectedModel, setSelectedModel] = React.useState("");

    return (
        <div className="wrapper">
            <Header>Login AI</Header>
            {!userId && (
                !inRegistration ? (
                    <LoginDialog 
                        onLogin={(id,jwt) => { 
                            setUserID(id);
                            setAuthToken(jwt);
                        }}
                        onRegister={() => setInRegistration(true)}/>
                ) : (
                    <NewAccountDialog 
                        onRegisterComplete={() => setInRegistration(false)}/>
                )
            )}
            {userId && (
                <ModelSelector
                    authToken={authToken} 
                    onSelect={(model) => setSelectedModel(model)}/>
            )}
            {selectedModel && (
                <CompletionArea
                    authToken={authToken}
                    selectedModel={selectedModel} />
            )}
        </div>
    );
}

export default App;
