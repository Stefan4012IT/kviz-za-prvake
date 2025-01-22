import React, { useState } from "react";
import "../../styles/question-16.css";
import { useScore } from "../../context/ScoreContext";

function Question16({ onNext }) {
    const { addScore } = useScore();
    const [selectedAnswers, setSelectedAnswers] = useState({ location: null, item: null });
    const [isAnswered, setIsAnswered] = useState(false);

    const tasks = [
        {
            id: "location",
            question: "Označi gde su oni šetali:",
            options: [
                { id: "forest", label: "🌲 Šuma", isCorrect: true },
                { id: "meadow", label: "🌼 Livada", isCorrect: false },
                { id: "street", label: "🛣️ Ulica", isCorrect: false },
            ],
        },
        {
            id: "item",
            question: "Označi šta je Marko ubrao za majku:",
            options: [
                { id: "wild-strawberries", label: "🍓 Šumske jagode", isCorrect: false },
                { id: "flower", label: "🌸 Cvet", isCorrect: true },
                { id: "apple", label: "🍎 Jabuka", isCorrect: false },
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
            <h2>Marko i njegova mama su šetali šumom. Marko je prvo ubrao cvet za mamu, a potom je zagrlio. Mama se tome veoma obradovala.</h2>
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

export default Question16;
