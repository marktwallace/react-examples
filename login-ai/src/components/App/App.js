import React from 'react';
import Header from "../Header";
import LoginDialog from '../LoginDialog';
import NewAccountDialog from '../NewAccountDialog/NewAccountDialog';
import CompletionDialog from '../CompletionDialog/CompletionDialog';

function App() {
    const [userId, setUserID] = React.useState("");
    const [authToken, setAuthToken] = React.useState("");
    const [inRegistration, setInRegistration] = React.useState(false);

    return (
        <div className="wrapper">
            <Header />
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
                <CompletionDialog
                    userId={userId}
                    authToken={authToken} />
            )}
        </div>
    );
}

export default App;
