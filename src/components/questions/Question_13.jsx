import React, { useState } from "react";
import "../../styles/question-13.css";
import { useScore } from "../../context/ScoreContext";

function Question13({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "cat", label: "🐱 Mačka", isCorrect: false },
        { id: "bird", label: "🐦 Ptica", isCorrect: false },
        { id: "girl", label: "👧 Devojčica", isCorrect: false },
        { id: "shoes", label: "👟 Patike", isCorrect: true },
        { id: "doll", label: "🪆 Lutka", isCorrect: true },
    ];

    const handleCheckboxChange = (id) => {
        if (selectedAnswers.includes(id)) {
            setSelectedAnswers(selectedAnswers.filter((answer) => answer !== id));
        } else if (selectedAnswers.length < 2) {
            setSelectedAnswers([...selectedAnswers, id]);
        }
    };

    const handleSubmit = () => {
        let score = 0;

        // Proveri tačnost odgovora
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
            <h2>Pogledaj šta se nalazi na slici i označi dve stvari koje ne pripadaju:</h2>
            <form className="options-list">
                {options.map((option) => (
                    <label key={option.id} className="option">
                        <input
                            type="checkbox"
                            value={option.id}
                            onChange={() => handleCheckboxChange(option.id)}
                            disabled={isAnswered || selectedAnswers.length === 2 && !selectedAnswers.includes(option.id)}
                        />
                        {option.label}
                    </label>
                ))}
            </form>
            {!isAnswered && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={selectedAnswers.length !== 2}
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

export default Question13;
