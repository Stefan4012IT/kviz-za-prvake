import React, { useState } from "react";
import Question1 from "../components/questions/Question_1";
import { useScore } from "../context/ScoreContext";

function Quiz({ userData }) {
    const { score } = useScore();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions = [
        { id: 1, component: Question1 },
        // Dodavaćemo ostala pitanja ovde
    ];

    const handleNext = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log("Kviz završen. Ukupan skor:", score);
            // Ovde možemo dodati logiku za završetak kviza
        }
    };

    const CurrentQuestion = questions[currentQuestionIndex].component;

    return (
        <div className="quiz-container">
            <h1>Zdravo, {userData.name} {userData.surname}!</h1>
            <p>Osvojeni poeni: {score}</p>
            <CurrentQuestion onNext={handleNext} />
        </div>
    );
}

export default Quiz;
