import React, { useState } from "react";
import { useScore } from "../../context/ScoreContext";
import { DndContext, useDraggable, useDroppable, useSensors, useSensor, PointerSensor, TouchSensor } from "@dnd-kit/core";

// Komponenta za prevlačive elemente
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

// Komponenta za ciljana polja
function DroppableBox({ id, droppedItem }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    
    return (
        <div ref={setNodeRef} className={`droppable-box ${isOver ? "hovered" : ""}`}>
            {droppedItem ? (
                <DraggableItem key={droppedItem.id} id={droppedItem.id} imgSrc={droppedItem.imgSrc} /> 
                
            ) : (
                <span>?</span>
            )}
        </div>
    );
}

function Question19({ onNext }) {
    const { addScore } = useScore();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [orderedAnimals, setOrderedAnimals] = useState([null, null, null, null, null, null]);

    // Tačan redosled životinja
    const correctOrder = ["mrav", "mis", "lisica", "pas", "noj", "slon"];

    // Opcije za prvi task (skače)
    const optionsTask1 = [
        { id: "pas", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_1/kviz_pas2.png", isCorrect: false },
        { id: "pingvin", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_1/kviz_pingvin2.png", isCorrect: false },
        { id: "zeka", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_1/kviz_zeka.png", isCorrect: true },
    ];

    // Opcije za drugi task (redosled)
    const [availableOptions, setAvailableOptions] = useState([
        { id: "noj", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_noj.png" },
        { id: "mis", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_mis2.png" },
        { id: "lisica", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_lisica.png" },
        { id: "slon", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_slon.png" },
        { id: "pas", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_pas3.png" },
        { id: "mrav", imgSrc: process.env.PUBLIC_URL + "/img/question_19/task_2/kviz_mrav2.png" },
    ]);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleOptionSelect = (optionId) => {
        setSelectedAnswer(optionId);
    };



    const handleDragEnd = ({ active, over }) => {
        if (!over) return;
    
        const draggedItem = availableOptions.find(item => item.id === active.id) ||
                            orderedAnimals.find(item => item && item.id === active.id);
    
        if (!draggedItem) return;
    
        const targetIndex = over.id.startsWith("box-") ? parseInt(over.id.replace("box-", ""), 10) : null;
        const sourceIndex = orderedAnimals.findIndex(item => item && item.id === active.id);
    
        let updatedSequence = [...orderedAnimals];
        let updatedOptions = [...availableOptions];
    
        if (targetIndex !== null) {
            if (updatedSequence[targetIndex]) {
                // Umesto zamene direktno, pomeramo element na sledeće slobodno mesto ako postoji
                const replacedItem = updatedSequence[targetIndex];
                updatedOptions.push(replacedItem);
            }
    
            updatedOptions = updatedOptions.filter(item => item.id !== draggedItem.id);
    
            // Ako se premešta iz drop zone u drop zone, vršimo zamenu
            if (sourceIndex !== -1) {
                updatedSequence[sourceIndex] = null;
            }
    
            updatedSequence[targetIndex] = draggedItem;
        } else {
            // Ako vraćamo element nazad u availableOptions
            updatedOptions.push(draggedItem);
            if (sourceIndex !== -1) updatedSequence[sourceIndex] = null;
        }
    
        // PROBAJ OVO: Održavanje praznih slotova u responsive prikazu
        setOrderedAnimals([...updatedSequence.filter(item => item !== undefined)]);
        setAvailableOptions([...updatedOptions]);
    };
    
    const handleSubmitTask1 = () => {
        const selectedOption = optionsTask1.find((option) => option.id === selectedAnswer);
        if (selectedOption && selectedOption.isCorrect) {
            addScore(1); // Ako je tačan odgovor, dodaj 1 bod
        }
        handleNextStep();
    };
    

    const handleSubmitTask2 = () => {
        const isCorrect = orderedAnimals.every((item, index) => item && item.id === correctOrder[index]);
    
        if (isCorrect) {
            addScore(1); // Dodaj bod samo ako je ceo niz tačan
        }
        onNext();
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 0 } }) 
    );

    return (
        <div className="question_19">
            <div className="question-container">
                {step === 0 ? (
                    <>
                        <h2>Leptir leti, a ko skače?</h2>
                        <button className="submit-btn" onClick={handleNextStep}>Sledeće</button>
                    </>
                ) : step === 1 ? (
                    <>
                        <div className="options-container">
                            {optionsTask1.map((option) => (
                                <div key={option.id} className={`option ${selectedAnswer === option.id ? "selected" : ""}`} onClick={() => handleOptionSelect(option.id)}>
                                    <img src={option.imgSrc} alt="animal" className="option-image" />
                                </div>
                            ))}
                        </div>
                        <div className="submit-btn" onClick={handleSubmitTask1}>
                            Sledeće
                        </div>
                    </>
                ) : (
                    <>
                        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                            <p>Dostupni elementi:</p>
                            <div className="draggable-options">
                                {availableOptions.map((item) => (
                                    <DraggableItem key={item.id} id={item.id} imgSrc={item.imgSrc} />
                                ))}
                            </div>
                            <h2>Poređaj životinje od najmanje do najveće:</h2>
                            <div className="droppable-area">
                                {orderedAnimals.map((item, index) => (
                                    <DroppableBox key={index} id={`box-${index}`} droppedItem={item} />
                                ))}
                            </div>
                        </DndContext>
                        <button className="submit-btn" onClick={handleSubmitTask2} >
                            Potvrdi
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Question19;
