import React from "react";
import MultipleChoice from "./MultipleChoice";
import DragAndDrop from "./DragAndDrop";

function QuestionWrapper({ question, onNext }) {
    const renderQuestion = () => {
        switch (question.type) {
            case "multiple-choice":
                return <MultipleChoice question={question} onNext={onNext} />;
            case "drag-and-drop":
                return <DragAndDrop question={question} onNext={onNext} />;
            default:
                return <p>Unknown question type</p>;
        }
    };

    return <div>{renderQuestion()}</div>;
}

export default QuestionWrapper;