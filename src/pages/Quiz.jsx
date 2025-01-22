import React, { useState } from "react";
import Question1 from "../components/questions/Question_1";
import Question2 from "../components/questions/Question_2";
import Question3 from "../components/questions/Question_3";
import Question4 from "../components/questions/Question_4";
import Question5 from "../components/questions/Question_5";

import ResultsPage from "./ResultsPage";
import { useScore } from "../context/ScoreContext";

function Quiz({ userData }) {
    const { score } = useScore();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions = [
        { id: 1, component: Question1 },
        { id: 2, component: Question2 },
        { id: 3, component: Question3 },
        { id: 4, component: Question4 },
        { id: 5, component: Question5 },
        // Dodavaćemo ostala pitanja ovde
    ];

    const handleNext = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(-1); // Prikazuje stranicu sa rezultatima
        }
    };

    if (currentQuestionIndex === -1) {
        return <ResultsPage userData={userData} />;
    }

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
