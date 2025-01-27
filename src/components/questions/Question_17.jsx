import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question17({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "playing-doll", label: "🪆 Devojčica se igra sa lutkom", isCorrect: true },
        { id: "watching-tv", label: "📺 Devojčica gleda TV", isCorrect: false },
    ];

    const handleOptionSelect = (optionId) => {
        setSelectedAnswer(optionId);
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
            <h2>Ana je gledala crtani film, a pre toga se igrala sa lutkom. Označi šta je Ana pre radila:</h2>
            <form className="options-list">
                {options.map((option) => (
                    <label key={option.id} className="option">
                        <input
                            type="radio"
                            name="activity"
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

export default Question17;
