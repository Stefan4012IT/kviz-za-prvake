import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question9({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "ant", label: "🐜 Mrav", isCorrect: false },
        { id: "bee", label: "🐝 Pčela", isCorrect: true },
        { id: "butterfly", label: "🦋 Leptir", isCorrect: true },
        { id: "bird", label: "🐦 Ptica", isCorrect: true },
        { id: "penguin", label: "🐧 Pingvin", isCorrect: false },
    ];

    const handleCheckboxChange = (id) => {
        setSelectedAnswers((prev) =>
            prev.includes(id) ? prev.filter((answer) => answer !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        let score = 0;
        options.forEach((option) => {
            if (selectedAnswers.includes(option.id) && option.isCorrect) {
                score++;
            }
        });

        addScore(score);
        setIsAnswered(true);
    };

    return (
        <div className="question-container">
            <h2>Označi životinje koje lete:</h2>
            <form className="options-list">
                {options.map((option) => (
                    <label key={option.id} className="option">
                        <input
                            type="checkbox"
                            value={option.id}
                            onChange={() => handleCheckboxChange(option.id)}
                            disabled={isAnswered}
                        />
                        {option.label}
                    </label>
                ))}
            </form>
            {!isAnswered && (
                <button className="submit-btn" onClick={handleSubmit}>
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

export default Question9;
