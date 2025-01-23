import React, { useState } from "react";
import '../../styles/question-2.css';
import { useScore } from "../../context/ScoreContext";

function Question2({ onNext }) {
    const { addScore } = useScore();
    const [selected, setSelected] = useState(null);

    // Tačan odgovor
    const correctAnswer = "Krava";

    // Opcije sa slikama
    const options = [
        { value: "Konj", imgSrc: process.env.PUBLIC_URL + "/img/question_2/konj.png" },
        { value: "Krava", imgSrc: process.env.PUBLIC_URL + "/img/question_2/krava.png" },
        { value: "Mačka", imgSrc: process.env.PUBLIC_URL + "/img/question_2/macka.png" },
    ];

    const handleSubmit = () => {
        if (selected === correctAnswer) {
            addScore(1); // Dodajemo 1 bod za tačan odgovor
        }
        onNext(); // Prelazak na sledeće pitanje
    };

    return (
        <div className="question-container">
            <h2>Koja životinja daje mleko?</h2>
            <div className="options">
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`option-btn opt-btn-img ${selected === option.value ? "selected" : ""}`}
                        onClick={() => setSelected(option.value)}
                    >
                        <img src={option.imgSrc} alt={option.value} className="option-image" />
                    </div>
                ))}
            </div>
            <div
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!selected} // Onemogućavamo dugme dok korisnik ne odabere opciju
            >
                Dalje
            </div>
        </div>
    );
}

export default Question2;
