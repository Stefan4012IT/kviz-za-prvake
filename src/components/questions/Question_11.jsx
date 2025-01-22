import React, { useState } from "react";
import "../../styles/question-11.css";
import { useScore } from "../../context/ScoreContext";

function Question11({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "fish", label: "🐟 Riba", isCorrect: false },
        { id: "crocodile", label: "🐊 Krokodil", isCorrect: true },
        { id: "bird", label: "🐦 Ptica", isCorrect: false },
    ];

    const handleOptionSelect = (id) => {
        setSelectedAnswer(id);
    };

    const handleSubmit = () => {
        const selectedOption = options.find((option) => option.id === selectedAnswer);
        if (selectedOption && selectedOption.isCorrect) {
            addScore(1); // Dodaj 1 bod za tačan odgovor
        }
        setIsAnswered(true);
    };

    return (
        <div className="question-container">
            <h2>Označi životinju koja živi u vodi i na kopnu:</h2>
            <form className="options-list">
                {options.map((option) => (
                    <label key={option.id} className="option">
                        <input
                            type="radio"
                            name="animal"
                            value={option.id}
                            onChange={() => handleOptionSelect(option.id)}
                            disabled={isAnswered}
                        />
                        {option.label}
                    </label>
                ))}
            </form>
            {!isAnswered && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                >
                    Potvrdi
                </button>
            )}
            {isAnswered && (
                <button className="next-btn" onClick={onNext}>
                    Dalje
                </button>
            )}
        </div>
    );
}

export default Question11;
