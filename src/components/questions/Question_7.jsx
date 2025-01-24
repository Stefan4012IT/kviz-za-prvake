import React, { useState, useEffect } from "react";
import { useScore } from "../../context/ScoreContext";
import '../../styles/question-7.css'

function Question7({ onNext }) {
    const { addScore } = useScore();
    const [showSequence, setShowSequence] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const sequence = ["🐶", "🐱", "🐶", "🐶"];
    const options = [
        { id: 1, value: ["🐶", "🐶", "🐱", "🐶"], label: "1 kuca, 1 kuca, 1 maca, 1 kuca" },
        { id: 2, value: ["🐶", "🐱", "🐶", "🐶"], label: "1 kuca, 1 maca, 1 kuca, 1 kuca" },
        { id: 3, value: ["🐱", "🐶", "🐶", "🐶"], label: "1 maca, 1 kuca, 1 kuca, 1 kuca" },
    ];

    const correctOption = 2;

    useEffect(() => {
        // Prikaži niz na 10 sekundi, zatim sakrij
        const timer = setTimeout(() => setShowSequence(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleAnswer = (id) => {
        if (isAnswered) return;

        setSelectedOption(id);
        setIsAnswered(true);

        if (id === correctOption) {
            addScore(2); // Dodaj 2 boda za tačan odgovor
        }
    };

    return (
        <div className="question-container">
            <h2>Pogledaj niz i zapamti ga:</h2>
            {showSequence ? (
                <div className="sequence">
                    {sequence.map((item, index) => (
                        <span key={index} className="sequence-item">
                            {item}
                        </span>
                    ))}
                </div>
            ) : (
                <div className="options">
                    <h3>Koji niz je tačan?</h3>
                    {options.map((option) => (
                        <button
                            key={option.id}
                            className={`option-btn ${selectedOption === option.id ? (option.id === correctOption ? "correct" : "incorrect") : ""}`}
                            onClick={() => handleAnswer(option.id)}
                            disabled={isAnswered}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
            {isAnswered && (
                <button className="next-btn" onClick={onNext}>
                    Dalje
                </button>
            )}
        </div>
    );
}

export default Question7;
