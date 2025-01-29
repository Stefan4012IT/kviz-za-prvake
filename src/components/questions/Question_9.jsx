import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question9({ onNext }) {
    const { addScore } = useScore();
    const [selected, setSelected] = useState([]);
    const correctAnswers = ["Pčela", "Leptir", "Ptica"];

    // Opcije sa slikama
    const options = [
        { value: "Mrav", imgSrc: process.env.PUBLIC_URL + "/img/question_9/kviz_mrav.png" },
        { value: "Pčela", imgSrc: process.env.PUBLIC_URL + "/img/question_9/kviz_pcela.png" },
        { value: "Leptir", imgSrc: process.env.PUBLIC_URL + "/img/question_9/kviz_leptir.png" },
        { value: "Pingvin", imgSrc: process.env.PUBLIC_URL + "/img/question_9/kviz_pingvin.png" },
        { value: "Ptica", imgSrc: process.env.PUBLIC_URL + "/img/question_9/kviz_ptica.png" },
    ];

    const handleToggle = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    const handleSubmit = () => {
        const isCorrect =
            correctAnswers.every((answer) => selected.includes(answer)) &&
            selected.length === correctAnswers.length;
        if (isCorrect) {
            addScore(3); // Svaka tačna opcija nosi 1 bod, ukupno 3 boda
        }
        onNext();
    };

    return (
        <div className="question-9">
            <div className="question-container">
                <h2>Označi životinje koje lete:</h2>
                <div className="options">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`option-btn opt-btn-img ${selected.includes(option.value) ? "selected" : ""}`}
                            onClick={() => handleToggle(option.value)}
                        >
                            <img src={option.imgSrc} alt={option.value} className="option-image" />
                        </div>
                    ))}
                </div>
                <button className="submit-btn" onClick={handleSubmit}>
                    Dalje
                </button>
            </div>
        </div>
    );
}

export default Question9;
