import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question18({ onNext }) {
    const { addScore } = useScore();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const options = [
        { id: "rucak", label: "Ručak", imgSrc: process.env.PUBLIC_URL + "/img/question_18/kviz_rucak.png", isCorrect: true },
        { id: "bicikl", label: "Vožnja bicikla", imgSrc: process.env.PUBLIC_URL + "/img/question_18/kviz_bicikl.png", isCorrect: false },
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
        <div className="question_18">
            <div className="question-container">
                {step === 0 ? (
                    <>
                        <h2>Dečak i njegov drug su juče vozili bicikle. Drug mu je rekao da će i danas posle ručka opet voziti bicikl.</h2>
                        <button className="submit-btn" onClick={handleNextStep}>Sledeće</button>
                    </>
                ) : (
                    <>
                        <h2>Šta će danas prvo uraditi njegov drug?</h2>
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

export default Question18;
