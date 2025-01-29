import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question10({ onNext }) {
    const { addScore } = useScore();
    const [selected, setSelected] = useState([]);
    const correctAnswers = ["Autobus", "Automobil"];

    // Opcije sa slikama
    const options = [
        { value: "Avion", imgSrc: process.env.PUBLIC_URL + "/img/question_10/kviz_avion.png" },
        { value: "Automobil", imgSrc: process.env.PUBLIC_URL + "/img/question_10/kviz_automobil.png" },
        { value: "Konj", imgSrc: process.env.PUBLIC_URL + "/img/question_10/kviz_konj.png" },
        { value: "Bager", imgSrc: process.env.PUBLIC_URL + "/img/question_10/kviz_bager.png" },
        { value: "Autobus", imgSrc: process.env.PUBLIC_URL + "/img/question_10/kviz_autobus.png" },
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
            addScore(2); // Svaka tačna opcija nosi 1 bod, ukupno 2 boda
        }
        onNext();
    };

    return (
        <div className="question-10">
            <div className="question-container">
                <h2>Označi vozila kojima se vozimo u gradu:</h2>
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

export default Question10;
