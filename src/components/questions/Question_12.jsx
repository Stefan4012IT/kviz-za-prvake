import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question12({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Opcije sa slikama
    const options = [
        { id: "banana", imgSrc: process.env.PUBLIC_URL + "/img/question_12/kviz_banana.png", isCorrect: false },
        { id: "jabuka", imgSrc: process.env.PUBLIC_URL + "/img/question_12/kviz_jabuka.png", isCorrect: false },
        { id: "loptica", imgSrc: process.env.PUBLIC_URL + "/img/question_12/kviz_loptica.png", isCorrect: true },
        { id: "pomorandza", imgSrc: process.env.PUBLIC_URL + "/img/question_12/kviz_pomorandza.png", isCorrect: false },
    ];

    const handleOptionSelect = (id) => {
        setSelectedAnswer(id);
    };

    const handleSubmit = () => {
        const selectedOption = options.find((option) => option.id === selectedAnswer);
        if (selectedOption && selectedOption.isCorrect) {
            addScore(1); // Dodaj 1 bod za tačan odgovor
        }
        onNext();
    };

    return (
        <div className="question_12">
            <div className="question-container">
                <h2>Pogledaj šta se nalazi na slici i označi ono što ne pripada:</h2>
                <div className="options-list">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`option-btn opt-btn-img ${selectedAnswer === option.id ? "selected" : ""}`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <img src={option.imgSrc} alt={option.id} className="option-image" />
                        </div>
                    ))}
                </div>
                <div className="submit-btn" onClick={handleSubmit}>
                    Dalje
                </div>
            </div>
        </div>
    );
}

export default Question12;
