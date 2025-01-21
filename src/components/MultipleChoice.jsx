import React, { useState } from "react";

function MultipleChoice({ question, onNext }) {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    const handleSubmit = () => {
        const points = question.correct.includes(selected) ? 1 : 0;
        onNext(points);
    };

    return (
        <div>
            <h2>{question.question}</h2>
            <div>
                {question.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        style={{
                            background: selected === option ? "#007BFF" : "#f4f4f4",
                            color: selected === option ? "#fff" : "#000"
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button onClick={handleSubmit}>Dalje</button>
        </div>
    );
}

export default MultipleChoice;