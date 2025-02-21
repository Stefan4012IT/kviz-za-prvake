import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question1({ onNext }) {
    const { addScore } = useScore(); // Pristup funkciji za dodavanje bodova
    const [selected, setSelected] = useState(null);
    const correctAnswers = ["5", "6", "7"];

    const handleSubmit = () => {
        if (correctAnswers.includes(selected)) {
            addScore(1); // Dodajemo 1 bod za tačan odgovor
        }
        onNext(); // Prelazak na sledeće pitanje
    };

    return (
        <div className="question-1">
            <div className="question-container">
                <h2>Koliko imaš godina?</h2>
                <div className="options">
                    {["5", "6", "7", "8"].map((option) => (
                        <div
                            key={option}
                            className={`option-btn ${selected === option ? "selected" : ""}`}
                            onClick={() => setSelected(option)}
                        >
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
                
            </div>
            <div
                className="submit-btn"
                onClick={handleSubmit}
            >
                Dalje
            </div>
        </div>
        
    );
}

export default Question1;
