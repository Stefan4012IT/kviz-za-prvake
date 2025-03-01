import React, { useState } from "react";
import { useScore } from "../context/ScoreContext";
import ResultsPage from "./ResultsPage";
import Question1 from "../components/questions/Question_1";
import Question2 from "../components/questions/Question_2";
import Question3 from "../components/questions/Question_3";
import Question4 from "../components/questions/Question_4";
import Question5 from "../components/questions/Question_5";
import Question6 from "../components/questions/Question_6";
import Question7 from "../components/questions/Question_7"; 
import Question8 from "../components/questions/Question_8"; 
import Question9 from "../components/questions/Question_9"; 
import Question10 from "../components/questions/Question_10"; 
import Question11 from "../components/questions/Question_11"; 
import Question12 from "../components/questions/Question_12"; 
import Question13 from "../components/questions/Question_13"; 
import Question14 from "../components/questions/Question_14"; 
import Question15 from "../components/questions/Question_15"; 
import Question16 from "../components/questions/Question_16"; 
import Question17 from "../components/questions/Question_17"; 
import Question18 from "../components/questions/Question_18"; 
import Question19 from "../components/questions/Question_19"; 

function Quiz({ userData }) {
    const { nextQuestion } = useScore();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions = [
        { id: 1, component: Question1 },
        { id: 2, component: Question2 },
        { id: 3, component: Question3 },
        { id: 4, component: Question4 },
        { id: 5, component: Question5 },
        { id: 6, component: Question6 },
        { id: 7, component: Question7 },
        { id: 8, component: Question8 },
        { id: 9, component: Question9 },
        { id: 10, component: Question10 },
        { id: 11, component: Question11 },
        { id: 12, component: Question12 },
        { id: 13, component: Question13 },
        { id: 14, component: Question14 },
        { id: 15, component: Question15 },
        { id: 16, component: Question16 },
        { id: 17, component: Question17 },
        { id: 18, component: Question18 },
        { id: 19, component: Question19 },
    ];

    const handleNext = () => {
        nextQuestion(); // ✅ Samo povećavamo broj pitanja

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(-1);
        }
    };

    if (currentQuestionIndex === -1) {
        return <ResultsPage userData={userData} />;
    }

    const CurrentQuestion = questions[currentQuestionIndex].component;

    return (
        <>
            <div className="full-page-content">
                <div className="profile-info">
                    <h4>😉 Učenik,<br></br> {userData.name} {userData.surname}!</h4>
                </div>
                <div className="quiz-container" key={currentQuestionIndex}>
                    <CurrentQuestion onNext={handleNext} />
                </div>
            </div>
        </>
    );
}

export default Quiz;
