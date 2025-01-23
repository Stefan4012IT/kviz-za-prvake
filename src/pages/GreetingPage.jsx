import React, { useState } from "react";
import '../styles/greetingPage.css';

function GreetingPage({ onSubmit }) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, surname });
    };

    return (
        <div className="greeting-container">
            <div className="greeting-panel">
                <h1>Pozdrav!</h1>
                <form onSubmit={handleSubmit} className="greeting-form">
                    <input
                        type="text"
                        placeholder="Ime"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="greeting-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Prezime"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="greeting-input"
                        required
                    />
                    <button type="submit" className="greeting-button">
                        Započni kviz
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GreetingPage;
