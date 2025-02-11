import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question3({ onNext }) {
    const { addScore } = useScore(); // Pristup za dodavanje bodova
    const [selected, setSelected] = useState([]);
    const correctAnswers = ["Majica", "Haljina"];

    // Opcije sa slikama
    const options = [
        { value: "Jakna", imgSrc: process.env.PUBLIC_URL + "/img/question_3/kviz_jakna.png" },
        { value: "Kaput", imgSrc: process.env.PUBLIC_URL + "/img/question_3/kviz_kaput.png" },
        { value: "Majica", imgSrc: process.env.PUBLIC_URL + "/img/question_3/kviz_majica.png" },
        { value: "Haljina", imgSrc: process.env.PUBLIC_URL + "/img/question_3/kviz_haljina.png" },
    ];

    const handleToggle = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((item) => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    const handleSubmit = () => {
        const isCorrect = correctAnswers.every((answer) => selected.includes(answer)) && selected.length === correctAnswers.length;
        if (isCorrect) {
            addScore(1); // Dodajemo bod samo ako su tačno izabrane opcije
        }
        onNext(); // Prelazak na sledeće pitanje
    };

    return (
        <div className="question-3">
            <div className="question-container">
                <h2>Koju odeću oblačimo kada je leto?</h2>
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
            <div
                className="submit-btn"
                onClick={handleSubmit}
            >
                Dalje
            </div>
        </div>
    );
}

export default Question3;
