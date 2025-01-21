import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question2({ onNext }) {
    const { addScore } = useScore(); // Pristup funkciji za dodavanje bodova
    const [selected, setSelected] = useState(null);
    const correctAnswer = "Krava";

    const handleSubmit = () => {
        if (selected === correctAnswer) {
            addScore(1); // Dodajemo 1 bod za tačan odgovor
        }
        onNext(); // Prelazak na sledeće pitanje
    };

    return (
        <div className="question-container">
            <h2>Koja životinja daje mleko?</h2>
            <div className="options">
                {["Konj", "Krava", "Mačka"].map((option) => (
                    <button
                        key={option}
                        className={`option-btn ${selected === option ? "selected" : ""}`}
                        onClick={() => setSelected(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!selected} // Onemogućavamo dugme dok korisnik ne odabere opciju
            >
                Dalje
            </button>
        </div>
    );
}

export default Question2;
