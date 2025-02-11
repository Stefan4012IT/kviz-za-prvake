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
        let scoreToAdd = 0;

        // Prolazimo kroz svaki selektovani odgovor i proveravamo da li je tačan
        selected.forEach((answer) => {
            if (correctAnswers.includes(answer)) {
                scoreToAdd++; // Dodajemo bod za svaki tačan odgovor
            }
        });
    
        if (scoreToAdd > 0) {
            addScore(scoreToAdd); // Dodajemo bodove u globalni skor
        }
        onNext();
    };

    return (
        <div className="question-10">
            <div className="question-container">
                <h2>Označi vozila kojima se vozimo u gradu:</h2>
                <p>Za tačan odgovor potrebno je da odaberete više pojmova</p>
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
            </div>
            <div className="submit-btn" onClick={handleSubmit}>
                Dalje
            </div>
        </div>
    );
}

export default Question10;
