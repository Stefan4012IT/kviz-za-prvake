import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question3({ onNext }) {
    const { addScore } = useScore(); // Pristup za dodavanje bodova
    const [selected, setSelected] = useState([]);
    const correctAnswers = ["Majica", "Haljina"];

    const handleToggle = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    const handleSubmit = () => {
        const isCorrect = correctAnswers.every((answer) => selected.includes(answer));
        if (isCorrect) {
            addScore(1); // Dodajemo bod samo ako su oba odgovora tačno izabrana
        }
        onNext(); // Prelazak na sledeće pitanje
    };

    return (
        <div className="question-container">
            <h2>Koju odeću oblačimo kada je leto?</h2>
            <div className="options">
                {["Jakna", "Kaput", "Majica", "Haljina"].map((option) => (
                    <button
                        key={option}
                        className={`option-btn ${selected.includes(option) ? "selected" : ""}`}
                        onClick={() => handleToggle(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={selected.length === 0} // Onemogućeno dok korisnik ne izabere opcije
            >
                Dalje
            </button>
        </div>
    );
}

export default Question3;
