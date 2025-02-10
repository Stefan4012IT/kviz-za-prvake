import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question17({ onNext }) {
    const { addScore } = useScore();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "playing-doll", label: "Devojčica se igra sa lutkom", imgSrc: process.env.PUBLIC_URL + "/img/question_17/kviz_devojcicaLutka.png", isCorrect: true },
        { id: "watching-tv", label: "Devojčica gleda TV", imgSrc: process.env.PUBLIC_URL + "/img/question_17/kviz_devojcicaTv.png", isCorrect: false },
    ];

    const handleNextStep = () => {
        setStep(1);
    };

    const handleOptionSelect = (optionId) => {
        setSelectedAnswer(optionId);
    };

    const handleSubmit = () => {
        const selectedOption = options.find((option) => option.id === selectedAnswer);
        if (selectedOption && selectedOption.isCorrect) {
            addScore(1); // Dodaj 1 bod za tačan odgovor
        }
        setIsAnswered(true);
        onNext();
    };

    return (
        <div className="question_17">
            <div className="question-container">
                {step === 0 ? (
                    <>
                        <h2>Ana je gledala crtani film, a pre toga se igrala sa lutkom.</h2>
                        <button className="submit-btn" onClick={handleNextStep}>Sledeće</button>
                    </>
                ) : (
                    <>
                        <h2>Označi šta je Ana pre radila:</h2>
                        <div className="options-container">
                            {options.map((option) => (
                                <div key={option.id} className={`option ${selectedAnswer === option.id ? "selected" : ""}`} onClick={() => handleOptionSelect(option.id)}>
                                    <img src={option.imgSrc} alt={option.label} className="option-image" />
                                </div>
                            ))}
                        </div>
                        <div className="submit-btn" onClick={handleSubmit}>
                            Dalje
                        </div>
                    </>
                )}
            </div>
        </div>

    );
}

export default Question17;
