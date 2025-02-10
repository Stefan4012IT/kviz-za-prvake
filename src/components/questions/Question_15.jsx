import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question15({ onNext }) {
    const { addScore } = useScore();
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [taskScores, setTaskScores] = useState(0);

    const tasks = [
        {
            id: "task1",
            question: "Označi najmanji predmet:",
            options: [
                { id: "lopta", label: "Lopta", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_1/kviz_lopta.png", isCorrect: false },
                { id: "ranac", label: "Ranac", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_1/kviz_ranac.png", isCorrect: false },
                { id: "casa", label: "Čaša", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_1/kviz_casa.png", isCorrect: true },
            ],
        },
        {
            id: "task2",
            question: "Označi najširi predmet:",
            options: [
                { id: "solja", label: "Šolja za čaj", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_2/kviz_solja.png", isCorrect: false },
                { id: "tanjir", label: "Veliki tanjir", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_2/kviz_tanjir.png", isCorrect: true },
                { id: "vaza", label: "Vaza za cveće", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_2/kviz_vaza.png", isCorrect: false },
            ],
        },
        {
            id: "task3",
            question: "Označi predmet koji je duži od dva ponuđena:",
            options: [
                { id: "kratkaOlovka", label: "Kratka olovka", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_3/kviz_kratkaOlovka.png", isCorrect: false },
                { id: "dugaOlovka", label: "Duga olovka", imgSrc: process.env.PUBLIC_URL + "/img/question_15/task_3/kviz_dugaOlovka.png", isCorrect: true },
            ],
        },
    ];

    const handleNextTask = () => {
        if (selectedAnswer !== null) {
            const isCorrect = tasks[currentTaskIndex].options.find((opt) => opt.id === selectedAnswer)?.isCorrect;
            if (isCorrect) {
                setTaskScores(taskScores + 1);
            }
        }

        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex(currentTaskIndex + 1);
            setSelectedAnswer(null);
        } else {
            addScore(taskScores + (selectedAnswer !== null && tasks[currentTaskIndex].options.find((opt) => opt.id === selectedAnswer)?.isCorrect ? 1 : 0));
            onNext();
        }
    };

    return (
        <div className="question_15">
            <div className="question-container">
                <h2>{tasks[currentTaskIndex].question}</h2>

                <div className="options-container">
                    {tasks[currentTaskIndex].options.map((option) => (
                        <div key={option.id} className={`option ${selectedAnswer === option.id ? "selected" : ""}`} onClick={() => setSelectedAnswer(option.id)}>
                            <img src={option.imgSrc} alt={option.label} className="option-image" />
                        </div>
                    ))}
                </div>

                <button className="submit-btn" onClick={handleNextTask} disabled={selectedAnswer === null}>
                    {currentTaskIndex < tasks.length - 1 ? "Sledeće" : "Dalje"}
                </button>
            </div>
        </div>
        
    );
}

export default Question15;
