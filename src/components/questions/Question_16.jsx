import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question16({ onNext }) {
    const { addScore } = useScore();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [taskScores, setTaskScores] = useState(0);

    const tasks = [
        {
            id: "location",
            question: "Označi gde su oni šetali:",
            options: [
                { id: "suma", label: "Šuma", imgSrc: process.env.PUBLIC_URL + "/img/question_16/task_1/kviz_suma.png", isCorrect: true },
                { id: "livada", label: "Livada", imgSrc: process.env.PUBLIC_URL + "/img/question_16/task_1/kviz_livada.png", isCorrect: false },
                { id: "ulica", label: "Ulica", imgSrc: process.env.PUBLIC_URL + "/img/question_16/task_1/kviz_ulica.png", isCorrect: false },
            ],
        },
        {
            id: "item",
            question: "Označi šta je Marko ubrao za majku:",
            options: [
                { id: "cvet", label: "Cvet", imgSrc: process.env.PUBLIC_URL + "/img/question_16/task_2/kviz_cvet2.png", isCorrect: true },
                { id: "jabuka", label: "Jabuka", imgSrc: process.env.PUBLIC_URL + "/img/question_16/task_2/kviz_jabuka2.png", isCorrect: false },
                { id: "sumskeJagode", label: "Šumske jagode", imgSrc: process.env.PUBLIC_URL + "/img/question_16/task_2/kviz_sumskeJagode.png", isCorrect: false },
            ],
        },
    ];

    const handleNextStep = () => {
        if (step === 1 || step === 2) {
            const isCorrect = tasks[step - 1].options.find((opt) => opt.id === selectedAnswer)?.isCorrect;
            if (isCorrect) {
                setTaskScores(taskScores + 1);
            }
        }

        if (step < 2) {
            setStep(step + 1);
            setSelectedAnswer(null);
        } else {
            addScore(taskScores + (selectedAnswer !== null && tasks[1].options.find((opt) => opt.id === selectedAnswer)?.isCorrect ? 1 : 0));
            onNext();
        }
    };

    return (
        <div className="question_16">
            <div className="question-container">
                {step === 0 ? (
                    <>
                        <h2>Marko i njegova mama su šetali šumom. Marko je prvo ubrao cvet za mamu, a potom je zagrlio. Mama se tome veoma obradovala.</h2>
                        <button className="submit-btn" onClick={handleNextStep}>Sledeće</button>
                    </>
                ) : (
                    <>
                        <h2>{tasks[step - 1].question}</h2>
                        <div className="options-container">
                            {tasks[step - 1].options.map((option) => (
                                <div key={option.id} className={`option ${selectedAnswer === option.id ? "selected" : ""}`} onClick={() => setSelectedAnswer(option.id)}>
                                    <img src={option.imgSrc} alt={option.label} className="option-image" />
                                    <p>{option.label}</p>
                                </div>
                            ))}
                        </div>
                        <button className="submit-btn" onClick={handleNextStep} disabled={selectedAnswer === null}>
                            {step < 2 ? "Sledeće" : "Dalje"}
                        </button>
                    </>
                )}
            </div>
        </div>
        
    );
}

export default Question16;
