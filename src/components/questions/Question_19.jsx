import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

// Komponenta za prevlačive elemente (životinje)
function DraggableItem({ id, imgSrc }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="draggable-item"
            style={{
                transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "none",
            }}
        >
            <img src={imgSrc} alt="animal" className="animal-image" />
        </div>
    );
}

// Komponenta za ciljana polja gde se prevučene životinje ređaju
function DroppableBox({ id, droppedItem }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="droppable-box">
            {droppedItem && <img src={droppedItem.imgSrc} alt="animal" className="animal-image" />}
        </div>
    );
}

function Question19({ onNext }) {
    const { addScore } = useScore();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [orderedAnimals, setOrderedAnimals] = useState([]);

    const correctOrder = ["mrav", "mis", "lisica", "pas", "noj", "slon"];

    const optionsTask1 = [
        { id: "pas", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_1/kviz_pas2.png", isCorrect: false },
        { id: "pingvin", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_1/kviz_pingvin2.png", isCorrect: false },
        { id: "zeka", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_1/kviz_zeka.png", isCorrect: true },
    ];

    const optionsTask2 = [
        { id: "mrav", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_mrav2.png" },
        { id: "mis", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_mis2.png" },
        { id: "lisica", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_lisica.png" },
        { id: "pas", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_pas3.png" },
        { id: "noj", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_noj.png" },
        { id: "slon", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_slon.png" },
    ];

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleOptionSelect = (optionId) => {
        setSelectedAnswer(optionId);
    };

    const handleSubmitTask1 = () => {
        const selectedOption = optionsTask1.find((option) => option.id === selectedAnswer);
        if (selectedOption && selectedOption.isCorrect) {
            addScore(1);
        }
        setIsAnswered(true);
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedItem = optionsTask2.find((item) => item.id === active.id);
        if (!draggedItem) return;

        let updatedSequence = [...orderedAnimals];
        updatedSequence = updatedSequence.filter((item) => item.id !== draggedItem.id);
        updatedSequence.push(draggedItem);

        setOrderedAnimals(updatedSequence);
    };

    const handleSubmitTask2 = () => {
        const isCorrect = JSON.stringify(orderedAnimals.map((item) => item.id)) === JSON.stringify(correctOrder);
        if (isCorrect) {
            addScore(1);
        }
        onNext();
    };

    return (
        <div className="question_19">
            <div className="question-container">
                {step === 0 ? (
                    <>
                        <h2>Leptir leti, a ? skače.</h2>
                        <button className="submit-btn" onClick={handleNextStep}>Sledeće</button>
                    </>
                ) : step === 1 ? (
                    <>
                        <h2>Leptir leti, a ? skače.</h2>
                        <div className="options-container">
                            {optionsTask1.map((option) => (
                                <div key={option.id} className={`option ${selectedAnswer === option.id ? "selected" : ""}`} onClick={() => handleOptionSelect(option.id)}>
                                    <img src={option.imgSrc} alt="animal" className="option-image" />
                                </div>
                            ))}
                        </div>
                        {!isAnswered ? (
                            <button className="submit-btn" onClick={handleSubmitTask1} disabled={selectedAnswer === null}>
                                Potvrdi
                            </button>
                        ) : (
                            <button className="submit-btn" onClick={handleNextStep}>
                                Sledeće
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Poređaj životinje od najmanje do najveće:</h2>
                        <DndContext onDragEnd={handleDragEnd}>
                            <div className="available-animals">
                                {optionsTask2.map((animal) => (
                                    <DraggableItem key={animal.id} id={animal.id} imgSrc={animal.imgSrc} />
                                ))}
                            </div>
                            <div className="order-area">
                                {correctOrder.map((_, index) => (
                                    <DroppableBox key={index} id={`slot-${index}`} droppedItem={orderedAnimals[index]} />
                                ))}
                            </div>
                        </DndContext>
                        <button className="submit-btn" onClick={handleSubmitTask2} disabled={orderedAnimals.length !== correctOrder.length}>
                            Potvrdi
                        </button>
                    </>
                )}
            </div>
        </div>
        
    );
}

export default Question19;
