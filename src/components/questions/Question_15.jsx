import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";

function Question15({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswers, setSelectedAnswers] = useState({ task1: null, task2: null, task3: null });
    const [isAnswered, setIsAnswered] = useState(false);

    const tasks = [
        {
            id: "task1",
            question: "Označi najmanji predmet:",
            options: [
                { id: "ball", label: "🏀 Lopta", isCorrect: false },
                { id: "backpack", label: "🎒 Ranac", isCorrect: false },
                { id: "glass", label: "🥛 Čaša", isCorrect: true },
            ],
        },
        {
            id: "task2",
            question: "Označi najširi predmet:",
            options: [
                { id: "plate", label: "🍽️ Veliki tanjir", isCorrect: true },
                { id: "vase", label: "🌷 Vaza za cveće", isCorrect: false },
                { id: "cup", label: "☕ Šolja za čaj", isCorrect: false },
            ],
        },
        {
            id: "task3",
            question: "Označi predmet koji je duži od dva ponuđena:",
            options: [
                { id: "small-pencil", label: "✏️ Olovka", isCorrect: false },
                { id: "big-pencil", label: "🖊️ Malo veća olovka", isCorrect: true },
            ],
        },
    ];

    const handleOptionSelect = (taskId, optionId) => {
        setSelectedAnswers((prev) => ({ ...prev, [taskId]: optionId }));
    };

    const handleSubmit = () => {
        let score = 0;

        tasks.forEach((task) => {
            const selectedOption = task.options.find((option) => option.id === selectedAnswers[task.id]);
            if (selectedOption && selectedOption.isCorrect) {
                score++;
            }
        });

        addScore(score);
        setIsAnswered(true);
    };

    return (
        <div className="question-container">
            <h2>Odgovori na sledeća pitanja:</h2>
            {tasks.map((task) => (
                <div key={task.id} className="task">
                    <h3>{task.question}</h3>
                    <form className="options-list">
                        {task.options.map((option) => (
                            <label key={option.id} className="option">
                                <input
                                    type="radio"
                                    name={task.id}
                                    value={option.id}
                                    onChange={() => handleOptionSelect(task.id, option.id)}
                                    disabled={isAnswered}
                                />
                                {option.label}
                            </label>
                        ))}
                    </form>
                </div>
            ))}
            {!isAnswered && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={Object.values(selectedAnswers).some((answer) => answer === null)}
                >
                    Potvrdi
                </button>
            )}
            {isAnswered && (
                <button className="next-btn" onClick={onNext}>
                    Dalje
                </button>
            )}
        </div>
    );
}

export default Question15;
