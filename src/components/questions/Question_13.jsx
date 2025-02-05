import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question13({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    // Opcije sa slikama
    const options = [
        { id: "devojcica", imgSrc: process.env.PUBLIC_URL + "/img/question_13/kviz_devojcica.png", isCorrect: false },
        { id: "macka", imgSrc: process.env.PUBLIC_URL + "/img/question_13/kviz_macka.png", isCorrect: false },
        { id: "ptica", imgSrc: process.env.PUBLIC_URL + "/img/question_13/kviz_ptica2.png", isCorrect: false },
        { id: "patike", imgSrc: process.env.PUBLIC_URL + "/img/question_13/kviz_patike.png", isCorrect: true },
        { id: "lutka", imgSrc: process.env.PUBLIC_URL + "/img/question_13/kviz_lutka.png", isCorrect: true },
    ];

    const handleToggle = (id) => {
        if (selectedAnswers.includes(id)) {
            setSelectedAnswers(selectedAnswers.filter((answer) => answer !== id));
        } else if (selectedAnswers.length < 2) {
            setSelectedAnswers([...selectedAnswers, id]);
        }
    };

    const handleSubmit = () => {
        const correctSelections =
            options.filter((option) => option.isCorrect).map((option) => option.id);
        const isCorrect =
            correctSelections.every((answer) => selectedAnswers.includes(answer)) &&
            selectedAnswers.length === correctSelections.length;

        if (isCorrect) {
            addScore(1); // Tačan odgovor donosi 1 bod
        }
        onNext();
    };

    return (
        <div className="question_13">
            <div className="question-container">
                <h2>Pogledaj šta se nalazi na slici i označi dve stvari koje ne pripadaju:</h2>
                <div className="options-list">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`option-btn opt-btn-img ${selectedAnswers.includes(option.id) ? "selected" : ""}`}
                            onClick={() => handleToggle(option.id)}
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

export default Question13;
