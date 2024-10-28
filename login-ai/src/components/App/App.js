import React from 'react';
import Header from "../Header";
import LoginDialog from '../LoginDialog';
import NewAccountDialog from '../NewAccountDialog/NewAccountDialog';

function App() {
    const [userId, setUserID] = React.useState("");
    const [inRegistration, setInRegistration] = React.useState(false);

    return (
        <div className="wrapper">
            <Header />
            {!userId && (
                !inRegistration ? (
                    <LoginDialog 
                        onLogin={(id) => setUserID(id)} 
                        onRegister={() => setInRegistration(true)}/>
                ) : (
                    <NewAccountDialog 
                        onRegisterComplete={() => setInRegistration(false)}/>
                )
            )}
            {userId && <p>User Id: {userId}</p>}
        </div>
    );
}

export default App;
