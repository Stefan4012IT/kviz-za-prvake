import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question11({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Opcije sa slikama
    const options = [
        { id: "riba", imgSrc: process.env.PUBLIC_URL + "/img/question_11/kviz_riba.png", isCorrect: false },
        { id: "krokodil", imgSrc: process.env.PUBLIC_URL + "/img/question_11/kviz_krokodil.png", isCorrect: true },
        { id: "pticica", imgSrc: process.env.PUBLIC_URL + "/img/question_11/kviz_pticica.png", isCorrect: false },
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
        <div className="question_11">
            <div className="question-container">
                <h2>Označi životinju koja živi u vodi i na kopnu:</h2>
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

export default Question11;
