import React, { useState } from "react";
import LabeledInput from "../LabeledInput/LabeledInput";

const REGISTER_ENDPOINT = "http://localhost:8000/auth/register";
const CLIENT_SHARED_SECRET = "ylDhdP0HDvjBCvIYVdI2GhWv"

function NewAccountDialog({ onRegisterComplete }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            const response = await fetch(REGISTER_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${CLIENT_SHARED_SECRET}`
                },
                body: JSON.stringify({
                    user_id: username,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert("Registration successful! Please log in.");
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.detail}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
        onRegisterComplete();
    }

    return (
        <div className="login-dialog">
            <h2>Register</h2>
            <LabeledInput
                type="text"
                label="User Name:"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <LabeledInput
                type="text"
                label="Password:"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default NewAccountDialog;
