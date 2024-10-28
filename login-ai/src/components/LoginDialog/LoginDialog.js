import React from "react";
import LabeledInput from "../LabeledInput/LabeledInput";

const LOGIN_ENDPOINT="http://localhost:8000/auth/jwt/login"

function LoginDialog({ onLogin, onRegister }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleLogin() {
        if (!username.trim()) {
            alert("Username cannot be empty");
            return;
        }

        try {
            const response = await fetch(LOGIN_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    user_id: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(username); // Set the userId in the parent component
                // TODO: pass token data or handle it here
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.detail}`);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in. Please try again.");
        }
    }

    return (
        <div className="login-dialog">
            <h2>Login</h2>
            <LabeledInput
                label="User Name:"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <LabeledInput
                label="Password:"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>Don’t have an account?</p>
            <p><a href="#" onClick={onRegister}>Register here</a></p>
        </div>
    );
}

export default LoginDialog;
