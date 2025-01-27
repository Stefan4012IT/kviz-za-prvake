import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question12({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "orange", label: "🍊 Narandža", isCorrect: false },
        { id: "banana", label: "🍌 Banana", isCorrect: false },
        { id: "ball", label: "⚽ Loptica", isCorrect: true },
        { id: "apple", label: "🍎 Jabuka", isCorrect: false },
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
            <h2>Pogledaj šta se nalazi na slici:</h2>
            <div className="options-list">
                {options.map((option) => (
                    <label key={option.id} className="option">
                        <input
                            type="radio"
                            name="items"
                            value={option.id}
                            onChange={() => handleOptionSelect(option.id)}
                            disabled={isAnswered}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
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

export default Question12;
