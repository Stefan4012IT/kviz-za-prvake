import React, { useState } from "react";
import "../../styles/question-18.css";
import { useScore } from "../../context/ScoreContext";

function Question18({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "lunch", label: "🍽️ Ručak", isCorrect: true },
        { id: "cycling", label: "🚴 Vožnja bicikla", isCorrect: false },
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
            <h2>Dečak i njegov drug su juče vozili bicikle. Drug mu je rekao da će i danas posle ručka opet voziti bicikl. Šta će danas prvo uraditi njegov drug?</h2>
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

export default Question18;
