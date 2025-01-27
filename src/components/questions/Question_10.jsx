import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question10({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "airplane", label: "✈️ Avion", isCorrect: false },
        { id: "car", label: "🚗 Auto", isCorrect: true },
        { id: "horse", label: "🐴 Konj", isCorrect: false },
        { id: "bulldozer", label: "🚜 Bager", isCorrect: false },
        { id: "bus", label: "🚌 Autobus", isCorrect: true },
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
            <h2>Označi vozila kojima se vozimo u gradu:</h2>
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

export default Question10;
